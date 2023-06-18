### Live Link: https://cow-hut-backend-y7c3.onrender.com

### Application Routes:

#### User

- api/v1/users/user-create (POST)
- api/v1/users (GET)
- api/v1/users/648f03f4d4b7764a8b712cb4 (Single GET) Include an id that is saved in your database✔
- api/v1/users/648f03f4d4b7764a8b712cb4 (PATCH)
- api/v1/users/648f03f4d4b7764a8b712cb4 (DELETE) Include an id that is saved in your database✔

#### Cows

- api/v1/cows/cow-create (POST)
- api/v1/cows (GET)
- api/v1/cows/648f05abb09e523cd18419b3 (Single GET) Include an id that is saved in your database✔
- api/v1/cows/648f05abb09e523cd18419b3 (PATCH)
- api/v1/cows/648f05abb09e523cd18419b3 (DELETE) Include an id that is saved in your database✔

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders/order-create (POST)
- api/v1/orders (GET)
