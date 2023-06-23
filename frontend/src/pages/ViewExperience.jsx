import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import "../non-app-css/styles.css";

const ViewExperience = () => {

    const [experience, setExperience] = useState([])

    const location = useLocation()

    const consultantNo = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchExperience = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/experience/" + consultantNo)
                console.log(res)
                setExperience(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchExperience();

    }, [])

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">EXPERIENCE RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">From Date</th>
                            <th scope="col">To Date</th>
                            <th scope="col">Position</th>
                            <th scope="col">Establishment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                experience.map((exp) => (
                                    <tr key={nanoid()}>
                                        <td>{exp.fromDate}</td>
                                        <td>{exp.toDate}</td>
                                        <td>{exp.position}</td>
                                        <td>{exp.establishment}</td>
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

export default ViewExperience;