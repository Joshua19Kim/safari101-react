import React from 'react';
import './App.css';
import theme from './assets/style/theme'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound"
import LandingPage from "./components/LandingPage"
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Request from "./components/Request";
import TripsPage from "./components/TripsPage";
import TopNavBar from "./components/TopNavBar";
import Layout from './components/Layout';



function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
              <div className="App">
                  <Layout>
                      <Router>
                          <TopNavBar />
                          <div>
                              <Routes>
                                  <Route path="/" element={<LandingPage/>}/>
                                  <Route path="/trips/:activity/:category?" element={<TripsPage/>}/>
                                  <Route path="/contact" element={<Contact/>}/>
                                  <Route path="/aboutus" element={<AboutUs/>}/>
                                  <Route path="/request" element={<Request/>}/>
                                  <Route path="/*" element={<NotFound/>}/>
                              </Routes>
                          </div>
                      </Router>
                  </Layout>

              </div>
      </ThemeProvider>
  );
}

export default App;