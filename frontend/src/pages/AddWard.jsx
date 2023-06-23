import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddWards = () => {

    const [newWard, setNewWard] = useState({

        wardName: "",
        specialty: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {

        setNewWard(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.post("https://nice-pink-coral-tam.cyclic.app/wards", newWard)
            navigate("/")

        } catch(err){

            console.log(err)
        }
    }

    console.log(newWard)

    return (

        <div className = "form">
            <h1>Add New Ward</h1>
            <input type = "text" placeholder = "Name" onChange = {handleChange} name = "wardName"/>
            <input type = "text" placeholder = "Specialty" onChange = {handleChange} name = "specialty"/>
            <button onClick = {handleClick}>Add</button>
        </div>
    )
}

export default AddWards