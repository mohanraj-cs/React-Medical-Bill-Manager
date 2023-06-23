import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

const Treatments = () => {

    const [treatments, setTreatments] = useState([]);

    const location = useLocation()

    const complaintCode = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchTreatments = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/treatments/" + complaintCode)
                setTreatments(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchTreatments();

    }, [])

    return (

        <div>
            <div className="content">
                <div className="container">
                    <h2 className="mb-5">MEDICAL HISTORY</h2>
                    <div className="table-responsive custom-table-responsive">
                        <table className="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Treatment Code</th>
                            <th scope="col">Doctor Name</th>
                            <th scope="col">Treatment Start</th>
                            <th scope="col">Treatment End</th>
                            <th scope="col">Treatment Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                treatments.map((treatment) => (
                                    <tr key={nanoid()}>
                                        <td>{treatment.treatmentCode}</td>
                                        <td>{treatment.doctorName}</td>
                                        <td>{treatment.startDate}</td>
                                        <td>{treatment.endDate}</td>
                                        <td>{treatment.treatmentType}</td>
                                        <tr className="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div className = "centerBtn">
                        <button className = "btn btn-outline-primary"><Link to = {`/AddTreatment/${complaintCode}`} style = {{color: 'inherit', textDecoration: 'inherit'}}>Add a Treatment</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Treatments;