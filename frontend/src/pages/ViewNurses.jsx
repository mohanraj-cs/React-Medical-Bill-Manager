import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import "../non-app-css/styles.css";

const ViewNurses = () => {

    const [nurses, setNurses] = useState([]);

    const location = useLocation()

    const wardName = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchNurses = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/nurses/" + wardName)
                setNurses(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchNurses();

    }, [])

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">WARD NURSES RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Nurse No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Care Unit No</th>
                            <th scope="col">Is Staff Nurse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                nurses.map((nurse) => (
                                    <tr key={nanoid()}>
                                        <td>{nurse.nurseNo}</td>
                                        <td>Nurse {nurse.nurseName}</td>
                                        <td>{nurse.careunitNo}</td>
                                        <td>{nurse.isStaffnurse}</td>
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

export default ViewNurses;