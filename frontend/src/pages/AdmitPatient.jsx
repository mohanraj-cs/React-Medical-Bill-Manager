import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../non-app-css/styles.css";

const AdmitPatient = () => {

    const [admitP, setAdmitP] = useState({

        patientNo: "",
        careunitNo: "",
        bedNo: "",
        admittedDate: ""
    });

    const navigate = useNavigate()

    const location = useLocation()

    const wardName = location.pathname.split("/")[2];

    const handleChange = (e) => {

        setAdmitP(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.put("https://nice-pink-coral-tam.cyclic.app/admitPatient/" + wardName, admitP)
            navigate(`/viewPatients/${wardName}`)

        } catch(err){

            console.log(err)
        }
    }

    return (

        <div className = "form">
            <h1>Admit Patient to Ward</h1>
            <input type = "text" placeholder = "Patient No" onChange = {handleChange} name = "patientNo"/>
            <input type = "text" placeholder = "Care Unit No" onChange = {handleChange} name = "careunitNo"/>
            <input type = "text" placeholder = "Bed No" onChange = {handleChange} name = "bedNo"/>
            <label for = "admittingDate">Admit Date</label>
            <input id = "admittingDate" type = "date" onChange = {handleChange} name = "admittedDate"/>
            <button class = "btn manageBtn-outline-primary" onClick = {handleClick}>Admit</button>
        </div>
    )
}

export default AdmitPatient