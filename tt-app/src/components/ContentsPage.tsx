import SearchAppBar from "./SearchAppBar";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import {Button, Container, Modal} from "reactstrap";
import {useParams} from "react-router-dom";
import {getData} from "../api/api";
import CircularProgress from '@mui/material/CircularProgress';
import {Grid, TextField, Typography} from "@mui/material";
import ContentCard from "./ContentCard";




const contentsBackgroundImage = "brightBackground.jpg"
const costBackgroundImage = "costBackground.png"


const contentTopics: ContentsTopic[] = [
    { id: 'Safari', title: 'Safari', image: 'safariLion.jpg', contentLink: '/safaris' },
    { id: 'Kilimanjaro', title: 'Kilimanjaro', image: 'elephant.jpg',  contentLink: '/kilimanjaros' },
    { id: 'Zanzibar', title: 'Zanzibar', image: 'cryingLion.jpg',  contentLink: '/zanzibars' },
    { id: 'Climbing', title: 'Climbing', image: 'griff.jpg',  contentLink: '/climbings' },
    { id: 'Photographic Safari', title: 'Photographic Safari', image: 'photoSafari.jpg',  contentLink: '/photographic-safaris' },
    { id: 'Day Trips', title: 'Day Trips', image: 'trip.jpg',  contentLink: '/day-trips' },
];

const ContentsPage = () => {
    const {contentsTopic } = useParams<{ contentsTopic: string }>()
    const [currentTopic, setCurrentTopic] = useState<ContentsTopic | undefined>()
    const [contentsList, setContentsList ] = useState<Contents[]>([])
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const decodedTopic = decodeURIComponent(contentsTopic || '')
        const foundTopic = contentTopics.find(content => content.id === decodedTopic)
        setCurrentTopic(foundTopic)
        if (foundTopic) {
            getContents(foundTopic.contentLink);
        } else {
            setIsLoading(false);
        }


    }, [contentsTopic]);


    const getContents = async (contentLink: string) => {
        setIsLoading(true);
        try {
            const response = await getData(contentLink);
            setContentsList(response.data);
        } catch (error) {
            console.error('Error fetching items', error);
            setContentsList([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentTopic) {
        return (
            <>
                <SearchAppBar />
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
            <SearchAppBar />
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
                        ) : contentsList.length > 0 ? (
                            contentsList.map((content) => (
                                <Box key={content.id} sx={{ width: '100%', mb: 3 }}>
                                    <ContentCard content={content as Contents} />
                                </Box>
                            ))
                        ) : (
                            <Typography>No trip available.</Typography>
                        )}


                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ContentsPage;