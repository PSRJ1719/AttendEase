import express from 'express';
import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bodyParser from 'body-parser';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Redis clients for different databases
const attend_r = redis.createClient({
    host: process.env.ATTEND_DB_HOST,
    port: process.env.ATTEND_DB_PORT,
    password: process.env.ATTEND_DB_PASS
});

const student_r = redis.createClient({
    host: process.env.STUDENT_DB_HOST,
    port: process.env.STUDENT_DB_PORT,
    password: process.env.STUDENT_DB_PASS
});

const course_r = redis.createClient({
    host: process.env.COURSE_DB_HOST,
    port: process.env.COURSE_DB_PORT,
    password: process.env.COURSE_DB_PASS
});

// Middleware for session management
app.use(session({
    store: new RedisStore({ client: redis.createClient() }),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Passport initialization for authentication
app.use(passport.initialize());
app.use(passport.session());

// User data (in a real-world app, you'd query a database)
const users = { 'admin@bu.edu': { id: '1', username: 'admin@bu.edu', password: 'admin' } };

// Configure passport-local strategy for authentication
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (username, password, done) => {
    const user = users[username];
    if (!user || user.password !== password) {
        return done(null, false, { message: 'Invalid username or password.' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = Object.values(users).find(u => u.id === id);
    done(null, user);
});

// File upload middleware configuration (for CSV files)
const upload = multer({ dest: 'uploads/' });

// Utility function to validate student ID format
function studentIdIsValid(id) {
    return id[0] === 'U' && id.slice(1).length === 8 && !isNaN(id.slice(1));
}

// Route: Home (Attendance Form)
app.get('/', (req, res) => {
    res.render('attend_form');
});

// Route: Login
app.get('/sign_in', (req, res) => {
    res.render('sign_in');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/manage_dashboard',
    failureRedirect: '/sign_in'
}));

// Route: Logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/sign_in');
});

// Route: Manage Dashboard (Protected)
app.get('/manage_dashboard', ensureAuthenticated, (req, res) => {
    // Fetch course info from Redis and render the dashboard
    const courseInfo = [];
    course_r.keys('*', (err, keys) => {
        if (err) throw err;
        keys.forEach(key => {
            course_r.hgetall(key, (err, data) => {
                if (err) throw err;
                courseInfo.push(data);
            });
        });
        res.render('manage_dashboard', { array: courseInfo });
    });
});

// Route: Submit attendance
app.post('/submit_attend', (req, res) => {
    const studentId = req.body.student_id;
    if (!studentIdIsValid(studentId)) {
        return res.render('attend_form', { message: 'Invalid Student ID' });
    }

    student_r.exists(studentId, (err, exists) => {
        if (!exists) {
            return res.render('attend_form', { message: 'Student does not exist' });
        }

        // Check if the student has attended the class today
        const today = new Date().toISOString().slice(0, 10);
        attend_r.sismember(studentId, today, (err, isMember) => {
            if (isMember) {
                return res.render('attend_form', { message: `${studentId} already signed in today.` });
            }

            attend_r.sadd(studentId, today, (err, success) => {
                if (success) {
                    res.render('attend_form', { message: `${studentId} signed in successfully.` });
                } else {
                    res.render('attend_form', { message: 'Failed to record attendance.' });
                }
            });
        });
    });
});

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/sign_in');
}

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

