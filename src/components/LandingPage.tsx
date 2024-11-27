import {Container} from "reactstrap";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import React, {useEffect, useState} from "react";
import '../assets/css/Main.css';
import theme from "../assets/style/theme";





const backgroundImage = "mainLandingImage.jpg"
const secondBackImage = "brightBackground.jpg"

const LandingPage = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>

            <Container>
                <RequestBox image={backgroundImage} />
                <Box sx={{
                    // backgroundImage: `url(${require(`../assets/img/${secondBackImage}`)})`,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    backgroundColor: theme.palette.customBackgroundColor.main,
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

export default LandingPage;