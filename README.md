# Contest tracker with sorting visualizer
Contest Tracker and Sorting Visualizer
Project Overview
This full-stack web application provides a comprehensive platform for tracking coding contests from multiple platforms (LeetCode, CodeChef, and CodeForces) along with an interactive sorting visualizer. The application offers the following key features:

Real-time tracking of upcoming and past coding contests
Filters for different contest platforms
Toggle between upcoming and past contests
Intuitive sorting visualizer

Technologies Used

Frontend: React.js
Backend: Node.js
API Integration: Fetch contest data from multiple platforms

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14.0.0 or later)
npm (v6.0.0 or later)
Git

Installation Steps
1. Clone the Repository
bashCopygit clone https://github.com/dsasaank-369/contest-tracker.git
cd contest-tracker
2. Set Up Backend
Navigate to the backend directory and install dependencies:
bashCopycd backend
npm install
Create a .env file in the backend directory with the following configuration:
CopyPORT=5000
CONTEST_API_ENDPOINT=your_contest_api_endpoint
3. Set Up Frontend
In a new terminal, navigate to the frontend directory:
bashCopycd frontend
npm install
CopyREACT_APP_API_URL=http://localhost:5000/api
Running the Application
Start Backend Server
In the backend directory:
bashCopynpm start
The server will run on http://localhost:5000
Start Frontend Development Server
In the frontend directory:
bashCopynpm start
The application will open in your default browser at http://localhost:3000
Features
Contest Tracker

View upcoming contests for the next month
Filter contests by platform (LeetCode, CodeChef, CodeForces)
Toggle between upcoming and past contests
Responsive card-based contest display

Sorting Visualizer

Interactive visualization of sorting algorithms
Multiple sorting algorithm demonstrations

API Endpoints
The application uses the following API endpoints:

/api/contests/upcoming: Fetch upcoming contests
/api/contests/past: Fetch past contests
/api/contests/filter: Filter contests by platform

