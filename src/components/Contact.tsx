import SearchAppBar from "./SearchAppBar";
import React from "react";
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";


const backgroundImage = "safariBackground.jpg"

const Contact = () => {
    return (
        <>
            <SearchAppBar />
            <Background bgImage={require(`../assets/img/${backgroundImage}`)} />

            <Box sx={{marginTop:'10rem'}}>
                <h1>Contact page</h1>
            </Box>



        </>
    )
}

export default Contact;