# Product Inventory Management System(goKart) - Command Line REPL & POSTMAN REQUEST

The Product Inventory Management System is a command line REPL application that allows you to manage product inventory. It provides functionalities to add products to the product catalog, add warehouses to store the products, manage stocks, process orders, and view various information related to the inventory.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#repl_commands)
- [Features](#imp_features)

## ROUTES for POSTMAN

- [Routes_POSTMAN](#routes_postman)

## Installation

1. Clone the repository:

   `git clone https://github.com/majazulhaque/goKart.git`

2. Navigate to the project directory:

   `cd goKart`

3. Install the dependencies:

   `npm install`

4. Start the server:

   `npm start`

5. The server should now be running at http://localhost:8000

6. MongoDB is used to store Data, I uploaded my MongoDB URL,so it will be easy to evaluate without adding new Mongo DB URL and some data is already stored in uploaded URL, If any Issue comes with MONGO_URI.Then please change `process.env.MONGO_URI` in mongoose.js file to localhost `mongodb://127.0.0.1:27017/goKart`.

## Usage

To use the Product Inventory Management System, you can interact with it through a REPL (Read-Eval-Print Loop) interface or use the provided API endpoints with tools like POSTMAN.

- THROUGH REPL:

1. Enter the REPL Command either in same terminal or in new terminal(if use new terminal then first enter `node`, then enter the commands);

2. Single commands or Multiple commands can be entered at a time.
3. If Multiple commands is entered at a time then each commands is seperated by " ; ".
   e.g., `ADD_WAREHOUSE CY3556 Warehouse-C Maharashtra (19.7515,7139) 10 ; ADD_STATE Maharashtra ; GET_CUSTOMER 64a701c251f5c92a3cf8dcb9`

4. Each attribute is entered without SPACING BETWEEN THEM.
   e.g., `Warehouse C` (NOT ALLOWED)
   `Warehouse-C` (ALLOWED)

- THROUGH POSTMAN:

1. Open the POSTMAN, and make sure the server is running on post 8000 in IDE Terminal.
2. Available Routes can be entered to Request and get Response.
   e.g., http://localhost:8000/order/

3. Available Routes and Image is mentioned below.

## REPL_Commands

1. ADD CUSTOMER:

   `ADD_CUSTOMER SharzelHaque sharzel98@gmail.com Chota_Bhagada_Prayagraj,210010 1234565432`

   ![Addd_customer](https://github.com/majazulhaque/goKart/assets/74106414/598a7917-0717-4f7a-91b6-b4f4c2e109b2)

2. GET CUSTOMER:

   `GET_CUSTOMER 64a701c251f5c92a3cf8dcb9`

   ![Get_customer](https://github.com/majazulhaque/goKart/assets/74106414/80448d63-8166-4177-85be-e8413da60044)

3. UPDATE CUSTOMER:

   `UPDATE_CUSTOMER 64a7eafab74b54777031ca5c SharzelHak sharzel198@gmail.com Chota_Bhagada_Prayagraj,210010 1234565432`

   ![Update_customer](https://github.com/majazulhaque/goKart/assets/74106414/570a4c3c-84af-45b0-8795-2baf3e477595)

4. LIST CUSTOMER:

   `LIST_CUSTOMER`

   ![List_customer](https://github.com/majazulhaque/goKart/assets/74106414/5ea73526-6470-4a7d-b602-f533fba7bf01)

5. DELETE CUSTOMER:

   `DELETE_CUSTOMER 64a7eafab74b54777031ca5c`

   ![Delete_customer](https://github.com/majazulhaque/goKart/assets/74106414/44f2b082-88cc-4a4f-a058-de90b7dd3153)

6. ADD PRODUCT:

   `ADD_PRODUCT Product-1 12345 Category-T Subcategory-H http://example.com/image23.jpg`

   ![Add_Product](https://github.com/majazulhaque/goKart/assets/74106414/d6ad08dd-d56b-45b6-8648-665b7c08a983)

7. LIST PRODUCT:

   `LIST_PRODUCTS`

   ![List_Product](https://github.com/majazulhaque/goKart/assets/74106414/bbb59587-9dd4-4a23-84e6-44e9a6ef1a4d)

8. ADD STATE:

   `ADD_STATE Maharashtra`

   ![Add_State](https://github.com/majazulhaque/goKart/assets/74106414/a026a47a-5024-4799-8a24-8c45637914a7)

9. VIEW STATE:

   `VIEW_STATE`

   ![View_State](https://github.com/majazulhaque/goKart/assets/74106414/7edf9cb1-c9ef-49ee-9442-8da480958aca)

10. ADD WAREHOUSE:

`ADD_WAREHOUSE CY3556 Warehouse-C Maharashtra (19.7515,7139) 10`

![Add_Warehouse](https://github.com/majazulhaque/goKart/assets/74106414/34de605f-0636-44db-b7be-14540aa6e869)

11. LIST WAREHOUSE:

    `LIST_WAREHOUSES`

    ![List_Warehouse](https://github.com/majazulhaque/goKart/assets/74106414/2943a54f-91b4-46f8-be74-eb739afb2a5c)

12. WAREHOUSE INFO:

    `WAREHOUSE_INFO GT0548`

    ![Warehouse_INFO](https://github.com/majazulhaque/goKart/assets/74106414/4343be48-86bd-42e8-a8c6-0b66987cf1d9)

13. ADD STOCK:

    `ADD_STOCK 12345 PK3456 45`

    ![Add_Stock](https://github.com/majazulhaque/goKart/assets/74106414/4690e35a-cfee-48f7-b58b-b87e334eb9a9)

14. ORDER PROCESSED:

    `PROCESS_ORDER 64a6fe6cf2aa30bdf7b91ea7 12345 1 {"latitude":25.3176,"longitude":82.9739}`

    ![Ordered_Processed](https://github.com/majazulhaque/goKart/assets/74106414/023bd9f7-e1f6-49c7-8789-5a5e7fd03b75)

15. VIEW ORDER:

    `VIEW_ORDERS`

    ![View_Order](https://github.com/majazulhaque/goKart/assets/74106414/4e4591ed-440a-4620-aca3-10eb43cdc54d)

## IMP_Features

- User can run various command in one go,each commands run one by one.
- History of Each Commands is store in command log in pair.
- haversine-distance is used to find the location and distance between two warehouse.

## Routes_POSTMAN

1. ADD CUSTOMER:

  `POST` `http://localhost:8000/customer/add`

![PM_Create_Customer](https://github.com/majazulhaque/goKart/assets/74106414/df416c7c-aa5e-4d3f-8fcb-ca9e7e747ffe)

2. GET CUSTOMER:

   `GET` `GET_CUSTOMER 64a701c251f5c92a3cf8dcb9`

![PM_Get_Customer_BYID](https://github.com/majazulhaque/goKart/assets/74106414/4ff2a61e-7898-478e-aa23-dc96281a1f8b)

3. UPDATE CUSTOMER:

`PUT` `http://localhost:8000/customer/64a8556e534796cbbdf2ccc6`

![PM_Update_Customer](https://github.com/majazulhaque/goKart/assets/74106414/bf2a3f26-a270-4214-b71e-ac9004bdb02e)

4. LIST CUSTOMER:

   `GET` `http://localhost:8000/customer/`

![PM_Get_All_Customer](https://github.com/majazulhaque/goKart/assets/74106414/fe5ff5b0-c58f-41aa-8c16-46eb96e6313e)

5. DELETE CUSTOMER:

`DELETE` `http://localhost:8000/customer/64a8556e534796cbbdf2ccc6`

![PM_Delete_Customer](https://github.com/majazulhaque/goKart/assets/74106414/dd14f6fe-0681-4a43-aac9-7801c7c14b87)

6. ADD PRODUCT:

   `POST` `http://localhost:8000/product/add`

![PM_Create_Product](https://github.com/majazulhaque/goKart/assets/74106414/915db279-afe2-4e43-95ae-5ae905c4036e)

7. LIST PRODUCT:

   `GET` `http://localhost:8000/product/`

![PM_Get_Products](https://github.com/majazulhaque/goKart/assets/74106414/b7d922e7-7b7d-4bfe-b2fc-91969f85d7f0)

8. ADD STATE:

   `POST` `http://localhost:8000/state/add`

![PM_Add_State](https://github.com/majazulhaque/goKart/assets/74106414/29515eda-02c4-4e98-a825-a6da48924121)

9. VIEW STATE:

   `GET` `http://localhost:8000/state/`

![PM_Get_States](https://github.com/majazulhaque/goKart/assets/74106414/534cd875-4e77-4a83-a039-040848c6674a)

10. ADD WAREHOUSE:

`POST` `http://localhost:8000/warehouse/add`

![PM_Add_warehouse](https://github.com/majazulhaque/goKart/assets/74106414/6111f012-ccd5-4e52-8b4e-d9797199cb02)

11. LIST WAREHOUSE:

`GET` `http://localhost:8000/warehouse/`

![PM_Get_All_Warehouses](https://github.com/majazulhaque/goKart/assets/74106414/b11cf6d1-ca4f-4c48-9565-e3bb7251b407)

12. WAREHOUSE INFO:

`GET` `http://localhost:8000/warehouse/CY3534`

![PM_Get_warehouseBYID](https://github.com/majazulhaque/goKart/assets/74106414/65dd7236-11f0-46b0-abbe-adff1bf0b256)

13. ADD STOCK:

`POST` `http://localhost:8000/stock/add`

![PM_Add_Stock](https://github.com/majazulhaque/goKart/assets/74106414/5e4fdada-c7cd-4d8e-8221-268ea23319ce)

14. ORDER PROCESSED:

`POST` `http://localhost:8000/order/new`

![PM_Process_Order](https://github.com/majazulhaque/goKart/assets/74106414/5d5bd649-e20b-472e-84a2-756870aa21e5)

15. VIEW ORDER:

`GET` `http://localhost:8000/order/`

![PM_View_Order](https://github.com/majazulhaque/goKart/assets/74106414/18f74dce-b307-4dd9-a5f4-75742ee3d3ab)

## Thank You 🙂
