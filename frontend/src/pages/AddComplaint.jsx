import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../non-app-css/styles.css";

const AddComplaint = () => {

    const location = useLocation()

    const patientNo = location.pathname.split("/")[2];

    const [newComplaint, setNewComplaint] = useState({

        complaintCode: "",
        description: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {

        setNewComplaint(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.post("https://nice-pink-coral-tam.cyclic.app/addNewComplaint/" + patientNo, newComplaint)
            navigate(`/Complaints/${patientNo}`)

        } catch(err){

            console.log(err)
        }
    }

    return (

        <div className = "form">
            <h1>Add a Complaint</h1>
            <input type = "text" placeholder = "Complaint Code" onChange = {handleChange} name = "complaintCode"/>
            <input type = "text" placeholder = "Description" onChange = {handleChange} name = "description"/>
            <button class = "btn manageBtn-outline-primary" onClick = {handleClick}>Add</button>
        </div>
    )
}

export default AddComplaint