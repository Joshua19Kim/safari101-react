import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound"
import LandingPage from "./components/LandingPage"
import Test from "./components/Test"
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Request from "./components/Request";


function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LandingPage/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/request" element={<Request/>}/>

                <Route path="/test" element={<Test/>}/>
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;