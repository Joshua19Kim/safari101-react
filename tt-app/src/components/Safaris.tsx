import SearchAppBar from "./SearchAppBar";
import React from "react";
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import {Container} from "reactstrap";



const backgroundImage = "safariLion.jpg"
const secondBackImage = "brightBackground.jpg"

const Safaris = () => {
    return (
        <>
            <SearchAppBar />
            <Container>
                <RequestBox image={backgroundImage} />
                <Box sx={{
                    backgroundImage: `url(${require(`../assets/img/${secondBackImage}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    width: '100%',
                    // Add any additional styling for your content here
                }}>
                    {/* Add your additional content here */}
                    <Container>
                        {/* Your content goes here */}
                    </Container>
                </Box>




            </Container>



        </>
    )
}

export default Safaris;