import React, {useEffect, useState} from "react";
import '../assets/css/Main.css';
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from "reactstrap";
import Typography from "@mui/material/Typography";
import {Autocomplete, Chip, Grid, TextField, useMediaQuery} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from '@mui/icons-material/Email';
import {TbMoodKid} from "react-icons/tb";
import {Theme} from "@mui/material/styles";
import theme from "../assets/style/theme";
import {sendEmail} from "../api/sanityApi";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

const backgroundImage = "rwanda.jpg"

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const Request = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({
        fieldErrors: '',
        descriptionError: ''
    });

    const OPTIONS = [
        'Uganda',
        'Tanzania',
        'Rwanda',
        'Kenya',
        'Kilimanjaro',
        'Oldnoyo Lengai',
        'Meru',
        'Zanzibar',
        'Safari',
        'Climbing',
        'Day Trips',
        'Photographic Safari'
    ];

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
    })
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

    useEffect(() => {
        if (location.state !== null) {
            const incomingState = location.state;
            const incomingDate = incomingState.arrivalDate instanceof Date
                ? new Date(incomingState.arrivalDate.setHours(12, 0, 0, 0))
                : new Date(new Date(incomingState.arrivalDate).setHours(12, 0, 0, 0));

            setTripInfo({
                ...incomingState,
                clientEmail: "safari101@tour.com",
                arrivalDate: incomingDate,
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
            });
        }
    }, [location.state]);

    const handleOptionsChange = (event: any, newValue: string[]) => {
        setTripInfo(prev => ({
            ...prev,
            selectedOptions: newValue
        }));
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
            const formattedTripInfo = {
                ...tripInfo,
                arrivalDate: tripInfo.arrivalDate
                    ? tripInfo.arrivalDate.toISOString().split('T')[0]
                    : getTodayDate(),
                selectedOptions: tripInfo.selectedOptions.join(', ')
            };

            const result = await sendEmail(formattedTripInfo);
            if (result.success) {
                setFormErrors({
                    fieldErrors: '',
                    descriptionError: ''
                });
                alert(result.message);
                navigate('/');
            } else {
                setFormErrors({
                    ...formErrors,
                    fieldErrors: result.error || 'An error occurred while submitting your request' // Provide default error message
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
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '20rem',
                backgroundImage: `url(${require(`../assets/img/${backgroundImage}`)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: isMobile ? '0' : '2rem',
            }}>
                <Box sx={(theme: Theme) => ({
                    width: '100%',
                    maxWidth: '55rem',
                    backgroundColor: theme.palette.customBackgroundColor.main,
                    marginTop: '2vh',
                    borderRadius: '15px',
                    padding: isMobile ? '2rem' : '3rem',
                    paddingTop: isMobile ? '5rem' : '2rem',
                    paddingBottom: isMobile ? '10rem' : '2rem',

                })}>
                    <Typography variant="h1" component="h1" gutterBottom sx={{
                        fontWeight: 'bold',
                        color: theme.palette.customFontColor.main,
                        mb: '3rem',
                    }}>
                        Request
                    </Typography>
                    <Grid container spacing={isMobile ? 2 : 3}>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>ADULTS</Typography>
                            <TextField
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                                name="adults"
                                value={tripInfo.adults.toString()}
                                fullWidth
                                InputProps={{
                                    endAdornment: <PersonIcon onClick={() => handleIconClick('adults')} style={{ cursor: 'pointer' }} />,
                                    inputMode: 'numeric',
                                }}
                                onChange={handleInputChange}
                                onFocus={() => handleFieldFocus('adults')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>CHILDREN</Typography>
                            <TextField
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                                name="children"
                                value={tripInfo.children.toString()}
                                fullWidth
                                InputProps={{
                                    endAdornment: <TbMoodKid onClick={() => handleIconClick('children')} style={{ cursor: 'pointer', width: '23px', height: '23px' }} />,
                                    inputMode: 'numeric',
                                }}
                                onChange={handleInputChange}
                                onFocus={() => handleFieldFocus('children')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5}>
                            <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>YOUR EMAIL</Typography>
                            <TextField
                                id="outlined-size-small"
                                size="small"
                                name="email"
                                value={tripInfo.clientEmail}
                                fullWidth
                                InputProps={{ endAdornment: <EmailIcon /> }}
                                onChange={handleInputChange}
                                onFocus={() => handleFieldFocus('clientEmail')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>
                                ARRIVAL DATE
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={tripInfo.arrivalDate}
                                    onChange={handleDateChange}  // Use the new handler
                                    minDate={new Date()}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small",
                                            margin: "normal",
                                            sx: {
                                                '& .MuiInputBase-root': {
                                                    color: 'black',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: 'black',
                                                },
                                            }
                                        },
                                        popper: {
                                            sx: {
                                                '& .MuiPaper-root': {
                                                    color: 'black',
                                                }
                                            }
                                        }
                                    }}
                                />
                            </LocalizationProvider>


                        </Grid>
                    </Grid>

                    {formErrors.fieldErrors && (
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 2,
                                textAlign: 'left',
                                fontSize: '0.875rem',
                                backgroundColor: 'rgba(255,0,0,0.1)',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                marginBottom: '1rem'
                            }}
                        >
                            {formErrors.fieldErrors}
                        </Typography>
                    )}

                    <Box sx={{ mt: 4, mb: 2 }}>
                        <Typography
                            sx={{
                                color: theme.palette.customFontColor.main,
                                fontWeight: 'bold',
                                textAlign: 'left',
                                mb: 1
                            }}
                        >
                            PREFERRED AREAS & ACTIVITIES
                        </Typography>
                        <Autocomplete
                            multiple
                            id="preferences-dropdown"
                            options={OPTIONS}
                            value={tripInfo.selectedOptions}
                            onChange={handleOptionsChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Select your preferences"
                                />
                            )}
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        label={option}
                                        sx={{
                                            backgroundColor: theme.palette.customButtonColor.main,
                                            color: theme.palette.customButtonFontColor.main,
                                            '& .MuiChip-deleteIcon': {
                                                color: theme.palette.customButtonFontColor.main,
                                                '&:hover': {
                                                    color: theme.palette.customButtonFontColor.light,
                                                },
                                            },
                                        }}
                                    />
                                ))
                            }
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                }
                            }}
                        />
                    </Box>




                    <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left', mt: '1rem' }}>TRIP DESCRIPTION</Typography>
                    <TextField
                        name="description"
                        multiline
                        rows={5}
                        fullWidth
                        inputProps={{ maxLength: 1000 }}
                        value={tripInfo.description}
                        onChange={handleInputChange}
                        onFocus={() => handleFieldFocus('description')}
                        sx={{ mt: 2, mb: 3 }}
                    />

                    {formErrors.descriptionError && (
                        <Typography
                            sx={{
                                color: 'red',
                                mb: 2,
                                textAlign: 'left',
                                fontSize: '0.875rem',
                                backgroundColor: 'rgba(255,0,0,0.1)',
                                padding: '0.5rem',
                                borderRadius: '4px'
                            }}
                        >
                            {formErrors.descriptionError}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                            color="warning"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: theme.palette.customButtonColor.main,
                                color: theme.palette.customButtonFontColor.main,
                                border: 'none',
                                padding: isMobile ? '10px 20px' : '15px 30px',
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.3s ease',
                                borderRadius: '20px',
                                opacity: isSubmitting ? 0.7 : 1,
                            }}
                            className="custom-button"
                        >
                            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Request;