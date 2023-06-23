import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app = express()

const PORT = 5601;
const db = mysql.createConnection({

    host:"abc",
    user:"root",
    password:"123",
    database:"not-railway"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{

    res.json("welcome to the backend!")
})

app.get("/wards", (req, res)=>{
    
    const query = "select c.careunitNo, w.wardName, w.specialty, n1.nurseName as nurseincharge, n2.nurseName as daysister, n3.nurseName as nightsister from careunit c, ward w, nurse n1, nurse n2, nurse n3, staffnurse sn, sister s1, sister s2 where (n3.careunitNo = c.careunitNo and s2.nurseNo = n3.nurseNo and s2.shift = 'night') and (n2.careunitNo = c.careunitNo and s1.nurseNo = n2.nurseNo and s1.shift = 'day') and (n1.careunitNo = c.careunitNo and sn.nurseNo = n1.nurseNo) and c.wardName = w.wardName"
    
    db.query(query,(err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/patients", (req, res)=>{
    
    const query = "select * from patient"
    db.query(query,(err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/consultants", (req, res)=>{
    
    const query = "select c.doctorNo, d.doctorName, c.speciality, c.consultantSalary from consultant c, doctor d where c.doctorNo = d.doctorNo"
    db.query(query,(err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/team/:consultantNo", (req, res) => {
    

    const query = "select d.doctorName, nc.* from nonconsultant nc, doctor d where nc.doctorNo = d.doctorNo and `teamLeadNo` = ?"
    
    const consultantNo = req.params.consultantNo;

    db.query(query, [consultantNo], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/experience/:consultantNo", (req, res) => {
    

    const query = "select * from experience where nonconsultantNo = ?"
    
    const consultantNo = req.params.consultantNo;

    db.query(query, [consultantNo], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/performance/:consultantNo", (req, res) => {
    

    const query = "select * from performance where nonconsultantNo = ?"
    
    const consultantNo = req.params.consultantNo;

    db.query(query, [consultantNo], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/complaints/:patientNo", (req, res) => {
    

    const query = "select * from complaint where patientNo = ?"

    const patientNo = req.params.patientNo;

    db.query(query, [patientNo], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/treatments/:complaintCode", (req, res) => {
    
    const query = "select t.treatmentCode, d.doctorName, t.startDate, t.endDate, t.treatmentType from treatment t, complaint c, doctor d where d.doctorNo = t.doctorNo and t.complaintCode = c.complaintCode and c.complaintCode = ?"

    const complaintCode = req.params.complaintCode;

    db.query(query, [complaintCode], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/nurses/:wardName", (req, res) => {
    

    const query = "select * from nurse where wardName = ?"
    
    const wardName = req.params.wardName;

    db.query(query, [wardName], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.get("/patients/:wardName", (req, res) => {
    

    const query = "select * from patient where wardName = ?"
    
    const wardName = req.params.wardName;

    db.query(query, [wardName], (err,data)=>{

        if (err)
            return res.json(err)

        return res.json(data)
    })
})

app.post("/wards", (req, res)=> {

    const query = "insert into ward values(?)"

    const values = [

        req.body.wardName,
        req.body.specialty
    ];

    db.query(query, [values], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json("Ward has been created successfully!")
    })
})

app.post("/performances", (req, res)=> {

    const query = "insert into performance values(?)"

    const values = [

        req.body.MonitorDate,
        req.body.grade,
        req.body.nonconsultantNo
    ];

    db.query(query, [values], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json("Performance has been added successfully!")
    })
})

app.post("/addNewPatient", (req, res)=> {

    const query = "insert into patient values(?)"

    const values = [

        req.body.patientNo,
        req.body.patientName,
        req.body.dateOfBirth,
        null,
        null,
        null,
        null,
        null,
        req.body.consultantInChargeNo
    ];

    db.query(query, [values], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json("Patient has been added successfully!")
    })
})

app.post("/addNewComplaint/:patientNo", (req, res)=> {

    const patientNo = req.params.patientNo;

    const query = "insert into complaint values(?)"

    const values = [

        req.body.complaintCode,
        req.body.description,
        patientNo
    ];

    db.query(query, [values], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json("Complaint has been added successfully!")
    })
})

app.post("/addNewTreatment/:complaintCode", (req, res)=> {

    console.log("in treatment!")

    const complaintCode = req.params.complaintCode;

    const query = "insert into treatment values(?)"

    const values = [

        req.body.treatmentCode,
        req.body.startDate,
        req.body.endDate,
        complaintCode,
        req.body.doctorNo,
        req.body.treatmentType
    ];

    console.log(values)

    db.query(query, [values], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json("Treatment has been added successfully!")
    })
})

app.delete("/wards/:wardName", (req, res) => {

    const wardWardName = req.params.wardName;
    const query = "delete from ward where wardName = ?";

    db.query(query, [wardWardName], (err, data) => {

        if (err) 
            return res.json(err);
        
        return res.json("Ward has been deleted successfully!");
    });
});

app.put("/dischargePatient/:pNo", (req, res) => {

    const pNo = req.params.pNo;
    const query = "update patient set wardName = null, careunitNo = null, bedNo = null where patientNo = ?";

    db.query(query, [pNo], (err, data) => {

        if (err) 
            return res.json(err);
        
        return res.json("Patient has been discharged successfully!");
    });
});

app.put("/admitPatient/:wardName", (req, res) => {

    const wardName = req.params.wardName;

    const query = "update patient set wardName = ?, careunitNo = ?, bedNo = ?, admittedDate = ? where patientNo = ?";

    const values = [
        req.body.careunitNo,
        req.body.bedNo,
        req.body.admittedDate,
        req.body.patientNo
    ]

    db.query(query, [wardName, ...values], (err, data) => {

        if (err) 
            return res.json(err);
        
        return res.json("Patient has been admitted successfully!");
    });
});

app.put("/addToTeam/:consultantNo", (req, res) => {

    const consultantNo = req.params.consultantNo;

    const query = "update nonconsultant set teamLeadNo = ?, teamJoinDate = ? where doctorNo = ?";

    const values = [
        req.body.teamJoinDate,
        req.body.doctorNo
    ]

    db.query(query, [consultantNo, ...values], (err, data) => {

        if (err) 
            return res.json(err);
        
        return res.json("Doctor has been added to the team successfully!");
    });
});

app.get("/getPatientNo/:complaintCode", (req, res)=> {

    const complaintCode = req.params.complaintCode;

    const query = "select patientNo from complaint where complaintCode = ?"

    db.query(query, [complaintCode], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json(data)
    })
})

app.put("/addPatientDoctor/:doctorNo", (req, res)=> {

    const doctorNo = req.params.doctorNo;

    const query = "update patient set doctorNo = ? where patientNo = ?"

    console.log(doctorNo)
    console.log(req.body.patientNo)

    db.query(query, [doctorNo, req.body.patientNo], (err,data)=>{

        if (err) 
            return res.json(err)
        
        return res.json("Doctor has been assigned successfully!")
    })
})

app.listen((process.env.PORT || PORT), ()=>{

    console.log("Connected to backend!");
})