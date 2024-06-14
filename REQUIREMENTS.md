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
```postgres
                                    Table "public.products"
  Column  |         Type          | Collation | Nullable |               Default
----------+-----------------------+-----------+----------+--------------------------------------
 id       | integer               |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(50) |           | not null |
 price    | integer               |           | not null |
 category | character varying(50) |           |          |
 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

#### User

- id
- firstName
- lastName
- username
- password
```postgres
                                     Table "public.users"
  Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 username  | character varying(50)  |           | not null |
 firstname | character varying(50)  |           | not null |
 lastname  | character varying(50)  |           | not null |
 password  | character varying(250) |           | not null |

Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

```

#### Orders

- id
- user_id
- status of order (active or complete)
```postgres
                             Table "public.orders"
 Column  |  Type   | Collation | Nullable |              Default
---------+---------+-----------+----------+------------------------------------
 id      | integer |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer |           | not null |
 status  | boolean |           | not null |

Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

#### OrderProducts

- order_id
- product_id
- quantity
```postgres
             Table "public.order_products"
   Column   |  Type   | Collation | Nullable | Default
------------+---------+-----------+----------+---------
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
 quantity   | integer |           | not null |

Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```
