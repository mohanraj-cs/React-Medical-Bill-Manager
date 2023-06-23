import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import "../non-app-css/styles.css";

const Consultants = () => {

    const [Consultants, setConsultants] = useState([])

    useEffect(()=>{

        const fetchAllConsultants = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/consultants")
                console.log(res)
                setConsultants(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchAllConsultants();

    }, [])

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">CONSULTANT RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Consultant No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Specialty</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Consultants.map((consultant) => (
                                    <tr key={nanoid()}>
                                        <td>{consultant.doctorNo}</td>
                                        <td>{consultant.doctorName}</td>
                                        <td>{consultant.speciality}</td>
                                        <td>Rs.{consultant.consultantSalary}</td>
                                        <td>
                                        <button class="btn btn-outline-primary"><Link to = {`/viewTeam/${consultant.doctorNo}`}>View Team</Link></button>
                                        </td>
                                        <tr class="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consultants;