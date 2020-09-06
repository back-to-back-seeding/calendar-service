import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '5s', target: 1000 },
    { duration: '5s', target: 2000 },
    { duration: '30s', target: 2000 },
  ],
};

export default function() {
  const roomId = Math.floor(Math.random() * 10000000);
  let res = http.get(`http://localhost:3002/rooms/${roomId}/reservations`);
}
