import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Consultants from './pages/Consultants';
import Complaints from './pages/Complaints';
import AddComplaint from './pages/AddComplaint';
import Treatments from './pages/Treatments';
import AddTreatment from './pages/AddTreatment';
import Wards from './pages/Wards';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import AddWard from './pages/AddWard';
import UpdateWard from './pages/UpdateWard';
import ViewNurses from './pages/ViewNurses';
import ViewPatients from './pages/ViewPatients';
import ViewTeam from './pages/ViewTeam';
import ViewExperience from './pages/ViewExperience';
import Performance from './pages/Performance';
import AddPerformance from './pages/AddPerformance';
import AdmitPatient from './pages/AdmitPatient';
import AddToTeam from './pages/AddToTeam';
import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/Consultants" element={<Consultants/>}/>
            <Route path = "/Wards" element={<Wards/>}/>
            <Route path = "/viewNurses/:wardName" element={<ViewNurses/>}/>
            <Route path = "/viewPatients/:wardName" element={<ViewPatients/>}/>
            <Route path = "/admitPatient/:wardName" element={<AdmitPatient/>}/>
            <Route path = "/Patients" element={<Patients/>}/>
            <Route path = "/AddPatient" element={<AddPatient/>}/>
            <Route path = "/addWard" element={<AddWard/>}/>
            <Route path = "/updateWard/:wardName" element={<UpdateWard/>}/>
            <Route path = "/viewTeam/:consultantNo" element={<ViewTeam/>}/>
            <Route path = "/ViewExperience/:consultantNo" element={<ViewExperience/>}/>
            <Route path = "/Performance/:consultantNo" element={<Performance/>}/>
            <Route path = "/AddPerformance/:consultantNo" element={<AddPerformance/>}/>
            <Route path = "/AddToTeam/:consultantNo" element={<AddToTeam/>}/>
            <Route path = "/Complaints/:patientNo" element={<Complaints/>}/>
            <Route path = "/Treatments/:complaintCode" element={<Treatments/>}/>
            <Route path = "/AddComplaint/:patientNo" element={<AddComplaint/>}/>
            <Route path = "/AddTreatment/:complaintCode" element={<AddTreatment/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
