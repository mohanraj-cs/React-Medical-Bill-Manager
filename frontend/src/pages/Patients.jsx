import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import "../non-app-css/styles.css";

const Patients = () => {

    const [patients, setPatients] = useState([])

    useEffect(()=>{

        const fetchAllPatients = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/patients")
                console.log(res)
                setPatients(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchAllPatients();

    }, [])

    /*const handleDelete = async (name) => {

        try{

            await axios.delete("http://localhost:5500/wards/" + name)
            window.location.reload()

        } catch (err) {

            console.log(err)
        }
    }*/
    
    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">PATIENT RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Patient No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Doctor No</th>
                            <th scope="col">Consultant No</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patients.map((patient) => (
                                    <tr key={nanoid()}>
                                        <td>{patient.patientNo}</td>
                                        <td>{patient.patientName}</td>
                                        <td>{patient.dateOfBirth}</td>
                                        <td>{patient.doctorNo}</td>
                                        <td>{patient.consultantInChargeNo}</td>
                                        <td>
                                        <button className = "btn btn-outline-primary"><Link to = {`/Complaints/${patient.patientNo}`}>Medical History</Link></button>
                                        </td>
                                        <tr class="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div class = "centerBtn">
                        <button class = "btn btn-outline-primary"><Link to = "/AddPatient" style = {{color: 'inherit', textDecoration: 'inherit'}}>Add New Patient</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patients;