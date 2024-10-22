# Digitalflake Admin Panel

This project is an **admin panel** for managing categories, subcategories, and products, developed for **Digitalflake** as part of a full-stack development task. The project utilizes the MERN stack, Tailwind CSS for styling, JWT for authentication, and React Data Table for data management.

## 🖥️ Live Demo

Check out the live project: [Digitalflake Admin Panel](https://digitalflake-project-8ikp.onrender.com)

## Features

- **Authentication**: Users can log in using their credentials. Passwords are securely hashed using bcrypt, and JWT tokens are used for session management.
- **Dashboard**: Displays categories, subcategories, and products with options to add, edit, and delete them.
- **Category Management**: Create, edit, and delete product categories and subcategories.
- **Product Management**: Add, edit, and delete products, each associated with a category and subcategory.
- **React Data Table**: React Data Table is used to display and manage large datasets with sorting, pagination, and search functionality.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Data Grid/React Table
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens) and bcrypt for secure authentication
- **Database**: MongoDB for storing users, categories, subcategories, and products.
- **Form Validation**: Formik/Yup for handling form validation.
- **Image Management**: Cloudinary is used to handle image uploads efficiently.

## Installation and Setup Instructions

1. Clone the repository:

    ```bash
    git clone [https://github.com/AjitRaut/Digitalflake_Project.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Client
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file in the root directory with the following variables:

    ```bash
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```

5. Start the backend server:

    ```bash
    cd server
    npm start
    ```

6. Start the frontend development server:

    ```bash
    cd client
    npm start
    ```

7. Open the app in your browser:

    ```bash
    http://localhost:5000
    ```

## Project Structure

```bash
├── client             # React frontend
│   ├── public         # Static assets
│   └── src            # React components, Hooks, and Store
├── server             # Backend Express server
│   ├── controllers    # API controllers
│   ├── models         # MongoDB models (User, Category, Subcategory, Product)
│   └── routes         # API routes for CRUD operations and authentication
├── .env               # Environment variables
├── .gitignore         # Ignored files
├── README.md          # Project documentation
└── package.json       # Node.js dependencies and scripts
```
## Database Design

- **User**: Stores user login credentials (hashed passwords).
- **Category**: Stores product categories.
- **Subcategory**: Stores subcategories associated with a category.
- **Product**: Stores product details, associated with both a category and subcategory.
## Functionality

- **Authentication**: Users can log in securely using JWT authentication.
- **Dashboard**: The dashboard provides an overview of categories, subcategories, and products.
- **Category Management**: Add, edit, and delete categories.
- **Subcategory Management**: Manage subcategories within a category.
- **Product Management**: Create, edit, and delete products with associations to categories and subcategories.
## Authentication and Security

- **JWT Tokens**: Used for session management and secure API access.
- **Bcrypt**: Passwords are hashed using bcrypt before being stored in the database.
## Bonus Features

- **Responsive Design**: The admin panel is responsive and adapts to different screen sizes using Tailwind CSS.
- **React Table**: Efficient data management with Searching and sorting functionality.
- **Form Validation**: Form validation is handled with Formik and Yup for ensuring data accuracy.
- **Image Handling**: Cloudinary is used for handling image uploads seamlessly.
