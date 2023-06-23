import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UpdateWard = () => {

    const [newWard, setNewWard] = useState({

        wardName: "",
        specialty: "",
    });

    const navigate = useNavigate()
    const location = useLocation()

    const wardWardName = location.pathname.split("/")[2];

    const handleChange = (e) => {

        setNewWard(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.put("https://nice-pink-coral-tam.cyclic.app/wards/"+wardWardName, newWard)
            navigate("/")

        } catch(err){

            console.log(err)
        }
    }

    console.log(newWard)

    return (

        <div className = "form">
            <h1>Update a Ward</h1>
            <input type = "text" placeholder = "specialty" onChange = {handleChange} name = "specialty"/>
            <button onClick = {handleClick}>Update</button>
        </div>
    )
}

export default UpdateWard