import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import "../non-app-css/styles.css";

const Performance = () => {

    const [performance, setPerformance] = useState([])

    const location = useLocation()

    const consultantNo = location.pathname.split("/")[2];

    useEffect(()=>{

        const fetchPerformance = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/performance/" + consultantNo)
                console.log(res)
                setPerformance(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchPerformance();

    }, [])

    return (

        <div>
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">PERFORMANCE RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Monitor Date</th>
                            <th scope="col">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                performance.map((p) => (
                                    <tr key={nanoid()}>
                                        <td>{p.monitorDate}</td>
                                        <td>{p.grade}</td>
                                        <tr class="spacer"><td colspan="100"></td></tr>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                    <div class = "centerBtn">
                        <button class = "btn btn-outline-primary"><Link to = {`/AddPerformance/${consultantNo}`} style = {{color: 'inherit', textDecoration: 'inherit'}}>Add Performance</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Performance;