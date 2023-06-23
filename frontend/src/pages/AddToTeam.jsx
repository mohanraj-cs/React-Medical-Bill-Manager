import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../non-app-css/styles.css";

const AddToTeam = () => {

    const [addDoctor, setAddDoctor] = useState({

        doctorNo: "",
        teamJoinDate: ""
    });

    const navigate = useNavigate()

    const location = useLocation()

    const consultantNo = location.pathname.split("/")[2];

    const handleChange = (e) => {

        setAddDoctor(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.put("https://nice-pink-coral-tam.cyclic.app/addToTeam/" + consultantNo, addDoctor)
            navigate(`/viewTeam/${consultantNo}`)

        } catch(err){

            console.log(err)
        }
    }

    return (

        <div className = "form">
            <h1>Add Doctor To Team</h1>
            <input type = "text" placeholder = "Doctor No" onChange = {handleChange} name = "doctorNo"/>
            <label for = "teamJoiningDate">Team Join Date</label>
            <input id = "teamJoiningDate" type = "date" onChange = {handleChange} name = "teamJoinDate"/>
            <button class = "btn manageBtn-outline-primary" onClick = {handleClick}>Add</button>
        </div>
    )
}

export default AddToTeam