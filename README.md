# AttendEase

AttendEase is a web-based student attendance management system that uses Redis databases for managing course, student, and attendance data. The system allows administrators to add courses, update student information, track attendance, and manage various course details via a user-friendly web interface.

## Features

- **User Authentication**: Secure login system using Passport.js for authenticated access to the dashboard and management functionalities.
- **Course Management**: Add, update, and delete courses and associated student information via the web interface.
- **Attendance Tracking**: Manage student attendance in real-time, including class timing checks to ensure students sign in during valid class hours.
- **Student Management**: Easily update student information and monitor attendance records.
- **Redis Integration**: Uses Redis for efficient and scalable management of course, student, and attendance data.

## Technology Stack

- **JavaScript**: Main programming language for both frontend and backend logic.
- **Node.js**: Runtime environment used for server-side execution.
- **Express.js**: Web framework for building the backend application.
- **Redis**: In-memory data structure store used as a database for courses, students, and attendance records.
- **Passport.js**: Used for handling user authentication and session management.
- **Multer**: Middleware for handling file uploads (e.g., CSV files with student data).
- **EJS**: Template engine for rendering dynamic web pages.
- **HTML/CSS/JavaScript**: Used for building the frontend of the application.
- **Pandas (via csv-parser)**: Used for parsing and handling CSV files on the server-side.

## Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/PSRJ1719/attendease.git
cd attendease
```

### 2. Install Required Dependencies:
```bash
npm install
```

### 3. Set Up Redis Connections:
- Ensure your Redis databases are correctly configured with the required credentials in the `.env` file:
  - `StudentDB`
  - `AttendDB`
  - `CourseDB`

### 4. Run the Application:
```bash
node app.js
```

### 5. Access the Application:
- Open your web browser and navigate to `http://localhost:3000`.

## Usage

1. **Login**:
   - Access the application through the login page.
   - Use the default credentials: `admin@bu.edu` with the password `admin`.

2. **Dashboard**:
   - View and manage courses, students, and attendance records.

3. **Add or Update Courses**:
   - Use the provided forms to add new courses or update existing courses and student lists via CSV files.

4. **Track Attendance**:
   - Students can sign in during class hours, and their attendance is tracked against predefined schedules.

## Key Functionalities

- **Database Connections**: The application connects to three Redis databases: `StudentDB`, `AttendDB`, and `CourseDB`, each handling specific data types like student information, attendance, and course details.
  
- **Attendance Submission**: Students can submit their attendance only during the specified class hours on designated class days, preventing late or early sign-ins.

- **Student and Course Management**: Administrators can add or update student and course details via CSV uploads, ensuring that student IDs are valid and correctly formatted.

- **Logout Functionality**: Users can log out of the system, redirecting them to the login page.

## Error Handling

- **Invalid Inputs**: The system checks for valid inputs, such as correctly formatted student IDs and dates, before processing any data.
- **Redis Connection Failures**: The application gracefully handles Redis connection errors, providing feedback to the user if a connection fails.
- **Authentication**: Unauthorized users attempting to access protected routes are redirected to the login page.

## Security Considerations

- **Password Protection**: User passwords are stored securely, and Passport.js is used for authentication and session management.
- **Session Management**: Sessions are handled securely using Express.js and Passport.js, ensuring that only authenticated users can access sensitive features like attendance tracking and course management.

## Contact

For more information, please contact:
- **Name**: Gordon
- **Email**: zgd13994359933@gmail.com
