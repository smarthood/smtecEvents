import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import View from "./View";
function App() {
  
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path="/" element={<Main />}/>
    <Route path="/events" element={<View />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
