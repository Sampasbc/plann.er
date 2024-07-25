Plann.er
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

    bash

    Copy code

    `git clone https://github.com/yourusername/planner.git
    cd planner`

2.  **Navigate to the frontend directory**:

    bash

    Copy code

    `cd frontend`

3.  **Install dependencies**:

    bash

    Copy code

    `npm install
    # or
    yarn install`

4.  **Start the development server**:

    bash

    Copy code

    `npm run dev
    # or
    yarn dev`

    The frontend will be available at `http://localhost:3000`.

### Backend Setup

1.  **Navigate to the backend directory**:

    bash

    Copy code

    `cd ../backend`

2.  **Install dependencies**:

    bash

    Copy code

    `npm install
    # or
    yarn install`

3.  **Set up the database**:

    bash

    Copy code

    `npx prisma migrate dev`

4.  **Start the server**:

    bash

    Copy code

    `npm start
    # or
    yarn start`

    The backend will be available at `http://localhost:3001`.

Usage
-----

1.  **Open the application**:

    Navigate to `http://localhost:3000` in your browser to access the Plann.er app.

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

For any questions or support, please reach out to your.email@example.com.