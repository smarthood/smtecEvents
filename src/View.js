import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import DrawerComponent from './DrawerComponent'
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material'
import {collection,orderBy,query,onSnapshot,deleteDoc,doc} from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { Add, ViewAgenda } from '@mui/icons-material'
import { Box, Stack } from '@mui/system'
import { db } from './Firebase'
import { toast, ToastContainer } from 'react-toastify'
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  Card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  CardMedia: {
    padding: '26.25%'
  },
CardContent: {
  flexGrow: 1
},
title: {
  fontFamily: 'Source Sans Pro',
  color: 'CaptionText',
  textTransform:"capitalize"
},
FeaturesContainer: {
    height: '100vh',
    background: 'pink'
  }
}));
export default function View() {
  const classes = useStyles();
  const [data,setData]=useState([])
  const [open, setOpen] = useState(false);
  const theme = useTheme();
const handleDelete=async(id)=>{
  if (window.confirm('Are you sure you wish to delete this item?')){
  try {
    await deleteDoc(doc(db,"events",id))
    toast("Entry deleted!",{type:"success"})
    }
     catch (e) {
      toast("Error :(",{type:"error"})
      console.log(e);
    }}
  }
  const handleClickOpen = (id) => {
    const res=notes.find((item)=>{
      return item.id===id
    })
    setData(res)
    setOpen(true);
  };
       const handleClose = () => {
    setOpen(false);
  };
  const [notes,setNotes]=useState([])
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
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
  const [isDrawerOpen,setIsDrawerOpen]=useState(false)
  useEffect(()=>{
    const noteRef = collection(db,"events")
    const q= query(noteRef, orderBy("edate","desc"));
    onSnapshot(q,(snapshot)=>{
        const note = snapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data(),
        }));
        console.log(note)
        setNotes(note);
    })
},[])
  return (
    <div>
      <Navbar setIsDrawerOpen={setIsDrawerOpen}/>
      <Toolbar />
      <ToastContainer />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" sx={{textTransform:"capitalize"}}>
          Event ID: {data.enid}
        </DialogTitle>
        <DialogContent>
        <Typography> Event Name: {data.ename}</Typography>
        <Typography>Event Organiser: {data.eorg}</Typography>
          <DialogContentText>
           Event Details: {data.edesc}
          </DialogContentText>
        </DialogContent>
        {data.eurl!="null" &&
        <Button variant="contained" onClick={()=>window.open(data.eurl)}>view file</Button>
        }
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
           Close
          </Button>
        </DialogActions>
      </Dialog>
      <DrawerComponent isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} menuItem={menuItem}/>
      <Stack direction='row' justifyContent="space-between">
        <Box flex={2} sx={{background: "#051E34",color:"white",width:"200px",minHeight: "100vh", boxShadow: 10,display: { xs: 'none', sm: 'none',md:"block" } ,left: 0,borderRight:"1px solid grey"}}>
          {menuItem}
        </Box>
        <Box flex={10} p={3} component="div" maxWidth="md">
    <Grid  container spacing={4}  >
        {notes.length === 0 ? (
          <Box sx={{display:"flex",flexDirection: "column",alignItems: "center",width: "100%",height: "100vh",marginTop:"20px"}}>
          <Typography >No events created!</Typography>
          </Box>
          ):(
            notes.slice(0).reverse().map(({id,ename,edate})=>
            <Grid key={id}  item xs={12} md={4}  sm={6}>
                       <Card className={classes.Card}>
                  <CardContent>
                    <Typography gutterBottom variant='h6' sx={{textTransform:"capitalize"}}>{ename}</Typography>
                    <Typography className={classes.title}>{edate.toDate().toDateString()}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>handleClickOpen(id)}>View</Button>
                    <Button onClick={() => handleDelete(id)}>Delete</Button>
                  </CardActions>
                </Card>     
            </Grid>))}
        </Grid>
        </Box>
      </Stack>
    </div>
  )
}
