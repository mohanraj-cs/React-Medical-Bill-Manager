import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import "../non-app-css/styles.css";

const ViewPatients = () => {

    const [patients, setPatients] = useState([]);

    const location = useLocation()

    const wardName = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchPatients = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/patients" + wardName)
                setPatients(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchPatients();

    }, [])

    const handleDischarge = async (pNo) => {

        try{

            await axios.put("https://nice-pink-coral-tam.cyclic.app/dischargePatient/" + pNo)
            window.location.reload()

        } catch (err) {

            console.log(err)
        }
    }

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">WARD PATIENTS RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Patient No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Care Unit No</th>
                            <th scope="col">Bed No</th>
                            <th scope="col">Consultant No</th>
                            <th scope="col">Date Admitted</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patients.map((p) => (
                                    <tr key={nanoid()}>
                                        <td>{p.patientNo}</td>
                                        <td>{p.patientName}</td>
                                        <td>{p.careunitNo}</td>
                                        <td>{p.bedNo}</td>
                                        <td>{p.consultantInChargeNo}</td>
                                        <td>{p.admittedDate}</td>
                                        <td>
                                        <button className = "btn dischargeBtn-outline-primary" onClick = {() => handleDischarge(p.patientNo)}>Discharge Patient</button>
                                        </td>
                                        <tr class="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div class = "centerBtn">
                        <button class = "btn btn-outline-primary"><Link to = {`/admitPatient/${wardName}`} style = {{color: 'inherit', textDecoration: 'inherit'}}>Admit a Patient</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPatients;