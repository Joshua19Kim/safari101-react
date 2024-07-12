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
                        {/* Add your content here based on the category */}
                        {/* For example: */}
                        {contentTopic === 'Safari' && (
                            <div>
                                <h2>Safari Content</h2>
                                {/* Add Safari-specific content */}
                            </div>
                        )}
                        {contentTopic === 'Kilimanjaro' && (
                            <div>
                                <h2>Kilimanjaro Content</h2>
                                {/* Add Kilimanjaro-specific content */}
                            </div>
                        )}
                        {/* Add more conditions for other categories */}
                    </Container>
                </Box>
            </Container>
        </>
    )
}

export default ContentsPage;