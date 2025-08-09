// JavaScript for adding and viewing patients, doctors, and appointments


// Function to handle adding a patient
document.getElementById('addPatientForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    const contact = document.getElementById('patientContact').value;
    const address = document.getElementById('patientAddress').value;

    

    
    const a = await fetch('http://localhost:4000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, gender, contact, address })
    });

   console.log(a.ok);
    if(a.ok === true){
        alert("Patient Added Successfully!!!")
    }else{
        alert("Failed to Add the Patient")
    }
    

    document.getElementById('addPatientForm').reset()
    return
});

let toggle = false;

// Function to load all patients
document.getElementById("showPatientList").addEventListener('click', async () => {
    toggle = !toggle; // Toggle the state

    const patientList = document.getElementById('patientList');
    
    if (toggle) {
        await loadPatients();  // Load patients only if toggled on
        patientList.style.display = 'block'; // Show the patient list
    } else {
        patientList.innerHTML = ''; // Clear the list
        patientList.style.display = 'none'; // Hide the patient list
    }
});
    async function loadPatients() {
        const response = await fetch('http://localhost:4000/patients');
        const patients = await response.json();
        const patientList = document.getElementById('patientList');
        patientList.innerHTML = '';
        
        
        patients.forEach(patient => {
            const li = document.createElement('li');
            const button = document.createElement('button')
            button.innerHTML = "Delete"
            li.textContent = `Patient:${patient.id} Name:${patient.name} - Age:${patient.age} years - Gender:${patient.gender} - Contact: ${patient.contact}`;
            patientList.appendChild(li).appendChild(button)
            button.addEventListener("click" , async (e)=>{
                await deletePatient(patient.id)
                
            })
        });
    }

// Function to handle adding a doctor
document.getElementById('addDoctorForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('doctorName').value;
    const specialization = document.getElementById('doctorSpecialization').value;
    const contact = document.getElementById('doctorContact').value;

    await fetch('http://localhost:4000/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, specialization, contact })
    });
    document.getElementById('addDoctorForm').reset()
    return
});

let dc = false;

// Function to load all patients
document.getElementById("showDoctorList").addEventListener('click', async () => {
    dc = !dc; // Toggle the state

    const doctorList = document.getElementById('doctorList');
    
    if (dc) {
        await loadDoctors();  
        doctorList.style.display = 'block'; 
    } else {
        doctorList.innerHTML = ''; 
        doctorList.style.display = 'none'; 
    }
});

// Function to load all doctors
async function loadDoctors() {
    const response = await fetch('http://localhost:4000/doctors');
    const doctors = await response.json();
    const doctorList = document.getElementById('doctorList');
    doctorList.innerHTML = '';

    doctors.forEach(doctor => {
        const li = document.createElement('li');
        const button = document.createElement('button')
        button.innerHTML = "Delete"
        li.textContent = `DoctorID:${doctor.id} - ${doctor.name}, Specialization: ${doctor.specialization}, Contact: ${doctor.contact}`;
        doctorList.appendChild(li).appendChild(button)
        button.addEventListener("click" , async (e)=>{
            await deletedoctor(doctor.id)
            
        })
    });
}

// Function to handle adding an appointment
document.getElementById('addAppointmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const patient_name = document.getElementById('appointmentPatientName').value;
    const doctor_id = document.getElementById('appointmentDoctorId').value;
    const appointment_date = document.getElementById('appointmentDate').value;
    const appointment_time = document.getElementById('appointmentTime').value;

    await fetch('http://localhost:4000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_name, doctor_id, appointment_date, appointment_time })
    });

    document.getElementById('addAppointmentForm').reset()
    return
});
let ab = false;

// Function to load all patients
document.getElementById("showAppointmentList").addEventListener('click', async () => {
    ab = !ab; // Toggle the state

    const appointmentList = document.getElementById('appointmentList');
    
    if (ab) {
        await loadAppointments();  
        appointmentList.style.display = 'block'; 
    } else {
        appointmentList.innerHTML = ''; 
        appointmentList.style.display = 'none'; 
    }
});

// Function to load all appointments
async function loadAppointments() {
    const response = await fetch('http://localhost:4000/appointments');
    const appointments = await response.json();
    const appointmentList = document.getElementById('appointmentList');
    appointmentList.innerHTML = '';

    appointments.forEach(appointment => {
        const li = document.createElement('li');
        const button = document.createElement('button')
        button.innerHTML = "Delete"
        li.textContent = `Patient: ${appointment.patient_name} - Doctor: ${appointment.doctor_id} - Date: ${appointment.appointment_date} - Time: ${appointment.appointment_time}`;
        appointmentList.appendChild(li).appendChild(button)
        button.addEventListener("click" , async (e)=>{
            await delete(appointment.id)
            
        })
    });
}


// Function to handle adding an billing
document.getElementById('addbillingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const patient_id = document.getElementById('billingPatientId').value;
    const doctor_id = document.getElementById('billingDoctorId').value;
    const amount = document.getElementById('billingAmount').value;
    const date = document.getElementById('billingDate').value;

    await fetch('http://localhost:4000/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_id, doctor_id, amount, date })
    });

    document.getElementById('addbillingForm').reset()
    return
});
let ap = false;


document.getElementById("showbillingList").addEventListener('click', async () => {
    ap = !ap; // Toggle the state

    const appointmentList = document.getElementById('billingList');
    
    if (ap) {
        await loadAppointments();  
        appointmentList.style.display = 'block'; 
    } else {
        appointmentList.innerHTML = ''; 
        appointmentList.style.display = 'none'; 
    }
});

// Function to load all billing
async function loadbilling() {
    const response = await fetch('http://localhost:4000/billing');
    const billing = await response.json();
    const billingList = document.getElementById('billingList');
    billingList.innerHTML = '';

    billing.forEach(billing => {
        const li = document.createElement('li');
        const button = document.createElement('button')
        button.innerHTML = "Delete"
        li.textContent = `Patient: ${billing.patient_name} - Doctor: ${billing.doctor_id} - Date: ${billing.amount} - Time: ${billing.date}`;
        appointmentList.appendChild(li).appendChild(button)
        button.addEventListener("click" , async (e)=>{
            await deletebilling(billing.id)
            
        })
    });
}

async function deletePatient(patientId) {
    try {
        const response = await fetch(`http://localhost:4000/deletepatient/${patientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            await loadPatients()
            const result = await response.text();
            alert(result);  // e.g., "Patient deleted successfully"
        } else {
            alert('Failed to delete patient');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting patient');
    }
}

async function deletedoctor(doctorId) {
    try {
        const response = await fetch(`http://localhost:4000/deletedoctor/${doctorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            await loadDoctors()
            const result = await response.text();
            alert(result);  // e.g., "Doctor deleted successfully"
        } else {
            alert('Failed to delete doctor');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting doctor');
    }
}

async function deleteappointment(appointmentId) {
    try {
        const response = await fetch(`http://localhost:4000/deletedoctor/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            await loadAppointments()
            const result = await response.text();
            alert(result);  // e.g., "Appointmetn deleted successfully"
        } else {
            alert('Failed to delete appointmetn');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting appointment');
    }
}

// Load initial data
// window.onload = function() {
//     loadPatients();
//     loadDoctors();
//     loadAppointments();
// };


