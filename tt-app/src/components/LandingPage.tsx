import {Container} from "reactstrap";
import Box from "@mui/material/Box";
import SearchAppBar from "./SearchAppBar";
import React from "react";



const backgroundImage = "mainLandingImage.jpg"

const landingPage = () => {


    return (
        <>
            <SearchAppBar />

            <Container>
                <Box sx={{
                    width:'100vw',
                    height:'40vh',
                    marginTop:'9vh',
                    backgroundImage: `url(${require(`../assets/img/${backgroundImage}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                </Box>





            </Container>


        </>


    )




}

export default landingPage;