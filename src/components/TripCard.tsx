import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getImage } from "../api/sanityApi";

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

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleSubmit = () => {
        console.log('Submitted comment:', comment);
        handleClose();
    };

    const costBackgroundImage = "costBackground.png";

    const renderDescription = (description: any[]) => {
        return description.map((block, index) => (
            <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleOpen}
                            sx={{
                                backgroundColor: theme.palette.customButtonColor.main,
                                color: theme.palette.customButtonFontColor.main,
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                borderRadius: "15px",
                                '&:hover': {
                                    backgroundColor: theme.palette.customButtonColor.dark,
                                }
                            }}
                        >
                            More info
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="trip-modal-title"
                aria-describedby="trip-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '800px',
                    backgroundColor: theme.palette.customBackgroundColor.main,
                    borderRadius: 3,
                    boxShadow: 24,
                    maxHeight: '90vh',
                    overflow: 'hidden',
                }}>
                    {/* Modal Header */}
                    <Box sx={{
                        backgroundColor: theme.palette.customFontColor.main,
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="h5" component="h2">
                            {trip.name}
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Modal Content */}
                    <Box sx={{
                        p: 3,
                        maxHeight: 'calc(90vh - 140px)', // Adjust for header and footer
                        overflowY: 'auto',
                    }}>
                        <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                            <img
                                src={getImage(trip.mainImage).width(800).url()}
                                alt={trip.name}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>

                        <Box sx={{
                            backgroundColor: 'grey.50',
                            p: 2,
                            borderRadius: 2,
                            mb: 3,
                        }}>
                            <Typography variant="h6" color="primary">
                                Starting from ${trip.cost}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Trip Details
                            </Typography>
                            {renderDescription(trip.longDescription)}
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Leave a Comment
                            </Typography>
                            <textarea
                                className="form-control"
                                rows={4}
                                placeholder="Enter your comment (max 500 words)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                maxLength={500}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid #ced4da'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Modal Footer */}
                    <Box sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: 'grey.200',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                    }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            style={{
                                color: theme.palette.customButtonColor.main,
                                borderColor: theme.palette.customButtonColor.main
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: theme.palette.customButtonColor.main,
                                color: theme.palette.customBackgroundColor.main,
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default TripCard;