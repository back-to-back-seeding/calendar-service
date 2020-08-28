## Server API

### Get reservations for a room
  * GET `/rooms/:room_id/reservations`

**Path Parameters:**
  * `room_id` room id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "rating": "Number",
      "reviews": "Number",
      "minimum_stay": "Number",
      "maximum_guest": "Number",
      "book_dates" :
        [{"id": "Number",
        "guests": "Number",
        "booked_date": "String"}],
      "fees" :
        [{"date" : "String",
          "price" : "Number"}]
    }

```

### Add reservation to a room
  * POST `/rooms/:room_id/reservations`

**Path Parameters:**
* `room_id` room id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "check_in": "String",
      "check_out": "String",
      "guests": "Number",
    }
```


### Update reservation
  * PUT `/rooms/:room_id/reservations/:reservation_id`

**Path Parameters:**
  * `room_id` room id
  * `reservation_id` reservation id

**Success Status Code:** `200`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "check_in": "String",
      "check_out": "String",
      "guests": "Number",
    }
```

### Delete reservation
  * DELETE `/rooms/:room_id/reservations/:reservation_id`

**Path Parameters:**
  * `room_id` room id
  * `reservation_id` reservation id

**Success Status Code:** `200`
