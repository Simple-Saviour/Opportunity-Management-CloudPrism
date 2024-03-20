<h1>Documentation for Opportunity Management Module</h1>

<h2>1. Database Schema: </h2>

The database schema for the Opportunity Management Module includes a single table named opportunities.<br>
Here's the schema:

SQL code

CREATE TABLE opportunities (
 id INTEGER PRIMARY KEY,
 name TEXT NOT NULL,
 value REAL,
 stage TEXT DEFAULT 'Prospect',
 close_date DATE,
 customer_id INTEGER,
 user_id INTEGER,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
<h2>2. Backend APIs:</h2>

The backend provides the following RESTful API endpoints to handle CRUD operations on opportunities:

GET /opportunities: Retrieves a list of all opportunities.<br>
POST /opportunities: Creates a new opportunity.<br>
PUT /opportunities/:id: Updates an existing opportunity by ID.<br>
DELETE /opportunities/:id: Deletes an opportunity by ID.

<h2>3. Frontend Components:</h2>

The frontend components include:

Opportunities: Displays a list of opportunities retrieved from the backend.<br>
OpportunityForm: Provides a form for adding/editing opportunities. Submits data to the backend for processing.

<h2>4. Third-party Dependencies:</h2>

React: Frontend framework for building user interfaces.<br>
React Router: Used for client-side routing in the front-end application.<br>
Express: Backend framework for building RESTful APIs.<br>
SQLite: Lightweight relational database used for storing opportunity data.<br>
Cors: Middleware for configuring Cross-Origin Resource Sharing in the backend.<br>
Bootstrap : To improve the UI.

<h2>5. Setup and Running Instructions:</h2>

Clone the repository in your device.

<h3>Backend:</h3>

Navigate to the backend directory.<br>
Install dependencies: npm install.<br>
Start the server: npm start.<br>

<h3>Frontend:</h3>

Navigate to the front-end directory.<br>
Install dependencies: npm install.<br>
Start the development server: npm start.<br>

Ensure that the backend server is running before starting the frontend server. Access the application at
http://localhost:3000 in your web browser.
