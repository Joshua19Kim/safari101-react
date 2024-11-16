import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { getTripWithActivity } from "../api/sanityApi";
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";
import TripCard from "./TripCard";

const contentsBackgroundImage = "brightBackground.jpg";

const activityTopics: ActivityTopic[] = [
    { id: 'Safari', image: 'safariLion.jpg' },
    { id: 'Kilimanjaro',  image: 'elephant.jpg' },
    { id: 'Zanzibar', image: 'cryingLion.jpg' },
    { id: 'Climbing', image: 'griff.jpg' },
    { id: 'Photographic Safari', image: 'photoSafari.jpg' },
    { id: 'Day Trips', image: 'trip.jpg' },



];

const TripsPage = () => {
    const {activity } = useParams<{ activity: string }>();
    const [currentTopic, setCurrentTopic] = useState<ActivityTopic | undefined>();
    const [tripsList, setTripsList] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const decodedActivity = decodeURIComponent(activity || '');
        const foundActivity = activityTopics.find(activity => activity.id === decodedActivity);
        setCurrentTopic(foundActivity);
        if (foundActivity) {
            fetchTrips(foundActivity.id);
        } else {
            setIsLoading(false);
        }
    }, [activity]);

    const fetchTrips = async (activity: string) => {
        setIsLoading(true);
        try {
            const response = await getTripWithActivity(activity);
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
                    backgroundImage: `url(${require(`../assets/img/${contentsBackgroundImage}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
                        alignItems: 'center',
                    }}>
                        {isLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                                <CircularProgress />
                            </Box>
                        ) : tripsList.length > 0 ? (
                            tripsList.map((trip) => (
                                <Box key={trip._id} sx={{ width: '100%', mb: 3 }}>
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