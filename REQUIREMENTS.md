# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `/products` [GET]
- Show `/products/:id` [GET]
- Create `/products` [POST] [token required]
- Update`/products/:id` [PUT] [token required]
- Delete `/products/:id` [DELETE] [token required]

#### Users

- Index `/users` [GET] [token required]
- Show `/users/:id` [GET] [token required]
- Create `/users` [POST]
- Auth `/login` [POST]
- Update `/login/:id` [POST] [token required]
- Delete `/login/:id` [POST] [token required]

#### Orders

- Index `/orders` [GET] [token required]
- Show `/orders/:id` [GET] [token required]
- Create `/orders` [POST] [token required]
- Update`/orders/:id` [PUT] [token required]
- Delete `/orders/:id` [DELETE] [token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- username
- password

#### Orders

- id
- user_id
- status of order (active or complete)

#### OrderProducts

- order_id
- product_id
- quantity
