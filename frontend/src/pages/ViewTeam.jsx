import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import "../non-app-css/styles.css";

const ViewTeam = () => {

    const [team, setTeam] = useState([]);

    const location = useLocation()

    const consultantNo = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchTeam = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/team/" + consultantNo)
                setTeam(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchTeam();

    }, [])

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">CONSULTANT TEAM RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Doctor No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Team Join Date</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                team.map((member) => (
                                    <tr key={nanoid()}>
                                        <td>{member.doctorNo}</td>
                                        <td>{member.doctorName}</td>
                                        <td>{member.position}</td>
                                        <td>{member.teamJoinDate}</td>
                                        <td>Rs.{member.nonconsultantSalaray}</td>
                                        <td>
                                        <button class="btn btn-outline-primary flexingTD"><Link to = {`/viewExperience/${member.doctorNo}`}>View Experience</Link></button>
                                        <button class="btn manageBtn-outline-primary"><Link to = {`/Performance/${member.doctorNo}`}>Manage Performance</Link></button>
                                        </td>
                                        <tr class="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div class = "centerBtn">
                        <button class = "btn btn-outline-primary"><Link to = {`/AddToTeam/${consultantNo}`} style = {{color: 'inherit', textDecoration: 'inherit'}}>Add Doctor to Team</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTeam;