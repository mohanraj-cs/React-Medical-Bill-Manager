create table ward(

  wardName varchar(15) primary key,
  specialty varchar(25)
);

insert into ward values('Karakoram', 'orthopedic');
insert into ward values('Khyber', 'pediadtric');

create table careunit(

  careunitNo integer primary key,
  wardName varchar(15),
  
  constraint careunitFKToWard foreign key(wardName) references ward(wardName)
);

insert into careunit values(2001, 'Khyber');
insert into careunit values(2002, 'Khyber');
insert into careunit values(2003, 'Karakoram');
insert into careunit values(2004, 'Karakoram');

create table nurse(

  nurseName varchar(30),
  nurseNo integer primary key,
  wardName varchar(15),
  careunitNo integer,
  isStaffnurse char(1),
  
  constraint nurseFKToWard foreign key(wardName) references ward(wardName),
  constraint nurseFKToCareunit foreign key(careunitNo) references careunit(careunitNo)
);

alter table nurse
add constraint checkNurseDisjoint
check (isStaffnurse in ('T', 'F'));

insert into nurse values('Ayesha', 3001, 'Khyber', 2001, 'F');
insert into nurse values('Fatima', 3002, 'Khyber', 2001, 'T');

insert into nurse values('Razia', 3003, 'Khyber', 2001, 'F');

insert into nurse values('Sultana', 3004, 'Karakoram', 2003, 'T');
insert into nurse values('Aadil', 3005, 'Karakoram', 2003, 'F');
insert into nurse values('Sharmeen', 3006, 'Karakoram', 2003, 'F');


create table sister(

  nurseNo integer primary key,
  shift varchar(5),
  sisterSalary integer,
  
  constraint sisterFKToNurse foreign key(nurseNo) references nurse(nurseNo)
);

alter table sister
add constraint checksisterShift
check (shift in ('day', 'night'));

insert into sister values(3001, 'night', 7500);
insert into sister values(3003, 'day', 7500);

insert into sister values(3005, 'night', 7500);
insert into sister values(3006, 'day', 7500);

create table staffnurse(

  nurseNo integer primary key,
  nurseSalary integer,
  inChargeCareunitNo integer,
  
  constraint staffnurseFKToNurse foreign key(nurseNo) references nurse(nurseNo),
  constraint staffnurseFKToInChargeCareunit foreign key(inChargeCareunitNo) references careunit(careunitNo)
);

insert into staffnurse values(3002, 25000, 2001);

insert into staffnurse values(3004, 25000, 2003);


create table doctor(

  doctorNo integer primary key,
  doctorName varchar(30),
  isConsultant char(1)
);

alter table doctor
add constraint checkDoctorDisjoint
check (isConsultant in ('T', 'F'));

insert into doctor values(1001, 'Dr.Arshad', 'F');
insert into doctor values(1002, 'Dr.Sohail', 'T');

insert into doctor values(1003, 'Dr.Aamir', 'T');
insert into doctor values(1004, 'Dr.Raza', 'F');
insert into doctor values(1005, 'Dr.Sumaira', 'F');

insert into doctor values(1006, 'Dr.Ali', 'F');
insert into doctor values(1007, 'Dr.Mariam', 'F');
insert into doctor values(1008, 'Dr.Sania', 'F');

insert into doctor values(1009, 'Dr.Zarak', 'T');
insert into doctor values(1010, 'Dr.Shumaila', 'T');
insert into doctor values(1011, 'Dr.Shaheen', 'T');
insert into doctor values(1012, 'Dr.Riaz', 'T');

create table consultant(

  doctorNo integer primary key,
  speciality varchar(25),
  consultantSalary integer,
  
  constraint consultantFKToDoctor foreign key(doctorNo) references doctor(doctorNo)
);

insert into consultant values(1002, 'Neurology', 1000000);

insert into consultant values(1003, 'Surgery', 1000000);

insert into consultant values(1009, 'Surgery', 1000000);
insert into consultant values(1010, 'Neurology', 1000000);
insert into consultant values(1011, 'Psychiatry', 1000000);
insert into consultant values(1012, 'Dermatology', 1250000);



create table nonconsultant(

  doctorNo integer primary key,
  position char(2),
  teamLeadNo integer,
  teamJoinDate Date,
  nonconsultantSalaray integer,
  
  constraint nonconsultantFKToDoctor foreign key(doctorNo) references doctor(doctorNo),
  constraint nonconsultantFKToTeam foreign key(teamLeadNo) references consultant(doctorNo)
);

alter table nonconsultant
add constraint checkPosition
check (position in ('s', 'jh', 'sh', 'ar', 'r'));

insert into nonconsultant values(1001, 'sh', 1002, '2021-02-26', 65000);

insert into nonconsultant values(1004, 's', 1003, '2020-01-25', 65000);
insert into nonconsultant values(1005, 'ar', 1003, '2021-07-07', 65000);

insert into nonconsultant values(1006, 'jh', 1003, '2022-04-13', 65000);
insert into nonconsultant values(1007, 'jh', 1003, '2021-08-05', 65000);
insert into nonconsultant values(1008, 'jh', 1002, '2020-12-21', 75000);


create table experience(

  fromDate Date,
  toDate Date,
  position char(2),
  establishment varchar(30),
  nonconsultantNo integer,
  
  constraint experienceFKToNonconsultant foreign key(nonconsultantNo) references nonconsultant(doctorNo)
);

create unique index oneExperiencePerPeriod
on experience (fromDate, toDate);

insert into experience values('2020-03-01', '2020-06-05', 's', 'Shifa International Hospital', 1001);
insert into experience values('2020-08-17', '2020-11-25', 'jh', 'Riphah International Hospital', 1001);

insert into experience values('2019-05-19', '2019-12-13', 's', 'Shaafi International Hospital', 1004);

insert into experience values('2021-08-16', '2022-03-10', 's', 'Ali Medical Center', 1006);

insert into experience values('2020-02-16', '2020-11-25', 's', 'Islamabad Diagnostic Center', 1007);
insert into experience values('2021-02-08', '2021-07-26', 's', 'Shifa International Hospital', 1007);



create table performance(

  monitorDate Date,
  grade char(1),
  nonconsultantNo integer,
  
  constraint performanceFKToNonconsultant foreign key(nonconsultantNo) references nonconsultant(doctorNo)
);

create unique index oneGradePerMontiorDate
on performance (monitorDate, grade);

alter table performance
add constraint checkGrade
check (grade in ('A', 'B', 'C', 'D', 'E', 'F'));

insert into performance values('2021-07-26', 'B', 1001);
insert into performance values('2022-01-26', 'A', 1001);
insert into performance values('2022-07-26', 'A', 1001);

insert into performance values('2021-06-21', 'B', 1008);
insert into performance values('2021-12-21', 'C', 1008);
insert into performance values('2022-06-21', 'A', 1008);
insert into performance values('2022-12-21', 'B', 1008);


create table patient(

  patientNo integer primary key,
patientName varchar(30),
  dateOfBirth Date,
  doctorNo integer,
  wardName varchar(15),
  careunitNo integer,
  admittedDate Date,
  bedNo integer,
  consultantInChargeNo integer,
  
  constraint patientFKToDoctor foreign key(doctorNo) references doctor(doctorNo),
  constraint patientFKToWard foreign key(wardName) references ward(wardName),
  constraint patientFKToCareunit foreign key(careunitNo) references careunit(careunitNo),
  constraint patientFKToConsultant foreign key(consultantInChargeNo) references consultant(doctorNo)
);
alter table patient
add constraint uniqueBedNo
unique (bedNo);

drop table patient;

delete from patient where patientNo = 0001;

insert into patient values(0001, 'Ahmed Khan', '2000-11-21', 1001, 'Khyber', 2001, '2022-01-25', 3, 1002);
insert into patient values(0002, 'Subhan Sarif', '1989-02-15', 1001, 'Khyber', 2001, '2022-01-17', 2, 1002);

insert into patient values(0003, 'Rubaib Usman', '2001-11-03', 1006, 'Karakoram', 2003, '2022-01-25', 5, 1003);
insert into patient values(0004, 'Barak Zubair', '1995-03-12', 1007, 'Karakoram', 2003, '2022-01-17', 7, 1003);
insert into patient values(0005, 'Rafia Rehan', '1999-09-28', 1006, 'Karakoram', 2003, '2022-04-09', 8, 1003);

update patient set careunitNo = 2001 where patientNo = 0004;


create table complaint(

  complaintCode integer primary key,
  description varchar(256),
  patientNo integer,
  
  constraint complaintFKToPatient foreign key(patientNo) references patient(patientNo)
);

select * from complaint;

insert into complaint values(4001, 'intense back pain', 0002);
insert into complaint values(4002, 'right calf muscle pulled', 0002);

insert into complaint values(4003, 'skin rash', 0001);

insert into complaint values(4004, 'repetitive vomitting', 0003);
insert into complaint values(4005, 'malaria symptoms', 0004);
insert into complaint values(4006, 'Frozen shoulder', 0005);



create table treatment(
  
  treatmentCode integer primary key,
  startDate Date,
  endDate Date,
  complaintCode integer,
  doctorNo integer,
  treatmentType varchar(50),
  
  constraint treatmentFKToComplaint foreign key(complaintCode) references complaint(complaintCode),
  constraint treatmentFKToDoctor foreign key(doctorNo) references nonconsultant(doctorNo)
);

create unique index oneTreatmentComplaint
on treatment (complaintCode, treatmentType);

insert into treatment values(5001, '2022-01-17', '2022-01-25', 4001, 1001, 'Reverse axial push');
insert into treatment values(5002, '2022-01-17', '2022-01-21', 4002, 1004, 'neuro massage laxative');

insert into treatment values(5004, '2022-01-26', '2022-01-30', 4004, 1006, 'anti-turmol flexing');
insert into treatment values(5005, '2022-01-17', '2022-02-18', 4005, 1007, 'rudimentary injection procedure');
insert into treatment values(5006, '2022-04-09', '2022-04-15', 4006, 1006, 'heat pad treatment');
insert into treatment values(5008, '2022-04-07', '2022-04-10', 4004, 1007, 'sdsd fds weqe');

insert into treatment values(5008, '2022-12-02', '2022-12-14', 4007, 1007, 'asdasd');

update treatment set startDate = '2022-04-11' where treatmentCode = 5006;


select * from patient

