import React, {useRef, useEffect, useState} from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";
import Box from "@mui/material/Box";
import {Grid, Typography} from "@mui/material";
import {SectionBox, SectionTypography, Section, ContentsBox, Background} from "../assets/style/styledComponents";
import {getData} from "../api/api";


const mainSections = [
    { id: 'safarises', title: 'Safari', image: 'griff2.jpg', content: 'Safari Content' },
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
            <Box className="content-card-box"
                 sx={{
                height:'20vh',
                width:'53vw',
                backgroundColor:'white',
                boxShadow:'3px 3px 6px rgba(0,0,0,1)',
            }}>
                <Grid container direction="row"
                      >
                    <Grid item xs={4} sx={{ height:'20vh', width:'20%'}} >
                        <img
                            src={`http://localhost:1337${safari.attributes.safariMainImage.data.attributes.url}`}
                            alt={safari.attributes.safariName}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'space-between',

                        }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between', // This will push the price to the right
                                    alignItems: 'center', // This will vertically center the title and price
                                    width: '100%',
                                }}
                            >
                                <Typography gutterBottom variant="h5" component="div">
                                    {safari.attributes.safariName}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    ${safari.attributes.safariPrice}
                                </Typography>

                            </Box>
                            <Box sx={{
                                width: '100%', // Ensure this box takes full width
                                marginTop: 1, // Add some space between the title/price and description
                            }}>
                                <Typography variant="body2" color="text.secondary">
                                    {safari.attributes.safariDescription}
                                </Typography>
                            </Box>
                        </Box>


                    </Grid>
                </Grid>
            </Box>

        );
    };

    const ClimbingCard: React.FC<{ climbing: Climbing }> = ({ climbing }) => {
        if (!climbing || !climbing.attributes  || !climbing.attributes.climbingMainImage) {
            return null;
        }
        return (
            <Box sx={{
                height:'20vh',
                width:'53vw',
                backgroundColor:'white',
                boxShadow:'3px 3px 6px rgba(0,0,0,1)',
            }}>
                <Grid container direction="row"
                >
                    <Grid item xs={4} sx={{ height:'20vh', width:'20%'}} >
                        <img
                            src={`http://localhost:1337${climbing.attributes.climbingMainImage.data.attributes.url}`}
                            alt={climbing.attributes.climbingName}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Typography gutterBottom variant="h5" component="div">
                            {climbing.attributes.climbingName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {climbing.attributes.climbingDescription}
                        </Typography>
                        <Typography variant="h6" component="div">
                            ${climbing.attributes.climbingPrice}
                        </Typography>

                    </Grid>

                </Grid>
            </Box>
        );
    };
    const DayTripCard: React.FC<{ dayTrip: DayTrip }> = ({ dayTrip }) => {
        if (!dayTrip || !dayTrip.attributes  || !dayTrip.attributes.dayTripMainImage) {
            return null;
        }
        return (
            <Box sx={{
                height:'20vh',
                width:'53vw',
                backgroundColor:'white',
                boxShadow:'3px 3px 6px rgba(0,0,0,1)',
            }}>
                <Grid container direction="row"
                >
                    <Grid item xs={4} sx={{ height:'20vh', width:'20%'}} >
                        <img
                            src={`http://localhost:1337${dayTrip.attributes.dayTripMainImage.data.attributes.url}`}
                            alt={dayTrip.attributes.dayTripName}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Typography gutterBottom variant="h5" component="div">
                            {dayTrip.attributes.dayTripName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dayTrip.attributes.dayTripDescription}
                        </Typography>
                        <Typography variant="h6" component="div">
                            ${dayTrip.attributes.dayTripPrice}
                        </Typography>

                    </Grid>

                </Grid>
            </Box>
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
                                    <SectionTypography isSelected={selectedSection !== null}>
                                        {section.title}
                                    </SectionTypography>
                                </Section>
                            ))}
                        </SectionBox>
                        <ContentsBox isSelected={selectedSection !== null}>
                            <Box sx={{
                                width: '99%',
                                maxHeight:'100%',
                                marginTop: '3%',
                                padding: '20rem',
                                alignItems:'center',
                                alignContent:'center',
                                flexDirection:'column',
                            }}>
                                {isLoading ? (
                                    <Typography>Loading...</Typography>
                                ) : contentsList.length > 0 ? (
                                    <Grid container rowSpacing={2} direction="column"
                                          justifyContent="center"
                                          alignItems="center">
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