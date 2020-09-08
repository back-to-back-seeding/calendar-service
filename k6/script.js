import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '60s', target: 10000 },
  ],
};

export default function() {
  group('API testing', () => {
    group('get', () => {
      const roomId = Math.floor(Math.random() * 10000000) + 1;
      const res = http.get(`http://localhost:3002/rooms/${roomId}/reservations`);
      check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('post', () => {
      const roomId = Math.floor(Math.random() * 10000000) + 1;
      const userId = Math.floor(Math.random() * 1000) + 1;
      const guests = Math.floor(Math.random() * 16) + 1;
      let reservation = JSON.stringify({
        check_in: '2023-05-01',
        check_out: '2023-05-05',
        guests,
        room_id: roomId,
        user_id: userId,
      });

      let params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = http.post(`http://localhost:3002/rooms/${roomId}/reservations`, reservation, params);
      check(res, { 'status is 201': (r) => r.status === 201 });
    });
  });
  sleep(1);
}
