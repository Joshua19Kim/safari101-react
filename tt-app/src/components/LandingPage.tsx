import {Button, Container} from "reactstrap";
import Box from "@mui/material/Box";
import SearchAppBar from "./SearchAppBar";
import RequestBox from "./RequestBox";
import React from "react";
import Typography from "@mui/material/Typography";
import {Grid, TextField} from "@mui/material";
import '../assets/css/Main.css';





const backgroundImage = "mainLandingImage.jpg"

const LandingPage = () => {


    return (
        <>
            <SearchAppBar />

            <Container>
                <RequestBox image={backgroundImage} />





            </Container>


        </>


    )




}

export default LandingPage;