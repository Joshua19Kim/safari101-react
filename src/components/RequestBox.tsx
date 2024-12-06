import React, {useEffect, useState} from "react";
import '../assets/css/Main.css';
import Box from "@mui/material/Box";
import { Theme } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import { TbMoodKid } from "react-icons/tb";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



interface BackGroundImage {
    image: string;
}


export const RequestBox: React.FC<BackGroundImage> = ({ image }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMainLanding = !isMobile && location.pathname === '/';
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    const [boxHeight, setBoxHeight] = useState('50rem');

    const mainMessage = "Discover the Untamed Spirit of Africa";
    const subMessage = "Your Journey to Adventure Begins Here";

    const [simpleTripInfo, setTripInfo] = useState<SimpleTripInfo>({
        adults: '2',
        children: '0',
        arrivalDate: new Date(),
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTripInfo(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }));

    };
    const handleFieldFocus = (field: keyof RequestInputInteraction) => {
        if (!requestInputInteracted[field]) {
            setRequestInputInteracted(prev => ({ ...prev, [field]: true }));
            setTripInfo(prev => ({ ...prev, [field]: field === 'adults' ? '' : field === 'children' ? '' : '' }));
        }
    };

    const handleIconClick = (field: 'adults' | 'children') => {
        setTripInfo(prev => ({
            ...prev,
            [field]: field === 'adults' ? '2' : '0'
        }));
    };

    const handleDateChange = (newValue: Date | null) => {
        if (newValue) {
            setTripInfo(prev => ({
                ...prev,
                arrivalDate: newValue
            }));
        }
    };

    const handleSubmit = () => {
        const dateToSend = simpleTripInfo.arrivalDate instanceof Date
            ? new Date(simpleTripInfo.arrivalDate.setHours(12, 0, 0, 0))
            : new Date(new Date().setHours(12, 0, 0, 0));

        const formattedTripInfo = {
            adults: simpleTripInfo.adults,
            children: simpleTripInfo.children,
            arrivalDate: dateToSend
        };
        navigate('/request', { state: formattedTripInfo });
    };



    useEffect(() => {
        const handleScroll = () => {
            if (isMainLanding) {
                const scrollPosition = window.scrollY;
                const maxScroll = 80; //Can adjust the speed of change of height
                const minHeight = 28;
                const maxHeight = 50;

                const newHeight = Math.max(
                    minHeight,
                    maxHeight - (scrollPosition/ maxScroll) * (maxHeight - minHeight)
                );
                setBoxHeight(`${newHeight}rem`);

                if(newHeight >= 46) {
                    setIsScrolledDown(true);
                } else {
                    setIsScrolledDown(false);
                }

            }
        }
        if (isMainLanding) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        } else {
            setBoxHeight(isMobile ? '23rem' : '28rem');
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isMobile, location.pathname]);


    return (
        <Box sx={{
            width: '100%',
            height: boxHeight,
            marginTop: '4rem',
            minWidth: '23rem',
            backgroundColor: theme.palette.customBackgroundColor.main,
            backgroundImage: isMobile ? 'none' : `url(${require(`../assets/img/${image}`)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile? 'center': 'flex-start',
            padding: isMobile ? '0' : '2rem',
            position: 'relative'
        }}>
            {isMainLanding && isScrolledDown && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '5%',
                        textAlign: 'right',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'serif',
                            marginBottom: '1rem',
                            opacity: 0,  // Start with opacity 0
                            animation: 'fadeIn 1s ease-out forwards',  // Add fade-in animation
                            '@keyframes fadeIn': {
                                from: {
                                    opacity: 0,
                                    transform: 'translateY(20px)'  // Optional: add slight upward movement
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translateY(0)'
                                }
                            },
                        }}
                    >
                        {mainMessage}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontStyle: 'italic',
                            opacity: 0,
                            animation: 'fadeIn 1s ease-out forwards',
                            animationDelay: '0.5s',
                            '@keyframes fadeIn': {
                                from: {
                                    opacity: 0,
                                    transform: 'translateY(20px)'
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translateY(0)'
                                }
                            },
                        }}
                    >
                        {subMessage}
                    </Typography>
                </Box>
            )}
            <Box sx={(theme: Theme) => ({
                backgroundColor: theme.palette.customBackgroundColor.main,
                minWidth: '23rem',
                height: isMobile ? '100%' : 'auto',
                width: isMobile ? '100%' : '23rem',
                padding: '1rem',
                borderRadius: '20px',
                mb: isMainLanding ? '10rem' : '0rem',
            })}>
                <Typography variant="h5" component="h2" sx={{ color: 'black', mb: 2, fontWeight:'bold', textAlign: 'center' }}>
                    LET'S PLAN YOUR OWN ITINERARY!
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{
                            color: theme.palette.customFontColor.main,
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }}>
                            ADULTS
                        </Typography>
                        <TextField
                            fullWidth
                            name="adults"
                            InputProps={{
                                endAdornment: <PersonIcon onClick={() => handleIconClick('adults')} style={{ cursor: 'pointer' }} />,
                                inputMode: 'numeric',
                            }}
                            value={simpleTripInfo.adults}
                            onChange={handleInputChange}
                            onFocus={() => handleFieldFocus('adults')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{
                            color: theme.palette.customFontColor.main,
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }}>
                            CHILDREN
                        </Typography>
                        <TextField
                            fullWidth
                            name="children"
                            InputProps={{
                                endAdornment: <TbMoodKid onClick={() => handleIconClick('children')} style={{ cursor: 'pointer', width: '32px', height: '32px' }} />,
                                inputMode: 'numeric',
                            }}
                            value={simpleTripInfo.children}
                            onChange={handleInputChange}
                            onFocus={() => handleFieldFocus('children')}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography sx={{
                        color: theme.palette.customFontColor.main,
                        fontWeight: 'bold',
                        textAlign: 'left'
                    }}>
                        EXPECTED ARRIVAL DATE
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={simpleTripInfo.arrivalDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    InputProps: {
                                        sx: { color: 'black' }
                                    },
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
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: theme.palette.customButtonColor.main,
                            color: theme.palette.customButtonFontColor.main,
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: theme.palette.customButtonColor.dark,
                            },

                        }}
                    >
                        Start Planning
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RequestBox;