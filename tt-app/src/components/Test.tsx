import SearchAppBar from "./SearchAppBar";
import React, {useRef} from "react";
import Box from "@mui/material/Box";
import {Background} from "../assets/style/styledComponents";



const backgroundImage = "safariBackground.jpg"


const Test = () => {

    return (
        <>
            <SearchAppBar />
            <Background bgImage={require(`../assets/img/${backgroundImage}`)} />
            <Box sx={{marginTop:'10rem'}}>
                <h1>Test page</h1>
            </Box>


        </>
            )
}

export default Test;