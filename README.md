# Product Inventory Management System(goKart) - Command Line REPL & POSTMAN REQUEST

The Product Inventory Management System is a command line REPL application that allows you to manage product inventory. It provides functionalities to add products to the product catalog, add warehouses to store the products, manage stocks, process orders, and view various information related to the inventory.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#repl_commands)
- [Features](#imp_features)


## Installation
1. Clone the repository:

   git clone https://github.com/majazulhaque/goKart.git

2. Navigate to the project directory:

    cd goKart

3. Install the dependencies:

    npm install

4. Start the server:

    npm start

5. The server should now be running at http://localhost:8000

## Usage
To use the Product Inventory Management System, you can interact with it through a REPL (Read-Eval-Print Loop) interface or use the provided API endpoints with tools like Postman.

* THROUGH REPL:

1. Enter the REPL Command either in same terminal or in new terminal(if use new terminal then first enter  `node`, then enter the commands);

2. Single commands or Multiple commands can be entered at a time.
3. If Multiple commands is entered at a time then each commands is seperated by " ; ".
    e.g.,  ADD_WAREHOUSE CY3556 Warehouse-C Maharashtra (19.7515,7139) 10 ; ADD_STATE Maharashtra ; GET_CUSTOMER 64a701c251f5c92a3cf8dcb9

4. Each attribute is entered without SPACING BETWEEN THEM.
    e.g., Warehouse C (NOT ALLOWED)
          Warehouse-C (ALLOWED)

* THROUGH POSTMAN:

1. Open the POSTMAN, and make sure the server is running on post 8000 in IDE Terminal.
2.  Available Routes can be entered to Request and get Response.
    e.g., http://localhost:8000/order/

3. Available Routes and Image is mentioned below.

## REPL_Commands

1. ADD CUSTOMER:

    ADD_CUSTOMER SharzelHaque sharzel98@gmail.com Chota_Bhagada_Prayagraj,210010 1234565432

    ![Addd_customer](https://github.com/majazulhaque/goKart/assets/74106414/598a7917-0717-4f7a-91b6-b4f4c2e109b2)

2. GET CUSTOMER:

    GET_CUSTOMER 64a701c251f5c92a3cf8dcb9

    ![Get_customer](https://github.com/majazulhaque/goKart/assets/74106414/80448d63-8166-4177-85be-e8413da60044)
3. UPDATE CUSTOMER:

    UPDATE_CUSTOMER 64a7eafab74b54777031ca5c SharzelHak sharzel198@gmail.com Chota_Bhagada_Prayagraj,210010 1234565432

    ![Update_customer](https://github.com/majazulhaque/goKart/assets/74106414/570a4c3c-84af-45b0-8795-2baf3e477595)

4. LIST CUSTOMER:

    LIST_CUSTOMER

    ![List_customer](https://github.com/majazulhaque/goKart/assets/74106414/5ea73526-6470-4a7d-b602-f533fba7bf01)
5. DELETE CUSTOMER:

    DELETE_CUSTOMER 64a7eafab74b54777031ca5c

    ![Delete_customer](https://github.com/majazulhaque/goKart/assets/74106414/44f2b082-88cc-4a4f-a058-de90b7dd3153)

6. ADD PRODUCT:

    ADD_PRODUCT Product-1 12345 Category-T Subcategory-H http://example.com/image23.jpg

    ![Add_Product](https://github.com/majazulhaque/goKart/assets/74106414/d6ad08dd-d56b-45b6-8648-665b7c08a983)

7. LIST PRODUCT:

    LIST_PRODUCTS

    ![List_Product](https://github.com/majazulhaque/goKart/assets/74106414/bbb59587-9dd4-4a23-84e6-44e9a6ef1a4d)

8. ADD STATE:

    ADD_STATE Maharashtra

    ![Add_State](https://github.com/majazulhaque/goKart/assets/74106414/a026a47a-5024-4799-8a24-8c45637914a7)

9. VIEW STATE:

    VIEW_STATE

    ![View_State](https://github.com/majazulhaque/goKart/assets/74106414/7edf9cb1-c9ef-49ee-9442-8da480958aca)

10. ADD WAREHOUSE:

    ADD_WAREHOUSE CY3556 Warehouse-C Maharashtra (19.7515,7139) 10

    ![Add_Warehouse](https://github.com/majazulhaque/goKart/assets/74106414/34de605f-0636-44db-b7be-14540aa6e869)

11. LIST WAREHOUSE:

    LIST_WAREHOUSES

    ![List_Warehouse](https://github.com/majazulhaque/goKart/assets/74106414/2943a54f-91b4-46f8-be74-eb739afb2a5c)

12. WAREHOUSE INFO:

    WAREHOUSE_INFO GT0548

    ![Warehouse_INFO](https://github.com/majazulhaque/goKart/assets/74106414/4343be48-86bd-42e8-a8c6-0b66987cf1d9)

13. ADD STOCK:

    ADD_STOCK 12345 PK3456 45

    ![Add_Stock](https://github.com/majazulhaque/goKart/assets/74106414/4690e35a-cfee-48f7-b58b-b87e334eb9a9)

14. ORDER PROCESSED:

    PROCESS_ORDER 64a6fe6cf2aa30bdf7b91ea7 12345 1 {"latitude":25.3176,"longitude":82.9739}

    ![Ordered_Processed](https://github.com/majazulhaque/goKart/assets/74106414/023bd9f7-e1f6-49c7-8789-5a5e7fd03b75)

15. VIEW ORDER:

    VIEW_ORDERS

    ![View_Order](https://github.com/majazulhaque/goKart/assets/74106414/4e4591ed-440a-4620-aca3-10eb43cdc54d)
## IMP_Features

- User can run various command in one go,each commands run one by one.
- History of Each Commands is store in command log in pair.
- haversine-distance is used to find the location and distance between two warehouse.




## Thank You 🙂

