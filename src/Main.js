import React from 'react'
import {  Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Add, PhotoCamera, ViewAgenda } from '@mui/icons-material';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DrawerComponent from './DrawerComponent';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {db} from './Firebase'

import {
    collection,
    addDoc,
  } from 'firebase/firestore';
import Navbar from './Navbar';

export default function Main() {
    const [value, setValue] = useState(new Date());
    const [description,setDescription]=useState()
    const [eName,setEName]=useState()
    const [eOrg,setEOrg]=useState()
    const [eUrl,setEUrl]=useState("null")
    const [isDrawerOpen,setIsDrawerOpen] = useState(false)
    const eid =generateP()
    function guardarArchivo(e) {
      var file = e.target.files[0] //the file
      var reader = new FileReader() //this for convert to Base64 
      reader.readAsDataURL(e.target.files[0]) //start conversion...
      reader.onload = function (e) { //.. once finished..
        var rawLog = reader.result.split(',')[1]; //extract only thee file data part
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        fetch('https://script.google.com/macros/s/AKfycbz7ufL4hsZM_qA4pl2ad-cBO2uMV8ZuxV7R2kqadnQaF_5FwNHicuTm5RcFCvHkD0QX/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
          .then(res => res.json()).then((a) => {
            setEUrl(a.url) //See response
            toast("image uploaded!")
          }).catch(e => console.log(e)) // Or Error in console
      }
    }
  const handleSubmit =(e)=> {
    e.preventDefault(e)
     addDoc(collection(db, 'events'), {
        ename: eName,
        eorg: eOrg,
        eurl: eUrl,
        enid: eid,
        edate: value,
        edesc: description
      },(err)=>{
        console.log(err)
      })
      .then(toast("Submitted Successfully!"))
      document.getElementById("frm").reset()
      setValue(new Date())
    console.log("made by smart",eid)
    }
  const menuItem =(
    <List>
            <ListItem >
                <Link to="/">
       <ListItemButton onClick={()=>setIsDrawerOpen(false)}>
         <ListItemIcon>
           <Add sx={{color:"white"}}/>
         </ListItemIcon>
         <ListItemText primary="Add Event " />
       </ListItemButton>
                </Link>
     </ListItem>
        <Link to="/events">
     <ListItem >
       <ListItemButton>
         <ListItemIcon>
           <ViewAgenda sx={{color:"white"}}/>
         </ListItemIcon>
         <ListItemText primary="View Event " />
       </ListItemButton>
     </ListItem>
        </Link>
            </List>
  )
  function generateP() {
    var pass = 'E';
    var str = '0123456789';
      
    for (let i = 1; i <= 2; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}
  return (
    <div>
   <Navbar setIsDrawerOpen={setIsDrawerOpen} />
    <Toolbar />
    <DrawerComponent menuItem={menuItem} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    <Stack direction='row' justifyContent="space-between">
     <Box flex={2} sx={{background: "#051E34",color:"white",width:"200px",minHeight: "100vh", boxShadow: 10,display: { xs: 'none', sm: 'none',md:"block" } ,left: 0,borderRight:"1px solid grey"}}>
           {menuItem}
     </Box>
    <Box flex={10} p={3} component="div" maxWidth="md">
     <Box component="form" id="frm" onSubmit={handleSubmit} sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"}}>
     <Box sx={{width:"400px",marginTop:"20px"}}>
    <Button variant="outlined" component="label" >
  Upload Files
  <input hidden type="file" accept="application/pdf" id="customFile" onChange={(e) => guardarArchivo(e)} />
</Button>
<IconButton color="primary" aria-label="upload picture" component="label">
  <PhotoCamera  />
</IconButton><br />
  <Box component="span" sx={{color:"dodgerblue"}}>wait few minute after selected the file*</Box>
      </Box>
    <TextField id="outlined-basic" label="Event name" onChange={(e) => setEName(e.target.value)} variant="outlined" required sx={{marginTop:"20px",width:"400px"}}/>
    <TextField id="outlined-basic" label="Event organizer" onChange={(e) => setEOrg(e.target.value)} variant="outlined" required sx={{marginTop:"20px",width:"400px"}}/>
    <TextField id="outlined-basic" label="Event Details" onChange={(e)=>setDescription(e.target.value)} variant="outlined"  sx={{marginTop:"20px",width:"400px"}}/>
   
    <Box sx={{marginTop:"20px",width:"400px"}}>
    <LocalizationProvider dateAdapter={AdapterDateFns} >
       <DateTimePicker
         label="Date & Time"
         required
         renderInput={(params) => <TextField {...params} />}
         value={value}
         onChange={(newValue) => {
           setValue(newValue);
         }}
         />
   </LocalizationProvider>
         </Box>
         <Button variant="contained" type="submit" sx={{marginTop:"20px"}}>Submit</Button>
         <ToastContainer />
     </Box>
    </Box>
    </Stack>
    </div>
  )
}
