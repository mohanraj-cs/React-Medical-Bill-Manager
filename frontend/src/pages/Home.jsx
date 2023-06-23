import React from 'react'
import { Link } from 'react-router-dom';
import "../non-app-css/styles.css";

const Home = () => {

    return (

        <div className = "home">
            <h1 className = "homeTitle">Warden</h1>
            <div className = "homeButtons">
                <button className = "homeBtn btn-outline-primary">
                    <Link to = "/Wards" style = {{color: 'inherit', textDecoration: 'inherit'}}>Wards</Link>
                </button>
                <button className = "homeBtn btn-outline-primary">
                    <Link to = "/Consultants" style = {{color: 'inherit', textDecoration: 'inherit'}}>Consultants</Link>
                </button>
                <button className = "homeBtn btn-outline-primary">
                    <Link to = "/Patients" style = {{color: 'inherit', textDecoration: 'inherit'}}>Patients</Link>
                </button>
            </div>
        </div>
    )
}

export default Home;