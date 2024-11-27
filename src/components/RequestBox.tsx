import React, { useState } from "react";
import '../assets/css/Main.css';
import Box from "@mui/material/Box";
import { Theme } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import { TbMoodKid } from "react-icons/tb";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



interface BackGroundImage {
    image: string;
}


export const RequestBox: React.FC<BackGroundImage> = ({ image }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'adults' || name === 'children') {
            const numValue = value.replace(/\D/g, '');
            setTripInfo(prev => ({ ...prev, [name]: numValue }));
        } else {
            setTripInfo(prev => ({ ...prev, [name]: value }));
        }
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

    return (
        <Box sx={{
            width: '100%',
            height: isMobile ? '23rem' : '28rem',
            marginTop: '9vh',
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
        }}>
            <Box sx={(theme: Theme) => ({
                backgroundColor: theme.palette.customBackgroundColor.main,
                minWidth: '23rem',
                height: isMobile ? '100%' : 'auto',
                width: isMobile ? '100%' : '23rem',
                padding: '1rem',
                borderRadius: '20px',
            })}>
                <Typography variant="h5" component="h2" sx={{ color: 'black', mb: 2, fontWeight:'bold', textAlign: 'center' }}>
                    LET'S PLAN YOUR OWN ITINERARY!
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>ADULTS</Typography>
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
                        <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>CHILDREN</Typography>
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
                    <Typography sx={{ color: theme.palette.customFontColor.main, fontWeight: 'bold', textAlign: 'left' }}>EXPECTED ARRIVAL DATE</Typography>
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
                        color="warning"
                        onClick={handleSubmit}
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
                            borderRadius:'20px',
                        }}
                        className="custom-button"
                    >
                        Start Planning
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RequestBox;