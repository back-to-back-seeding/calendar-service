## Server API

### Get reservations for a room
  * GET `/rooms/:room_id/reservation`

**Path Parameters:**
  * `room_id` room id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {

    }
```

### Add reservation to a room
  * POST `/rooms/:room_id/reservation`

**Path Parameters:**
* `room_id` room id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "check_in": "String",
      "check_out": "String"
    }
```


### Update reservation
  * PUT `/rooms/:room_id/reservation/:reservation_id`

**Path Parameters:**
  * `room_id` room id
  * `reservation_id` reservation id

**Success Status Code:** `200`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "check_in": "String",
      "check_out": "String"
    }
```

### Delete restaurant
  * DELETE `/rooms/:room_id/reservation/:reservation_id`

**Path Parameters:**
  * `room_id` room id
  * `reservation_id` reservation id

**Success Status Code:** `200`
