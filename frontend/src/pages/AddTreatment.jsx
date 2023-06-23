import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../non-app-css/styles.css";

const AddTreatment = () => {

    const location = useLocation()

    const complaintCode = location.pathname.split("/")[2];

    const [patientFound, setPatientFound] = useState([]);

    const [treatments, setTreatments] = useState([{

        treatmentCode: "",
        startDate: "",
        endDate: "",
        complaintCode: "",
        doctorNo: "",
        treatmentType: ""
    }]);

    const [newTreatment, setNewTreatment] = useState({

        treatmentCode: "",
        startDate: "",
        endDate: "",
        doctorNo: "",
        treatmentType: ""

    });

    const navigate = useNavigate()

    useEffect(()=>{

        const fetchTreatments = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/treatments/" + complaintCode)
                
                if (res.data && res.data.length > 0) {
                    
                    setTreatments(res.data);
                }

            } catch(err) {

                console.log(err);
            }
        }

        fetchTreatments();

    }, [])

    useEffect(()=>{

        const fetchPatientFound = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/getPatientNo/" + complaintCode)
                
                setPatientFound(res.data)

            } catch(err) {

                console.log(err);
            }
        }

        fetchPatientFound();

    }, [])

    const handleChange = (e) => {

        setNewTreatment(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        if (treatments[0].treatmentType !== "") {

            if (newTreatment.treatmentType === treatments[0].treatmentType) {

                try{

                    await axios.post("https://nice-pink-coral-tam.cyclic.app/addNewTreatment/" + complaintCode, newTreatment)
        
                } catch(err){
        
                    console.log(err)
                }   
    
                try{
    
                    patientFound.map(p=> (

                        console.log(p.patientNo)
                    ))

                    await axios.put("https://nice-pink-coral-tam.cyclic.app/addPatientDoctor/" + newTreatment.doctorNo, {patientNo: patientFound[0].patientNo})
        
                } catch(err){
        
                    console.log(err)
                }  
    
                navigate(`/Treatments/${complaintCode}`)
            }

            else {

                console.log("Error: Only one type of treatment allowed for one complaint!")
            }
        }

        else {

            try{

                await axios.post("https://nice-pink-coral-tam.cyclic.app/addNewTreatment/" + complaintCode, newTreatment)
    
            } catch(err){
    
                console.log(err)
            }  

            try{

                await axios.put("https://nice-pink-coral-tam.cyclic.app/addPatientDoctor/" + newTreatment.doctorNo, {patientNo: patientFound[0].patientNo})
    
            } catch(err){
    
                console.log(err)
            }  

            navigate(`/Treatments/${complaintCode}`)
        }
    }

    return (

        <div className = "form">
            <h1>Add a Treatment</h1>
            <input type = "text" placeholder = "Treatment Code" onChange = {handleChange} name = "treatmentCode"/>
            <label htmlFor = "startingDate">Treatment Start Date</label>
            <input id = "startingDate" type = "date" onChange = {handleChange} name = "startDate"/>
            <label htmlFor = "endingDate">Treatment End Date</label>
            <input id = "endingDate" type = "date" onChange = {handleChange} name = "endDate"/>
            <input type = "text" placeholder = "Doctor No" onChange = {handleChange} name = "doctorNo"/>
            <input type = "text" placeholder = "Treatment Type" onChange = {handleChange} name = "treatmentType"/>
            <button className = "btn manageBtn-outline-primary" onClick = {handleClick}>Add</button>
        </div>
    )
}

export default AddTreatment