| METHOD      | ENDPOINT                      | DESCRIPTION                                                                                                                                |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| POST        | /api/register                 | This endpoint should allow users to register. Hash the password on store.                                                                  |
| POST        | /api/login                    | This endpoint should allow users to login. Return JWT token on login.                                                                      |
| PUT / PATCH | /api/user/:id/reset           | This endpoint should allow users to reset the password identified by user id, providing the current password and new password in the body. |
| GET         | /api/restaurants              | This endpoint should return a list of all available restaurants.                                                                           |
| GET         | /api/restaurants/:id          | This endpoint should return the details of a specific restaurant identified by its ID.                                                     |
| GET         | /api/restaurants/:id/menu     | This endpoint should return the menu of a specific restaurant identified by its ID.                                                        |
| POST / PUT  | /api/restaurants/:id/menu     | This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id.                                  |
| POST        | /api/restaurants/post         | This endpoint should allow the user to add a new restaurant                                                                                |
| DELETE      | /api/restaurants/:id/menu/:id | This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant.                      |
| POST        | /api/orders                   | This endpoint should allow the user to place an order.                                                                                     |
| GET         | /api/orders/:id               | This endpoint should return the details of a specific order identified by its ID.                                                          |
| PUT / PATCH | /api/orders/:id               | This endpoint should allow users to update the status of a specific order identified by its ID.                                            |
