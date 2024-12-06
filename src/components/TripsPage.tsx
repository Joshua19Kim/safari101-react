import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import {getDocumentsByCategory} from "../api/sanityApi";
import CircularProgress from '@mui/material/CircularProgress';
import {Typography, useMediaQuery} from "@mui/material";
import TripCard from "./TripCard";
import theme from "../assets/style/theme";
import { generalActivities, eastAfricaCategories, climbingCategories } from './constants/constants';
import FilterSection from "./sections/FilterSection";

const TripsPage = () => {
    const {category } = useParams<{ category: string }>();
    const {activity } = useParams<{ activity: string }>();
    const [currentTopic, setCurrentTopic] = useState<ActivityTopic | undefined>();
    const [tripsList, setTripsList] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [durationRange, setDurationRange] = useState<number[]>([0, 0]);

    useEffect(() => {
        const decodedCategory = decodeURIComponent(category || '');
        const decodedActivity = decodeURIComponent(activity || '');
        let foundActivity;
        let newCategory = "trip";

        if (decodedCategory === "eastAfrica") {
            newCategory = "eastAfrica";
            foundActivity = eastAfricaCategories.find(activity => activity.id === decodedActivity);
        } else if (decodedCategory === "climbing") {
            newCategory = "climbing";
            foundActivity = climbingCategories.find(activity => activity.id === decodedActivity);
        } else {
            foundActivity = generalActivities.find(activity => activity.id === decodedActivity);
        }
        setCurrentTopic(foundActivity);

        if (foundActivity) {
            fetchTrips(newCategory, foundActivity.value);
        } else {
            setIsLoading(false);
        }
    }, [activity, category]);

    useEffect(() => {
        if (tripsList.length > 0) {
            const durations = tripsList.map(trip => trip.duration);
            const minDuration = Math.min(...durations);
            const maxDuration = Math.max(...durations);
            setDurationRange([minDuration, maxDuration]);
        }
        setFilteredTrips(tripsList);
    }, [tripsList]);

    const handleDurationFilter = (min: number, max: number) => {
        setDurationRange([min, max]);
        const filtered = tripsList.filter(trip =>
            trip.duration >= min &&
            trip.duration <= max &&
            (selectedTypes.length === 0 || trip.tripType.some(type => selectedTypes.includes(type)))
        );
        setFilteredTrips(filtered);
    };
    const handleSort = (option: SortOption) => {
        const sorted = [...filteredTrips].sort((a, b) => {
            if (option.order === 'asc') {
                return a[option.field] - b[option.field];
            } else {
                return b[option.field] - a[option.field];
            }
        });
        setFilteredTrips(sorted);
    };
    const handleTripTypeFilter = (types: string[]) => {
        setSelectedTypes(types);
        const filtered = tripsList.filter(trip =>
            trip.duration >= durationRange[0] &&
            trip.duration <= durationRange[1] &&
            (types.length === 0 || trip.tripType.some(type => types.includes(type)))
        );
        setFilteredTrips(filtered);
    };

    const fetchTrips = async (categoryNameForDocType: string, activity: string) => {
        setIsLoading(true);
        try {
            const response = await getDocumentsByCategory(categoryNameForDocType, activity);
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
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                }}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: '90rem',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                    }}>
                        {/* Filter Section */}
                        <Box sx={{
                            width: { xs: '93%', md: '20rem' },
                            position: { xs: 'static', md: 'sticky' },
                            top: '2rem',
                            alignSelf: 'flex-start',
                            height: 'fit-content',
                            mb: { xs: 2, md: 0 },
                        }}>
                            {!isLoading && tripsList.length > 0 && (
                                <FilterSection
                                    trips={tripsList}
                                    selectedTypes={selectedTypes}
                                    durationRange={durationRange}
                                    onDurationChange={handleDurationFilter}
                                    onTripTypeChange={handleTripTypeFilter}
                                    onSortChange={handleSort}
                                />
                            )}
                        </Box>

                        {/* Trip Cards Section */}
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            alignItems: 'center',
                        }}>
                            {isLoading ? (
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '50vh'
                                }}>
                                    <CircularProgress />
                                </Box>
                            ) : filteredTrips.length > 0 ? (
                                filteredTrips.map((trip) => (
                                    <Box key={trip._id} sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <TripCard trip={trip} />
                                    </Box>
                                ))
                            ) : (
                                <Typography>No trips available.</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default TripsPage;