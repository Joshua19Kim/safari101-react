import React from 'react';
import './App.css';
import theme from './assets/style/theme'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/pages/NotFound"
import LandingPage from "./components/pages/LandingPage"
import Contact from "./components/pages/Contact";
import AboutUs from "./components/pages/AboutUs";
import Request from "./components/pages/Request";
import TripsPage from "./components/pages/TripsPage";
import TopNavBar from "./components/sections/TopNavBar";
import Layout from './components/layouts/Layout';
import ScrollToTop from "./components/layouts/ScrollToTop";



function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
              <div className="App">
                  <Layout>
                      <Router>
                          <ScrollToTop />
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