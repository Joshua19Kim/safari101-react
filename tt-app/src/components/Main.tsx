import React, {useRef, useEffect, useState} from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";


const sections = [
    { id: 'safari', title: 'SAFARI', image: 'griff.jpg', content: 'Safari Content' },
    { id: 'climbing', title: 'Climbing', image: 'climbing.png',  content: 'Climbing Content' },
    { id: 'dayTrip', title: 'Day Trip', image: 'dayTrip.jpg',  content: 'Daytrip Content' },
];

const backgroundImage = "safariBackground.jpg"


const SectionBox = styled(Box)<{ isSelected: boolean }>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: isSelected ? '8%' : '100%',
    width: '100%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItem: 'center',
    transition: 'height 0.3s ease-in-out',
}));

const SectionTypography = styled(Typography)<{ isSelected: boolean }>(({ isSelected }) => ({
    fontSize: isSelected ? '2vw' : '5vw',
    color: 'white',
    position: 'absolute',
    fontWeight:'bold',
    fontFamily: 'roboto',
    top: isSelected ? '0%' : '30%',
    left: isSelected ? '10%' : '2%',
    right: isSelected ? 'auto' : '50%',
    textShadow: '3px 3px 6px rgba(0,0,0,5)',
    transform: isSelected ? 'rotate(0deg)' : 'rotate(270deg)',
    whiteSpace: 'nowrap',

}));


const Section = styled(Box)({
    flex: 1,
    height:'100%',
    width:'33.33%',
    position: 'relative',
    transition: 'height 0.3s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
        opacity: 0.8,
    },
});

const ContentsBox = styled(Box)<{ isSelected: boolean }>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: isSelected ? '92%' : '0%',
    width: '100%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItem: 'center',
    transition: 'height 0.3s ease-in-out',
    backgroundColor: 'white',

}));

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
        const section = sections.find(section => section.id === id);
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
                            {sections.map((section) => (
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