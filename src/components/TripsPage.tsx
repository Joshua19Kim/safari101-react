import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import {getDocumentsByCategory} from "../api/sanityApi";
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";
import TripCard from "./TripCard";
import theme from "../assets/style/theme";
import { generalActivities, eastAfricaCategories, climbingCategories } from './constants/constants';

const TripsPage = () => {
    const {category } = useParams<{ category: string }>();
    const {activity } = useParams<{ activity: string }>();
    const [currentCategory, setCurrentCategory] = useState("trip")
    const [currentTopic, setCurrentTopic] = useState<ActivityTopic | undefined>();
    const [tripsList, setTripsList] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const decodedCategory = decodeURIComponent(category || '');
        const decodedActivity = decodeURIComponent(activity || '');
        let foundActivity;

        if (decodedCategory === "eastAfrica") {
            setCurrentCategory("eastAfrica");
            foundActivity = eastAfricaCategories.find(activity => activity.id === decodedActivity);
        } else if (decodedCategory === "climbing") {
            setCurrentCategory("climbing");
            foundActivity = climbingCategories.find(activity => activity.id === decodedActivity);
        } else {
            setCurrentCategory("trip");
            foundActivity = generalActivities.find(activity => activity.id === decodedActivity);
        }
        setCurrentTopic(foundActivity);
        if (foundActivity) {
            fetchTrips(currentCategory, foundActivity.value);
        } else {
            setIsLoading(false);
        }
    }, [activity]);

    const fetchTrips = async (category: string, activity: string) => {
        setIsLoading(true);
        try {
            const response = await getDocumentsByCategory(category, activity);
            setTripsList(response);
        } catch (error) {
            console.error('Error fetching trips', error);
            setTripsList([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentTopic) {
        return (
            <>
                <Container>
                    <Box sx={{mt:'10rem'}}>
                        <h1>Topic not found</h1>
                    </Box>
                </Container>
            </>
        );
    }

    return (
        <>
            <Container>
                <RequestBox image={currentTopic.image} />
                <Box sx={{
                    backgroundColor: theme.palette.customBackgroundColor.main,
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                }}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: '60rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }}>
                        {isLoading ? (
                            <Box sx={{ display: 'flex',
                                justifyContent: 'center',
                                height: '50vh'
                            }}>
                                <CircularProgress />
                            </Box>
                        ) : tripsList.length > 0 ? (
                            tripsList.map((trip) => (
                                <Box key={trip._id}
                                     sx={{
                                         width: '100%',
                                         mb: 3,
                                         display: 'flex',
                                         justifyContent: 'center',
                                }}>
                                    <TripCard trip={trip} />
                                </Box>
                            ))
                        ) : (
                            <Typography>No trips available.</Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default TripsPage;