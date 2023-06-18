### Live Link: https://example.com

### Application Routes:

#### User

- api/v1/user/user-create (POST)
- api/v1/user (GET)
- api/v1/user/648c5ef68fd2c4e8a33d19c1 (Single GET) Include an id that is saved in your database
- api/v1/user/648c5ef68fd2c4e8a33d19c1 (PATCH)
- api/v1/user/648c5ef68fd2c4e8a33d19c1648c5ef68fd2c4e8a33d19c1 (DELETE) Include an id that is saved in your database

#### Cows

- api/v1/cow/cow-create (POST)
- api/v1/cow (GET)
- api/v1/cow/648d2774761726cbba1759de (Single GET) Include an id that is saved in your database
- api/v1/cow/648d2774761726cbba1759de (PATCH)
- api/v1/cow/648d2774761726cbba1759de (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows

- api/v1/cow?pag=1&limit=10
- api/v1/cow?sortBy=price&sortOrder=asc
- api/v1/cow?minPrice=20000&maxPrice=70000
- api/v1/cow?location=Chattogram
- api/v1/cow?searchTerm=Cha

#### Orders

- api/v1/order/order-create (POST)
- api/v1/order (GET)
