import React, {useRef, useEffect, useState} from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {SectionBox, SectionTypography, Section, ContentsBox, Background} from "../assets/style/styledComponents";
import {getData} from "../api/api";
import {Card} from "reactstrap";


const mainSections = [
    { id: 'safarises', title: 'SAFARI', image: 'griff2.jpg', content: 'Safari Content' },
    { id: 'climbings', title: 'Climbing', image: 'climbing.png',  content: 'Climbing Content' },
    { id: 'day-trips', title: 'Day Trip', image: 'dayTrip2.jpg',  content: 'Daytrip Content' },
];

const backgroundImage = "safariBackground.jpg"


const Main = () => {
    const [contentsList, setContentsList] = useState<Content[]>([]);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSectionClick = (id: string) => {
        setSelectedSection(selectedSection === id ? null : id);
    };

    useEffect(() => {
        const fetchContents = async() => {
            try {
                if(selectedSection !== null) {
                    setIsLoading(true);
                    const response = await getData(selectedSection);
                    setContentsList(response.data);
                    // console.log(response.data[0]);
                } else {
                    setContentsList([]);
                }
            } catch(error) {
                console.error('Error fetching items', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContents();
    }, [selectedSection]);

    const SafariCard: React.FC<{ safari: Safari }> = ({ safari }) => {
        if (!safari || !safari.attributes || !safari.attributes.safariMainImage) {
            return null;
        }
        return (
            <Card sx={{ height: '20%', width: '80%', maxWidth: 345, margin: '1rem' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:1337${safari.attributes.safariMainImage.data.attributes.url}`}
                    alt={safari.attributes.safariName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {safari.attributes.safariName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {safari.attributes.safariDescription}
                    </Typography>
                    <Typography variant="h6" component="div">
                        ${safari.attributes.safariPrice}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    const ClimbingCard: React.FC<{ climbing: Climbing }> = ({ climbing }) => {
        if (!climbing || !climbing.attributes || !climbing.attributes.climbingMainImage) {
            return null;
        }
        return (
            <Card sx={{ height: '20%', width: '80%', maxWidth: 345, margin: '1rem' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:1337${climbing.attributes.climbingMainImage.data.attributes.url}`}
                    alt={climbing.attributes.climbingName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {climbing.attributes.climbingName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {climbing.attributes.climbingDescription}
                    </Typography>
                    <Typography variant="h6" component="div">
                        ${climbing.attributes.climbingPrice}
                    </Typography>
                </CardContent>
            </Card>
        );
    };
    const DayTripCard: React.FC<{ dayTrip: DayTrip }> = ({ dayTrip }) => {
        if (!dayTrip || !dayTrip.attributes || !dayTrip.attributes.dayTripMainImage) {
            return null;
        }
        return (
            <Card sx={{ height: '20%', width: '80%', maxWidth: 345, margin: '1rem' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:1337${dayTrip.attributes.dayTripMainImage.data.attributes.url}`}
                    alt={dayTrip.attributes.dayTripName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {dayTrip.attributes.dayTripName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dayTrip.attributes.dayTripDescription}
                    </Typography>
                    <Typography variant="h6" component="div">
                        ${dayTrip.attributes.dayTripPrice}
                    </Typography>
                </CardContent>
            </Card>
        );
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
                                    key={section.id}
                                    isSelected={selectedSection !== null}
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
                                    <SectionTypography isSelected={selectedSection !== null}>
                                        {section.title}
                                    </SectionTypography>
                                </Section>
                            ))}
                        </SectionBox>
                        <ContentsBox isSelected={selectedSection !== null}>
                            <Box sx={{ height: '90%', width: '99%', padding: '2rem' }}>
                                {isLoading ? (
                                    <Typography>Loading...</Typography>
                                ) : contentsList.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {selectedSection === 'safarises' && contentsList.map((content) => (
                                            <Grid item xs={12} sm={6} md={4} key={content.id}>
                                                <SafariCard safari={content as Safari}/>
                                            </Grid>
                                        ))}
                                        {selectedSection === 'climbings' && contentsList.map((content) => (
                                            <Grid item xs={12} sm={6} md={4} key={content.id}>
                                                <ClimbingCard climbing={content as Climbing}/>
                                            </Grid>
                                        ))}
                                        {selectedSection === 'day-trips' && contentsList.map((content) => (
                                            <Grid item xs={12} sm={6} md={4} key={content.id}>
                                                <DayTripCard dayTrip={content as DayTrip}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography>No content available.</Typography>
                                )}
                            </Box>
                        </ContentsBox>



                    </Box>

                </Box>

        </>

)
}

export default Main;