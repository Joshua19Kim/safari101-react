import React from "react";
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";



const backgroundImage = "safariBackground.jpg"
const AboutUs = () => {
    return (
        <>
            <Background bgImage={require(`../assets/img/${backgroundImage}`)} />

            <Box sx={{marginTop:'10rem'}}>
                <h1>About Us page</h1>
            </Box>



        </>
    )
}

export default AboutUs;