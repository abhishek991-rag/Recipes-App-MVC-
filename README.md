# Recipes App Backend

## Project Description

This is a robust and scalable CRUD (Create, Read, Update, Delete) application for managing recipe data. It serves as a backend API built with Node.js, Express.js, and Mongoose, following the MVC (Model-View-Controller) architectural pattern. The API endpoints are designed to be consumed by a separate frontend application or tested directly using tools like Postman.

## Key Features (API Endpoints)

The application provides the following core functionalities through its API:

- **`POST /api/recipes`**: Create a new recipe.
- **`GET /api/recipes`**: Retrieve a list of all recipes available in the database.
- **`GET /api/recipes/:id`**: Retrieve a single recipe using its unique ID.
- **`PUT /api/recipes/:id`**: Update an existing recipe by its ID.
- **`DELETE /api/recipes/:id`**: Delete a recipe from the database using its ID.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: MongoDB object data modeling (ODM) for Node.js, simplifying interactions with MongoDB.
- **MongoDB Atlas**: Cloud-hosted NoSQL database used for storing recipe data.
- **Postman**: Essential for API testing and development.
- **dotenv**: To securely manage environment variables in local development.

## Project Structure

recipes-app/
├── controllers/
│ └── recipeController.js # Contains the logic for handling API requests (Controller)
├── config/
│ └── db.js # Database connection setup
├── models/
│ └── recipeModel.js # Defines the Recipe schema and model (Model)
├── routes/
│ └── recipeRoutes.js # Defines API routes and links them to controller functions
├── .env # Environment variables (e.g., MongoDB URI, PORT) - NOT tracked by Git
├── .gitignore # Specifies intentionally untracked files to ignore
├── app.js # Main application entry point
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## Setup Instructions (Local Development)

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB Atlas Account (for cloud database)
- Postman (for API testing)
- Git (for cloning the repository)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url> # Replace with your actual repository URL
    cd recipes-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    In the root of your project directory, create a file named `.env`. This file will store your MongoDB Atlas connection URI and the port for your server.

    ```dotenv
    # .env
    MONGO_URI=mongodb+srv://<YOUR_ATLAS_USERNAME>:<YOUR_ATLAS_PASSWORD>@reciep.iicj8zw.mongodb.net/recipes_app_db?retryWrites=true&w=majority&appName=reciep
    PORT=5000
    ```

    - **Replace `<YOUR_ATLAS_USERNAME>` and `<YOUR_ATLAS_PASSWORD>`** with the actual username and URL-encoded password for your MongoDB Atlas database user.
    - Ensure your MongoDB Atlas user has read and write access and that your Network Access allows connections from your IP (or from anywhere `0.0.0.0/0` for broader access during development/deployment).

4.  **Start the server:**
    ```bash
    npm start
    ```
    You should see messages in your console indicating that MongoDB is connected and the server is running on the specified port (e.g., `MongoDB Connected: reciep.iicj8zw.mongodb.net`, `Server running on port 5000`).

## API Endpoints and Usage (with Postman Examples)

The base URL for all API endpoints during local development is `http://localhost:5000/api/recipes`.

### 1. Create a New Recipe

- **Endpoint**: `/api/recipes`
- **Method**: `POST`
- **Description**: Creates a new recipe in the database.
- **Request Body (JSON)**:
  ```json
  {
    "title": "Spicy Chicken Curry",
    "description": "A flavorful and aromatic Indian chicken curry.",
    "ingredients": [
      "Chicken",
      "Onions",
      "Tomatoes",
      "Ginger-Garlic Paste",
      "Yogurt",
      "Coriander Powder",
      "Chili Powder",
      "Garam Masala"
    ],
    "instructions": "Marinate chicken with spices. Sauté onions, add tomato puree. Stir in spices and marinated chicken. Add a little water and simmer until cooked.",
    "prepTime": 20,
    "cookTime": 40,
    "servings": 4,
    "difficulty": "Medium"
  }
  ```
- **Success Response (Status: 201 Created)**: Returns the newly created recipe object.
- **Error Responses**:
  - `400 Bad Request` (e.g., missing required fields, duplicate title)
  - `500 Internal Server Error`

### 2. Get All Recipes

- **Endpoint**: `/api/recipes`
- **Method**: `GET`
- **Description**: Retrieves a list of all recipes available in the database.
- **Success Response (Status: 200 OK)**: Returns an array of recipe objects.

### 3. Get Recipe by ID

- **Endpoint**: `/api/recipes/:id`
- **Method**: `GET`
- **Description**: Retrieves a single recipe using its unique MongoDB `_id`.
- **Example URL**: `http://localhost:5000/api/recipes/653b6f2c7a4d5e6f7g8h9i0j` (Replace with an actual ID)
- **Success Response (Status: 200 OK)**: Returns the recipe object.
- **Error Responses**:
  - `400 Bad Request` (e.g., invalid ID format)
  - `404 Not Found` (e.g., recipe with given ID does not exist)

### 4. Update a Recipe by ID

- **Endpoint**: `/api/recipes/:id`
- **Method**: `PUT`
- **Description**: Updates an existing recipe by its ID. You can send only the fields you want to update.
- **Example URL**: `http://localhost:5000/api/recipes/653b6f2c7a4d5e6f7g8h9i0j` (Replace with an actual ID)
- **Request Body (JSON)**:
  ```json
  {
    "cookTime": 45,
    "difficulty": "Hard"
  }
  ```
- **Success Response (Status: 200 OK)**: Returns the updated recipe object.
- **Error Responses**:
  - `400 Bad Request` (e.g., invalid ID format, validation error from schema, duplicate title)
  - `404 Not Found` (e.g., recipe with given ID does not exist)

### 5. Delete a Recipe by ID

- **Endpoint**: `/api/recipes/:id`
- **Method**: `DELETE`
- **Description**: Deletes a recipe from the database using its ID.
- **Example URL**: `http://localhost:5000/api/recipes/653b6f2c7a4d5e6f7g8h9i0j` (Replace with an actual ID)
- **Success Response (Status: 200 OK)**: Returns a success message and the deleted recipe object.
- **Error Responses**:
  - `400 Bad Request` (e.g., invalid ID format)
  - `404 Not Found` (e.g., recipe with given ID does not exist)

## Deployment

This backend is ready to be deployed to a cloud hosting provider. Recommended platforms include:

- **Render.com**
- **Railway.app**

### Deployment Steps:

1.  Ensure your code is pushed to a **Git repository** (e.g., GitHub, GitLab). Make sure `.env` and `node_modules/` are in your `.gitignore` file.
2.  On your chosen hosting platform, create a new web service and connect it to your Git repository.
3.  **Crucially, configure your environment variables** on the hosting platform's dashboard (e.g., `MONGO_URI` with your MongoDB Atlas connection string, `PORT` if the platform requires it, though often it's automatically handled). These platform-level environment variables will override your local `.env` file.
4.  The platform will typically detect your `npm start` script and run your application.

---

**Note**: This project is an API-only backend. It does not serve HTML or any frontend files directly. To interact with it visually, you would connect a separate frontend application (e.g., built with React, Vue, Angular) to these API endpoints.
