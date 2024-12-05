import React, { useState } from "react";
import Box from "@mui/material/Box";
import {Typography, useMediaQuery, useTheme, Button, Grid, TextField} from "@mui/material";
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {getImage, sendEmail} from "../api/sanityApi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {TbMoodKid} from "react-icons/tb";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

interface TripCardProps {
    trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [showRequestForm, setShowRequestForm] = useState(false);
    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: '2',
        children: '0',
        clientEmail: "safari101@tour.com",
        arrivalDate: new Date(),
        description: "Please describe your plan!",
        selectedOptions: [],
        selectedTripName: '',
        selectedTripPrice: '',
        selectedTripDescription: '',

    });
    const [requestInputInteracted, setRequestInputInteracted] = useState<RequestInputInteraction>({
        adults: false,
        children: false,
        clientEmail: false,
        arrivalDate: false,
        description: false,
        selectedOptions: false,
        selectedTripName: false,
        selectedTripPrice: false,
        selectedTripDescription: false,
    });
    const [formErrors, setFormErrors] = useState({
        fieldErrors: '',
        descriptionError: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);




    if (!trip || !trip.mainImage) {
        return null;
    }

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => {
        setTripInfo({
            adults: '2',
            children: '0',
            clientEmail: "safari101@tour.com",
            arrivalDate: new Date(),
            description: "Please describe your plan!",
            selectedOptions: [],
            selectedTripName: '',
            selectedTripPrice: '',
            selectedTripDescription: '',
        });
        setRequestInputInteracted({
            adults: false,
            children: false,
            clientEmail: false,
            arrivalDate: false,
            description: false,
            selectedOptions: false,
            selectedTripName: false,
            selectedTripPrice: false,
            selectedTripDescription: false,
        })
        setFormErrors({
            fieldErrors: '',
            descriptionError: ''
        })
        setShowRequestForm(false);
        setIsModalOpen(false);
    }

    const renderDescription = (description: any[]) => {
        return description.map((block, index) => (
            <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {block.children.map((child: { text: any; }) => child.text).join(' ')}
            </Typography>
        ));
    };
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'adults' || name === 'children') {
            const numValue = value.replace(/\D/g, '');
            setTripInfo(prev => ({ ...prev, [name]: numValue }));
        } else {
            const fieldName = name === 'email' ? 'clientEmail' : name;
            setTripInfo(prev => ({ ...prev, [fieldName]: value }));
        }
    };

    const handleFieldFocus = (field: keyof RequestInputInteraction) => {
        if (!requestInputInteracted[field]) {
            setRequestInputInteracted(prev => ({ ...prev, [field]: true }));
            if (field === 'adults') {
                setTripInfo(prev => ({ ...prev, adults: '' }));
            } else if (field === 'children') {
                setTripInfo(prev => ({ ...prev, children: '' }));
            } else if (field === 'clientEmail') {
                setTripInfo(prev => ({ ...prev, clientEmail: '' }));
            } else if (field === 'description') {
                setTripInfo(prev => ({ ...prev, description: '' }));
            }
        }
    };

    const handleIconClick = (field: any) => {
        setTripInfo(prev => ({
            ...prev,
            [field]: field === 'adults' ? 2 : 0
        }));
    };
    const handleDateChange = (newValue: Date | null) => {
        setTripInfo(prev => ({
            ...prev,
            arrivalDate: newValue
        }));
    };

    const validateForm = () => {
        let isValid = true;
        let fieldErrors = [];
        let descriptionError = '';

        // Adult validation
        if (parseInt(tripInfo.adults) <= 0 || tripInfo.adults == '') {
            fieldErrors.push('There should be at least one adult');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (tripInfo.clientEmail === "safari101@tour.com" || !tripInfo.clientEmail.trim()) {
            fieldErrors.push('Your email has to be entered');
            isValid = false;
        } else if (!emailRegex.test(tripInfo.clientEmail)) {
            fieldErrors.push('Please enter a valid email');
            isValid = false;
        }

        // Description validation
        if (tripInfo.description === "Please describe your plan!" || !tripInfo.description.trim()) {
            descriptionError = 'Please describe your trip for a request';
            isValid = false;
        }

        setFormErrors({
            fieldErrors: fieldErrors.join('. '),
            descriptionError
        });

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const formattedDescription = trip.longDescription
                .map(block =>
                    block.children
                        .map((child: { text: any; }) => child.text)
                        .join(' ')
                )
                .join('\n\n');

            const formattedTripInfo = {
                ...tripInfo,
                arrivalDate: tripInfo.arrivalDate
                    ? tripInfo.arrivalDate.toISOString().split('T')[0]
                    : getTodayDate(),
                selectedTripName: trip.name,
                selectedTripPrice: "$" + trip.cost,
                selectedTripDescription: formattedDescription,
            };

            const result = await sendEmail(formattedTripInfo);
            if (result.success) {
                setFormErrors({
                    fieldErrors: '',
                    descriptionError: ''
                });
                alert(result.message);
                handleModalClose();
            } else {
                setFormErrors({
                    ...formErrors,
                    fieldErrors: result.error || 'An error occurred while submitting your request'
                });
            }
        } catch (error) {
            setFormErrors({
                ...formErrors,
                fieldErrors: 'An unexpected error occurred. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <>
            <Box className="content-card-box"
                 sx={{
                     display: 'flex', justifyContent: 'center',
                     alignSelf: 'center',
                     alignContent: 'center',
                     height: 'auto',
                     maxHeight: isMobile ? 'auto' : '16rem',
                     width: '95%',
                     maxWidth: '55rem',
                     backgroundColor: 'white',
                     flexDirection: isMobile ? 'column' : 'row',
                     overflow: 'hidden',
                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
                        mb: 1,
                    }}>
                        <Box sx={{
                            backgroundColor: theme.palette.customFontColor.main,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            padding: '10px',
                        }}>
                            <Typography variant="h5" component="div" sx={{ color:theme.palette.customButtonFontColor.main, }}>
                                {trip.name}
                            </Typography>
                        </Box>


                        <Grid container>
                            <Grid item xs={12} sm={6} md={9}>
                                <Box sx={{
                                    mt: '20px',
                                    padding: '5px',
                                }}>
                                    {renderDescription(trip.shortDescription)}
                                </Box>

                            </Grid>


                            <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mr: '12px',
                                    mb: '10px',
                                }}>
                                    <Box sx={{
                                        justifyContent: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        paddingTop: '5px',
                                        paddingBottom: '5px'
                                    }}>
                                        <Typography variant="h6" component="div" sx={{
                                            color:theme.palette.priceColor.main,
                                            fontWeight:'bold',
                                            fontFamily: "Russo One",
                                            fontSize: '25px',
                                        }}>
                                            From ${trip.cost}
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleModalOpen}
                                            sx={{
                                                backgroundColor: theme.palette.customButtonColor.main,
                                                color: theme.palette.customButtonFontColor.main,
                                                padding: '10px 20px',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                borderRadius: "20px",
                                                '&:hover': {
                                                    backgroundColor: theme.palette.customButtonColor.dark,
                                                }
                                            }}
                                        >
                                            More info
                                        </Button>
                                    </Box>

                                </Box>
                            </Grid>


                        </Grid>
                    </Box>
            </Box>

            {/* Show the details of trip in a modal */}
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
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
                        color: theme.palette.customButtonFontColor.main,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant="h5" component="h2">
                            {trip.name}
                        </Typography>
                        <IconButton
                            onClick={handleModalClose}
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
                            <Typography variant="h6" color="primary" sx={{ color:theme.palette.priceColor.main, fontWeight:'bold', fontFamily: "Russo One",}}>
                                Starting from ${trip.cost}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                fontWeight: 'bold',
                            }}>
                                Trip Details
                            </Typography>
                            {renderDescription(trip.longDescription)}
                        </Box>



                        {!showRequestForm ? (
                            <Button
                                variant="contained"
                                onClick={() => setShowRequestForm(true)}
                                sx={{
                                    backgroundColor: theme.palette.customButtonColor.main,
                                    color: theme.palette.customButtonFontColor.main,
                                    padding: '15px 30px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    borderRadius: "20px",
                                    mt: 3,
                                    width: '100%',
                                }}
                            >
                                Send a Request for This Trip
                            </Button>
                        ) : (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" sx={{
                                    mb: 2,
                                    fontWeight: 'bold',
                                }}>
                                    Request Form
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{
                                            color: theme.palette.customFontColor.main,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            ADULTS
                                        </Typography>
                                        <TextField
                                            size="small"
                                            name="adults"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: <PersonIcon onClick={() => handleIconClick('adults')} style={{ cursor: 'pointer' }} />,
                                                inputMode: 'numeric',
                                            }}
                                            value={tripInfo.adults}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFieldFocus('adults')}
                                            margin="dense"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{
                                            color: theme.palette.customFontColor.main,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            CHILDREN
                                        </Typography>
                                        <TextField
                                            size="small"
                                            name="children"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: <TbMoodKid onClick={() => handleIconClick('children')} style={{ cursor: 'pointer', width: '20px', height: '20px' }} />,
                                                inputMode: 'numeric',
                                            }}
                                            value={tripInfo.children}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFieldFocus('children')}
                                            margin="dense"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={8}>
                                        <Typography sx={{
                                            color: theme.palette.customFontColor.main,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            YOUR EMAIL
                                        </Typography>
                                        <TextField
                                            size="small"
                                            name="email"
                                            fullWidth
                                            InputProps={{ endAdornment: <EmailIcon /> }}
                                            value={tripInfo.clientEmail}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFieldFocus('clientEmail')}
                                            margin="dense"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <Typography sx={{
                                            color: theme.palette.customFontColor.main,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            ARRIVAL DATE
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={tripInfo.arrivalDate}
                                                onChange={handleDateChange}
                                                minDate={new Date()}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        margin: "dense",
                                                        fullWidth: true,
                                                        sx: {
                                                            '& .MuiInputBase-root': {
                                                                color: 'black',
                                                            },
                                                            '& .MuiSvgIcon-root': {
                                                                color: 'black',
                                                            },
                                                        }
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {formErrors.fieldErrors && (
                                            <Typography
                                                sx={{
                                                    color: 'red',
                                                    mt: 2,
                                                    fontSize: '0.8rem',
                                                    backgroundColor: 'rgba(255,0,0,0.1)',
                                                    padding: '0.5rem',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {formErrors.fieldErrors}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography sx={{
                                            color: theme.palette.customFontColor.main,
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            mt: 1
                                        }}>
                                            ADDITIONAL DETAILS
                                        </Typography>
                                        <TextField
                                            name="description"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            size="small"
                                            inputProps={{ maxLength: 1000 }}
                                            value={tripInfo.description}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFieldFocus('description')}
                                            sx={{ mt: 1 }}
                                        />
                                    </Grid>
                                </Grid>

                                {formErrors.descriptionError && (
                                    <Typography
                                        sx={{
                                            color: 'red',
                                            mt: 1,
                                            fontSize: '0.8rem',
                                            backgroundColor: 'rgba(255,0,0,0.1)',
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {formErrors.descriptionError}
                                    </Typography>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    sx={{
                                        mt: 3,
                                        width: '100%',
                                        backgroundColor: theme.palette.customButtonColor.main,
                                        color: theme.palette.customButtonFontColor.main,
                                        padding: '10px 20px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        borderRadius: "15px",
                                        '&:hover': {
                                            backgroundColor: theme.palette.customButtonColor.dark,
                                        },
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                >
                                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                                </Button>
                            </Box>
                        )}





                    </Box>

                    {/* Modal Footer */}
                    <Box sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: 'grey.200',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                        <Button
                            variant="outlined"
                            onClick={handleModalClose}
                            style={{
                                color: theme.palette.customButtonColor.main,
                                borderColor: theme.palette.customButtonColor.main
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default TripCard;