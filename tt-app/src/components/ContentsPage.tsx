import SearchAppBar from "./SearchAppBar";
import React from "react";
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import {Container} from "reactstrap";
import {useParams} from "react-router-dom";



const backgroundImage = "safariLion.jpg"
const secondBackImage = "brightBackground.jpg"

const ContentsPage = () => {
    const { contentTopic } = useParams<{ contentTopic: string }>();

    return (
        <>
            <SearchAppBar />
            <Container>
                <RequestBox image={backgroundImage} />
                <Box sx={{
                    backgroundImage: `url(${require(`../assets/img/${secondBackImage}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    width: '100%',
                }}>
                    <Container>
                        <h1>{decodeURIComponent(contentTopic || '')}</h1>
                        {contentTopic === 'Safari' && (
                            <div>
                                <h2>Safari Content</h2>
                            </div>
                        )}
                        {contentTopic === 'Kilimanjaro' && (
                            <div>
                                <h2>Kilimanjaro Content</h2>
                            </div>
                        )}
                    </Container>
                </Box>
            </Container>
        </>
    )
}

export default ContentsPage;