import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

const Complaints = () => {

    const [complaints, setComplaints] = useState([]);

    const location = useLocation()

    const patientNo = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchComplaints = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/complaints/" + patientNo)
                setComplaints(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchComplaints();

    }, [])

    console.log(complaints)

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">MEDICAL HISTORY</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Complaint Code</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                complaints.map((complaint) => (
                                    <tr key={nanoid()}>
                                        <td>{complaint.complaintCode}</td>
                                        <td>{complaint.description}</td>
                                        <td>
                                        <button className = "btn btn-outline-primary"><Link to = {`/Treatments/${complaint.complaintCode}`}>View Treatments</Link></button>
                                        </td>
                                        <tr class="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div class = "centerBtn">
                        <button class = "btn btn-outline-primary"><Link to = {`/AddComplaint/${patientNo}`} style = {{color: 'inherit', textDecoration: 'inherit'}}>Add a Complaint</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Complaints;