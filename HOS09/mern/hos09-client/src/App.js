import React from "react";

//Use Route to defind different routes  of our application
import {Route, Routes} from "react-router-dom";

//Import the needed components
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<RecordList/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>     
    </div>
  );
}

export default App;
