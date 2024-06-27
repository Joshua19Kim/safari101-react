import React, {useRef, useEffect, useState} from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {SectionBox, SectionTypography, Section, ContentsBox, Background} from "../assets/style/styledComponents";



const mainSections = [
    { id: 'safari', title: 'SAFARI', image: 'griff.jpg', content: 'Safari Content' },
    { id: 'climbing', title: 'Climbing', image: 'climbing.png',  content: 'Climbing Content' },
    { id: 'dayTrip', title: 'Day Trip', image: 'dayTrip.jpg',  content: 'Daytrip Content' },
];

const backgroundImage = "safariBackground.jpg"


const Main = () => {

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
                <Background bgImage={require(`../assets/img/${backgroundImage}`)}/>
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