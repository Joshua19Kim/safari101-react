import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import {Container} from "reactstrap";
import {useParams} from "react-router-dom";
import {getTripWithClimbingArea, getTripWithEastAfricaArea} from "../api/sanityApi";
import CircularProgress from "@mui/material/CircularProgress";
import TripCard from "./TripCard";
import {Typography} from "@mui/material";


const secondBackImage = "brightBackground.jpg"

const eastAfricaCategories: CategoryTopic[] = [
    { id: 'Uganda', image: 'uganda.jpg' },
    { id: 'Rwanda', image: 'rwanda.jpg' },
    { id: 'Kenya', image: 'kenya.jpg' },
    { id: 'Tanzania', image: 'tanzania.jpg' },
];
const climbingCategories: CategoryTopic[] = [
    { id: 'Kilimanjaro',  image: 'elephant.jpg' },
    { id: 'Oldnoyo Lengai', image: 'trip.jpg' },
    { id: 'Meru', image: 'trip.jpg' },
];


const CategoryPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [ currentCategory, setCurrentCategory] = useState<ActivityTopic | undefined>();
    const [ tripsList, setTripsList] = useState<Trip[]>([]);
    const [ isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const decodedCategory = decodeURIComponent(categoryName || '');
        const foundEastAfricaCategory = eastAfricaCategories.find(category => category.id === decodedCategory);
        const foundClimbingCategory = climbingCategories.find(category => category.id === decodedCategory);

        setIsLoading(true);

        if (foundEastAfricaCategory !== undefined) {
            setCurrentCategory(foundEastAfricaCategory);
            fetchTrips(foundEastAfricaCategory.id, true, false);
        } else if (foundClimbingCategory !== undefined) {
            setCurrentCategory(foundClimbingCategory);
            fetchTrips(foundClimbingCategory.id, false, true);
        } else {
            setIsLoading(false);
            setCurrentCategory(undefined);
        }
    }, [categoryName]);

    const fetchTrips = async (category: string, isEastAfrica: boolean, isClimbing: boolean) => {
        try {
            let response;
            if (isEastAfrica) {
                response = await getTripWithEastAfricaArea(category);
            } else if (isClimbing) {
                response = await getTripWithClimbingArea(category);
            }
            if (response) {
                setTripsList(response);
                console.log(response);
            }
        } catch (error) {
            console.error('Error fetching trips', error);
            setTripsList([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentCategory) {
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
                <RequestBox image={currentCategory.image} />
                <Box sx={{
                    backgroundImage: `url(${require(`../assets/img/${secondBackImage}`)})`,
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
    )
}

export default CategoryPage;