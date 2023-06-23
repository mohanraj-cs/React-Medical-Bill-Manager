import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import "../non-app-css/styles.css";

const Wards = () => {

    const [Wards, setWards] = useState([])

    useEffect(()=>{

        const fetchAllWards = async () => {

            try{

                const res = await axios.get("https://nice-pink-coral-tam.cyclic.app/wards")
                console.log(res)
                setWards(res.data);

            } catch(err) {

                console.log(err);
            }
        }

        fetchAllWards();

    }, [])

    /*const handleDelete = async (name) => {

        try{

            await axios.delete("https://nice-pink-coral-tam.cyclic.app/wards/" + name)
            window.location.reload()

        } catch (err) {

            console.log(err)
        }
    }*/

    return (

        <div>
        {/*<button className = "delete" onClick = {() => handleDelete(ward.wardName)}>Delete</button>
        <button className = "update"><Link to = {`/updateWard/${ward.wardName}`}>Update</Link></button>*/}
            <div class="content">
                <div class="container">
                    <h2 class="mb-5">WARD RECORD</h2>
                    <div class="table-responsive custom-table-responsive">
                        <table class="table custom-table">
                        <thead>
                            <tr>  
                            <th scope="col">Name</th>
                            <th scope="col">Specialty</th>
                            <th scope="col">Day Sister</th>
                            <th scope="col">Night Sister</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Wards.map((ward) => (
                                    <tr key={nanoid()}>
                                        <td>{ward.wardName}</td>
                                        <td>{ward.specialty}</td>
                                        <td>Nurse {ward.daysister}</td>
                                        <td>Nurse {ward.nightsister}</td>
                                        <td>
                                        <button class="btn btn-outline-primary flexingTD"><Link to = {`/viewNurses/${ward.wardName}`}>View Nurses</Link></button>
                                        <button class="btn btn-outline-primary"><Link to = {`/viewPatients/${ward.wardName}`}>View Patients</Link></button>
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

export default Wards;