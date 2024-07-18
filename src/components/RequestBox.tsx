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



interface BackGroundImage {
    image: string;
}

interface TripInfo {
    adults: number;
    children: number;
    arrivalDate: string;
}

const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const RequestBox: React.FC<BackGroundImage> = ({ image }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: 2,
        children: 0,
        arrivalDate: getTodayDate(),
    });
    const [requestInputInteracted, setRequestInputInteracted] = useState<RequestInputInteraction>({
        adults: false,
        children: false,
        email: false,
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
            [field]: field === 'adults' ? 2 : 0
        }));
    };

    const handleSubmit = () => {
        navigate('/request', { state: tripInfo });
    };

    return (
        <Box sx={{
            width: '100%',
            height: isMobile ? '23rem' : '28rem',
            marginTop: '9vh',
            minWidth: '23rem',
            backgroundImage: `url(${require(`../assets/img/${image}`)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile? 'center': 'flex-start',
            padding: isMobile ? '0' : '2rem',
        }}>
            <Box sx={(theme: Theme) => ({
                backgroundColor: theme.palette.primary.main,
                minWidth: '23rem',
                height: isMobile ? '100%' : 'auto',
                width: isMobile ? '100%' : '23rem',
                padding: '1rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            })}>
                <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                    LET'S PLAN YOUR OWN ITINERARY!
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>ADULTS</Typography>
                        <TextField
                            fullWidth
                            name="adults"
                            InputProps={{
                                endAdornment: <PersonIcon onClick={() => handleIconClick('adults')} style={{ cursor: 'pointer' }} />,
                                inputMode: 'numeric',
                            }}
                            value={tripInfo.adults}
                            onChange={handleInputChange}
                            onFocus={() => handleFieldFocus('adults')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>CHILDREN</Typography>
                        <TextField
                            fullWidth
                            name="children"
                            InputProps={{
                                endAdornment: <TbMoodKid onClick={() => handleIconClick('children')} style={{ cursor: 'pointer', width: '32px', height: '32px' }} />,
                                inputMode: 'numeric',
                            }}
                            value={tripInfo.children}
                            onChange={handleInputChange}
                            onFocus={() => handleFieldFocus('children')}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>EXPECTED ARRIVAL DATE</Typography>
                    <TextField
                        type="date"
                        name="arrivalDate"
                        fullWidth
                        value={tripInfo.arrivalDate}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: { min: getTodayDate() }
                        }}
                        onFocus={() => handleFieldFocus('arrivalDate')}

                    />
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
                            backgroundColor: '#ffd700',
                            color: 'black',
                            border: 'none',
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
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