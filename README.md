![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)



Plann.er 📷
========

Plann.er is a collaborative trip planning web application designed to help you organize and manage your trips effectively. With Plann.er, you can plan your trip, create daily activities, share important links, and invite others to contribute to the planning process.

Features
--------

-   **Trip Planning**: Create and manage trips with detailed itineraries.
-   **Collaborative Planning**: Invite friends or family to join the planning process.
-   **Activity Management**: Organize activities for each day of your trip.
-   **Link Sharing**: Share important links and resources with all participants.
-   **User Invitations**: Easily invite more people to participate in the trip.

Tech Stack
----------

-   **Frontend**:

    -   React with TypeScript
    -   Tailwind CSS
    -   Vite
-   **Backend**:

    -   Node.js with Fastify
    -   TypeScript
    -   Prisma ORM
-   **Database**:

    -   SQLite

Installation
------------

### Prerequisites

Ensure you have the following installed:

-   Node.js (version 14.x or higher)
-   npm or yarn

### Frontend Setup

1.  **Clone the repository**:

    ```console
    git clone https://github.com/Sampasbc/plann.er_group-trip-planning.git
    cd plann.er
    ```
    
2.  **Navigate to the frontend directory**:

    ```console
    cd client
    ```
    
3.  **Install dependencies**:

    ```console
    npm install
    ```
    **or**
    ```console
    yarn install
    ```

5.  **Start the development server**:

    ```console
    npm run dev
    ```
    **or**
    ```console
    yarn dev
    ```

### Backend Setup

1.  **Navigate to the backend directory**:

    ```console
    cd ../server
    ```

2.  **Install dependencies**:

    ```console
    npm install
    ```
    **or**
    ```console
    yarn install
    ```

4.  **Set up the database**:

    ```console
    npx prisma migrate dev
    ```

5.  **Settup environmental variables**:

    Create a .env file on "/server" if needed.

    On your .env file look for these variables and change them accordingly:

    ```env
    DATABASE_URL="file:./dev.db"
    
    // This is the API host
    API_BASE_URL = "[your network IP or https://localhost]"
    
    PORT = "[a port for the API (ex. 3333)]"
    
    // This is the Client host
    CLIENT_BASE_URL = "[your network IP or https://localhost]"
    
    CLIENT_PORT = "[a port for the client (ex. 5555)]"
    ```
    
6.  **Start the server**:

    ```console
    npm run dev
    ```
    **or**
    ```console
    yarn dev
    ```

    The backend will be available at `http://[your custom API host]:[your custom API port]`.

Usage
-----

1.  **Open the application**:

    Navigate to `http://[your custom Client host]:[your custom Client port]` in your browser to access the Plann.er app.

2.  **Create a Trip**:

    Use the interface to create a new trip and start planning your itinerary.

3.  **Invite Participants**:

    Invite friends and family to join your trip and collaborate on planning.

4.  **Plan Activities**:

    Add and organize activities for each day of your trip.

5.  **Share Links**:

    Share important links and resources with your trip participants.

Contributing
------------

We welcome contributions to Plann.er! To get started:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and ensure tests are passing.
4.  **Submit a pull request** with a detailed description of your changes.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

Contact
-------

For any questions or support, please reach out to fernandosbcunha@gmail.com
