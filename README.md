# AttendEase

AttendEase is a web-based student attendance management system that uses Redis databases for managing course, student, and attendance data. The system allows administrators to add courses, update student information, track attendance, and manage various course details via a user-friendly web interface.

## Features

- **User Authentication**: Login system for authenticated access to the dashboard and management functionalities.
- **Course Management**: Add, update, and delete courses and associated student information.
- **Attendance Tracking**: Manage student attendance in real-time with checks for class timing constraints.
- **Student Management**: Easily update student information and monitor their attendance records.
- **Redis Integration**: Uses Redis for efficient and scalable management of course, student, and attendance data.

## Technology Stack

- **Python**: Main programming language for backend logic.
- **Flask**: Web framework used to build the web application.
- **Redis**: In-memory data structure store used as a database, cache, and message broker.
- **WTForms**: For creating and validating forms.
- **Flask-Login**: For managing user sessions and authentication.
- **Pandas**: Used for handling and processing CSV data.
- **HTML/CSS/JavaScript**: For the frontend of the application.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PSRJ1719/attendease.git
   cd attendease
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Required Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Redis Connections**:
   - Ensure your Redis databases are correctly configured with the required credentials in the code:
     - `StudentDB`
     - `AttendDB`
     - `CourseDB`

5. **Run the Application**:
   ```bash
   python app.py
   ```

6. **Access the Application**:
   - Open your web browser and navigate to `http://127.0.0.1:5000`.

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

- **Database Connections**: The application establishes connections with three Redis databases: `StudentDB`, `AttendDB`, and `CourseDB`, each handling specific data types.
  
- **Attendance Submission**: Students can submit their attendance only during the specified class hours on designated class days.

- **Student and Course Management**: The administrator can add or update students and courses, ensuring that all student IDs are valid and correctly formatted.

- **Logging Out**: Users can log out of the system, which will redirect them back to the sign-in page.

## Error Handling

- **Invalid Inputs**: The application validates user inputs, ensuring all student IDs and dates are correctly formatted before processing.
- **Redis Connection Failures**: The system handles Redis connection failures gracefully, providing feedback to the user.

## Security Considerations

- **Password Protection**: User passwords are stored in a secure format (in this example, it is hardcoded but should ideally be hashed and stored securely).
- **Session Management**: The application uses Flask-Login for secure session management and redirects unauthorized users to the sign-in page.

## Contact

For more information, please contact:
- **Name**: Gordon
- **Email**: zgd13994359933@gmail.com
