import React, {useRef, useEffect, useState} from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import { SectionBox, SectionTypography, Section, ContentsBox } from "../assets/style/styledComponents";



const mainSections = [
    { id: 'safari', title: 'SAFARI', image: 'griff.jpg', content: 'Safari Content' },
    { id: 'climbing', title: 'Climbing', image: 'climbing.png',  content: 'Climbing Content' },
    { id: 'dayTrip', title: 'Day Trip', image: 'dayTrip.jpg',  content: 'Daytrip Content' },
];

const backgroundImage = "safariBackground.jpg"

const Background = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        right: '-10px',
        bottom: '-10px',
        background: `url(${require(`../assets/img/${backgroundImage}`)}) no-repeat center center / cover`,
        filter: 'blur(10px)',
    },
});


const Main = () => {

    const pageHeader = useRef<HTMLDivElement>(null);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const handleSectionClick = (id: string) => {
        setSelectedSection(selectedSection === id ? null : id);
    };
    const getContentById = (id: string | null): string | undefined => {
        const section = mainSections.find(section => section.id === id);
        return section?.content;
    };



    return (
        <>
            <SearchAppBar />
                <Background
                    style={{
                        backgroundImage: `url(${require(`../assets/img/${backgroundImage}`)})`,
                    }}
                    data-parallax={true}
                    ref={pageHeader}
                />
                <Box className="parent-container">
                    <Box className="outside-container">
                        <SectionBox
                            isSelected={selectedSection !== null}
                        >
                            {mainSections.map((section) => (
                            <Section
                                onClick={() => handleSectionClick(section.id)}
                                 sx={{
                                     backgroundImage: `url(${require(`../assets/img/${section.image}`)})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                     '&::before': {
                                         content: '""',
                                         position: 'absolute',
                                         background: `url(${require(`../assets/img/${section.image}`)}) no-repeat center center / cover`,
                                         filter: (selectedSection !== null) ? 'blur(3px)' : 'none',
                                         transition: 'filter 0.3s ease-in-out',
                                     },
                                 }}
                            >
                                <SectionTypography
                                    isSelected={selectedSection !== null}
                                >

                                    {section.title}
                                </SectionTypography>
                            </Section>
                            ))}


                        </SectionBox>
                        <ContentsBox
                            isSelected={selectedSection !== null}
                        >
                            <Typography variant="body1">
                                {getContentById(selectedSection)}
                            </Typography>
                        </ContentsBox>



                    </Box>

                </Box>

        </>

)
}

export default Main;