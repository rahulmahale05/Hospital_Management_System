const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rahul@1845', // Use your MySQL password
    database: 'hospital_management'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Patients API

// Add patient
app.post('/patients', (req, res) => {
    const { name, age, gender, contact, address } = req.body;
    console.log( name, age, gender, contact, address  );
    
    const query = `INSERT INTO patients (name, age, gender, contact, address) VALUES ('${name}', ${age}, '${gender}', '${contact}', '${address}')`;

    db.query(query, [name, age, gender, contact, address], (err, result) => {
        if (err) return res.status(500).json({
            message : err,
            success : false
        });
        res.json({ message: 'Patient added', patientId: result.insertId , success:true });
    });
   

});

// Get all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Doctors API

// Add a new doctor
app.post('/doctors', (req, res) => {
    const { name, specialization, contact } = req.body;
    const query = 'INSERT INTO doctors (name, specialization, contact) VALUES (?, ?, ?)';
    db.query(query, [name, specialization, contact], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Doctor added', doctorId: result.insertId });
    });
});

// Get all doctors
app.get('/doctors', (req, res) => {
    const query = 'SELECT * FROM doctors';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Appointments API

// Add a new appointment
app.post('/appointments', (req, res) => {
    const { patient_name, doctor_id, appointment_date, appointment_time } = req.body;
    const query = 'INSERT INTO appointments (patient_name, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)';
    db.query(query, [patient_name, doctor_id, appointment_date, appointment_time], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Appointment added', appointmentId: result.insertId });
    });
});

// Get all appointments
app.get('/appointments', (req, res) => {
    const query = `SELECT appointments.*, patients.name AS patient_name, doctors.name AS doctor_name
                   FROM appointments
                   JOIN patients ON appointments.patient_name = patients.name
                   JOIN doctors ON appointments.doctor_id = doctors.id`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// billing API

// Add a new billing
app.post('/billing', (req, res) => {
    const { patient_id, doctor_id, amount, date } = req.body;
    const query = 'INSERT INTO billing (patient_id, doctor_id, amount, date) VALUES (?, ?, ?, ?)';
    db.query(query, [patient_id, doctor_id, amount, date], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'bill added', billingId: result.insertId });
    });
});

// Get all appointments
app.get('/billing', (req, res) => {
    const query = `SELECT billing.*, patients.name AS patient_name, doctors.name AS doctor_name
                   FROM billing
                   JOIN patients ON billing.patient_id = patients.id
                   JOIN doctors ON .doctor_id = doctors.id`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

const port = 4000

// Route to delete patient data
app.delete('/deletepatient/:id', (req, res) => {
    const patientId = req.params.id;
    console.log(patientId);
    

    // Delete operation in the database (pseudo-code)
    // Replace this with actual database code
    const sql = `DELETE FROM patients WHERE id = ?`;

    db.query(sql, [patientId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting patient');
        }
        res.send('Patient deleted successfully');
    });
}); 

// Route to delete doctor data
app.delete('/deletedoctor/:id', (req, res) => {
    const doctorId = req.params.id;
    console.log(doctorId);
    

    // Delete operation in the database (pseudo-code)
    // Replace this with actual database code
    const sql = `DELETE FROM doctors WHERE id = ?`;

    db.query(sql, [doctorId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting doctor');
        }
        res.send('Doctor deleted successfully');
    });
}); 

// Route to delete appointment data
app.delete('/deleteappointment/:id', (req, res) => {
    const appointmentId = req.params.id;
    console.log(appointmentId);
    

    // Delete operation in the database (pseudo-code)
    // Replace this with actual database code
    const sql = `DELETE FROM appointments WHERE id = ?`;

    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting appointment');
        }
        res.send('Appointment deleted successfully');
    });
}); 


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



