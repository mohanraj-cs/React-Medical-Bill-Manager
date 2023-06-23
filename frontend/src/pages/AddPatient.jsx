import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../non-app-css/styles.css";

const AddPatient = () => {

    const [newPatient, setNewPatient] = useState({

        patientNo: "",
        patientName: "",
        dateOfBirth: "",
        consultantInChargeNo: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {

        setNewPatient(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.post("https://nice-pink-coral-tam.cyclic.app/addNewPatient", newPatient)
            navigate("/Patients")

        } catch(err){

            console.log(err)
        }
    }

    return (

        <div className = "form">
            <h1>Add a Patient</h1>
            <input type = "text" placeholder = "Patient No" onChange = {handleChange} name = "patientNo"/>
            <input type = "text" placeholder = "Patient Name" onChange = {handleChange} name = "patientName"/>
            <label for = "birthDate">Date of Birth</label>
            <input id = "birthDate" type = "date" onChange = {handleChange} name = "dateOfBirth"/>
            <input type = "text" placeholder = "Consultant No" onChange = {handleChange} name = "consultantInChargeNo"/>
            <button class = "btn manageBtn-outline-primary" onClick = {handleClick}>Add</button>
        </div>
    )
}

export default AddPatient