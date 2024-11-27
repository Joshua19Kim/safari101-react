import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {getImage} from "../api/sanityApi";

interface TripCardProps {
    trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!trip || !trip.mainImage) {
        return null;
    }

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = () => {
        console.log('Submitted comment:', comment);
        toggleModal();
    };

    const costBackgroundImage = "costBackground.png";

    const renderDescription = (description: any[]) => {
        return description.map((block, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
                {block.children.map((child: { text: any; }) => child.text).join(' ')}
            </Typography>
        ));

    };

    return (
        <>
            <Box className="content-card-box"
                 sx={{
                     height: 'auto',
                     width: '100%',
                     backgroundColor: 'white',
                     boxShadow: '3px 3px 6px rgba(0,0,0,0.2)',
                     display: 'flex',
                     flexDirection: isMobile ? 'column' : 'row',
                     overflow: 'hidden',
                 }}>
                <Box sx={{
                    width: isMobile ? '100%' : '30%',
                    minHeight: isMobile ? '200px' : 'auto',
                }}>
                    <img
                        src={getImage(trip.mainImage).width(400).url()}
                        alt={trip.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    mb: 2,
                }}>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mb: 2,
                            ml: 3,
                        }}>
                            <Typography variant="h5" component="div">
                                {trip.name}
                            </Typography>
                            <Box sx={{
                                backgroundImage: `url(${require(`../assets/img/${costBackgroundImage}`)})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                padding: '15px 30px',
                            }}>
                                <Typography variant="h6" component="div">
                                    ${trip.cost}
                                </Typography>
                            </Box>
                        </Box>
                        {renderDescription(trip.shortDescription)}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 3,
                        }}
                    >
                        <Button
                            color="warning"
                            onClick={toggleModal}
                            style={{
                                backgroundColor: theme.palette.customButtonColor.main,
                                color: 'black',
                                border: 'none',
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                borderRadius:"15px"
                            }}
                            className="custom-button"
                        >
                            More info
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{trip.name}</ModalHeader>
                <ModalBody>
                    <img
                        src={getImage(trip.mainImage).width(400).url()}
                        alt={trip.name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <Typography variant="h6" component="h3">
                        From
                    </Typography>
                    <Typography variant="h6" component="h3">
                        From ${trip.cost}
                    </Typography>
                    {renderDescription(trip.longDescription)}
                    <textarea
                        className="form-control mt-3"
                        rows={4}
                        placeholder="Enter your comment (max 500 words)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={500}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default TripCard;