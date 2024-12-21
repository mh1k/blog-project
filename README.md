# Blog Project

This project is a backend implementation for a blogging platform. Users can write, update, and delete blogs, while admins have additional privileges to manage users and their blogs. The system includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## **Technology Used**
 - Node.js
 - Express
 - Typescript
 - MongoDB
 - Mongoose
 - JWT
 - Eslint
 - Prettier
 - ts-node-dev


---

## **Features :**

### User Roles

1. **User**
 - User can register and login.
 - User can create blog (only when logged in).
 - User can updadate and delete their own blogs (only when logged in) .
  
2. **Admin**
 - Admin can delete any blog (while logged in).
 - Admin can block user (while logged in).
  
### Authentication and Authorization

1. **Authentication**
 - Users must login to perform create, update and delete operations.

2. **Authorization**
 - Role-based access control.

### Blog API

 - Public API for reading blogs with options for search, sortBy, sortOrder and Author filtering.

### Error Handling
 - Validation Error
 - Authentication Error
 - Authorization Error
 - Resource Not Found
 - Internal Server Error


---

### Setup Instruction for run the project locally

1. Clone the Repository
    ```
   git clone https://github.com/mh1k/blog-project.git
   cd blog-project
   ```
2. Install Dependencies
   ```
   npm install
   ```
3. Environment Variables
   create a **`.env`** in project root and add the this
   ```
   NODE_ENV = delvelopment
   PORT=5000
   DATABASE_URL= mongoDB URI
   BCRYPT_SALT_ROUNDS = bcrypt salt rounds
   JWT_ACCESS_SECRET = jwt access secret code
   JWT_ACCESS_EXPIRED_IN = jwt access expired time

   ```
4. Run the application in the development Mode
   ```
   npm run start:dev
   ```
5. Access the api
   when server is running, API will accessible at
   ```
   http://localhost:5000
   ```
***
### **Development Command - Custom Script**
in **`package.json`** file

```
 "scripts": {
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "start:pro": "node dist/server.js",
  },
```
| command                 | details                                                                             |
|-------------------------|-----------------------------------------------------------------------------|
|**`npm run start:dev`**  | run the application using ts-node-dev. by using this we can run .ts file| 
|**`npm run start:pro`**  | run the application .js file using node |
|**`npm run lint`**       | find out the error using eslint |
|**`npm run lint:fix`**   | find out the error and fix the error using eslint |
|**`npm run format`**     | using prettier format the code |

---
## **Available Endpoints :**
### **User**

| method      | endpoint                               | deatails    |
|-------------|----------------------------------------|-------------|
| POST        | **`/api/auth/register`**                    | Register the user ```{"name" : "Mr Prgrammer","email" : "example@email.com", "password" : "examplepassword"}``` giving these information in Request Body |
| POST        | **`/api/auth/login`**                    | login the user with ```{"email":"example@email.com", "password":"examplepassword"} ``` and collect the token from the response|
| POST        | **`/api/blogs`**                    | Create blog with giving ```{"title":"My Blog", "content":"content of my blog"} ``` and Authorization token in Request Headers ``Authorization: Bearer <token>`` (only when loggedin) |
| PATCH       | **`/api/blogs/:id`**                    | Update the blog with giving ```{"title":"My Blog", "content":"content of my blog"} ``` and Authorization token in Request headers ``Authorization: Bearer <token>`` (only when loggedin and update only user's own blog) |
| DELETE       | **`/api/blogs/:id`**                    | Delete the blog by blog Id with giving Authorization token in Request headers ``Authorization: Bearer <token>`` (only when loggedin and delete only user's own blog) |

### **Public API**

| method      | endpoint                               | deatails    |
|-------------|----------------------------------------|-------------|
| GET        | `/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId`                    | Register the user ```{"name" : "Mr Prgrammer","email" : "example@email.com", "password" : "examplepassword"}``` giving these information in Request Body |
---

### Thank you 🙂 Stay positive, keep learning, and always strive for excellence 
