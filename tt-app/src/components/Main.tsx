import React, {useRef, useEffect, useState} from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";


const sections = [
    { id: 'safari', title: 'Safari', image: 'griff.png', content: 'Safari Content' },
    { id: 'climbing', title: 'Climbing', image: 'climbing.png',  content: 'Climbing Content' },
    { id: 'dayTrip', title: 'Daytrip', image: 'dayTrip.png',  content: 'Daytrip Content' },
    { id: 'aboutUs', title: 'About Us', image: 'request.png',  content: 'About Us Content' },
];
// const backgroundImage = "daniel-olahh.jpg"

const backgroundImage = "animal.png"

const Container = styled(Box)({
    display: 'flex',
    height: '100vh',
    width: '100%',
    flexDirection: 'row',
});

const SectionContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '92.7%',
    width: '100%',
    marginTop: '64px',
    cursor: 'pointer',
    transition: 'height 0.3s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        height: 'auto',
    },
}));

const Section = styled(Box)<{ isSelected: boolean }>(({ isSelected }) => ({
    flex: 1,
    height: isSelected ? '7%' : '100%',
    position: 'relative',
    transition: 'height 0.3s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
        opacity: 0.8,
    },

}));

const SectionContent = styled(Box)<{ isVisible: boolean }>(({ isVisible }) => ({
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: isVisible ? '86.5%' : '0',
    transition: 'height 0.3s ease-in-out',
    zIndex: 1,
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
            <Container>
                {sections.map((section) => (
                    <SectionContainer key={section.id}>
                        <Section
                            isSelected={selectedSection !== null}
                            onClick={() => handleSectionClick(section.id)}
                            sx={{
                                backgroundImage: `url(${require(`../assets/img/${section.image}`)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '-10px',
                                    right: '-10px',
                                    bottom: '-10px',
                                    background: `url(${require(`../assets/img/${section.image}`)}) no-repeat center center / cover`,
                                    filter: (selectedSection !== null) ? 'blur(3px)' : 'none',
                                    transition: 'filter 0.3s ease-in-out',
                                },
                            }}
                        >
                            {(selectedSection !== null) && (
                                <Typography variant="h4"
                                sx={{ color: 'white', position: 'absolute', bottom: '10px', left: '10px', textShadow: '3px 3px 6px rgba(0,0,0,5)' }}>
                            {section.title}
                                </Typography>
                            )}
                            {(selectedSection === null) && (
                                <Typography variant="h1"
                                sx={{ color: 'white', position: 'absolute', bottom: '10px', left: '10px', textShadow: '3px 3px 6px rgba(0,0,0,5)' }}>
                            {section.title}
                                </Typography>
                            )}


                        </Section>

                    </SectionContainer>
                ))}
                <SectionContent isVisible={selectedSection !== null}>
                    <Typography variant="body1">
                        {getContentById(selectedSection)}
                    </Typography>
                </SectionContent>

            </Container>
        </>

)
}

export default Main;