import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'


export default function Navbar({setIsDrawerOpen}) {
  return (
    <AppBar>
    <Toolbar style={{
         displey: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         background:"#051E34"
       }}>
         <IconButton
         sx={{
             color: 'white',
             display: { xs: 'block', sm: 'block',md:"none" }
           }}
           onClick={()=>setIsDrawerOpen(true)}
           >
           <Menu />
         </IconButton>
       <Typography>SMTEC Events</Typography>
     </Toolbar>
    </AppBar>
  )
}
