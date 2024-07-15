import SearchAppBar from "./SearchAppBar";
import React, {useEffect, useState} from "react";
import '../assets/css/Main.css';
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container} from "reactstrap";
import Typography from "@mui/material/Typography";
import {Grid, TextField, useMediaQuery} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import EmailIcon from '@mui/icons-material/Email';
import {sendEmail} from "../api/api";
import {TbMoodKid} from "react-icons/tb";
import {Theme} from "@mui/material/styles";
import theme from "../assets/style/theme";



const backgroundImage = "safariBackground.jpg"



const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};



const Request = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: 2,
        children: 0,
        email: "safari101@tour.com",
        arrivalDate: getTodayDate(),
        description: "Please describe your plan!",
    })
    const [requestInputInteracted, setRequestInputInteracted] = useState<RequestInputInteraction>({
        adults: false,
        children: false,
        email: false,
        arrivalDate: false,
        description: false,
    });


    useEffect(() => {
        if (location.state !== null) {
            setTripInfo(location.state);
            setRequestInputInteracted({
                adults: false,
                children: false,
                email: false,
                arrivalDate: false,
                description: false,
            });
        }
    }, [location.state]);



    const handleInputChange = (e: any) => {
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
    const handleIconClick = (field: any) => {
        setTripInfo(prev => ({
            ...prev,
            [field]: field === 'adults' ? 2 : 0
        }));
    };

    const handleSubmit = async () => {
        const result = await sendEmail(tripInfo);
        if (result.success) {
            alert(result.message);
            navigate('/');
        } else {
            alert(result.error);
        }
    }



    return (
            <>
                <SearchAppBar />
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
                        maxWidth: '60rem',
                        backgroundColor: theme.palette.primary.main,
                        marginTop: '2vh',
                        padding: isMobile ? '0' : '3rem',
                        paddingTop: isMobile ? 'calc(56px + 1rem)' : 'calc(64px + 2rem)',
                    })}>
                        <Typography variant="h1" component="h1" gutterBottom sx={{
                            fontWeight: 'bold',
                            color: '#ffd700',
                            mb: '3rem',
                        }}>
                            Request
                        </Typography>
                        <Grid container spacing={isMobile ? 2 : 3}>
                            <Grid item xs={12} sm={6} md={2}>
                                <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>ADULTS</Typography>
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
                                <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>CHILDREN</Typography>
                                <TextField
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    size="small"
                                    name="children"
                                    value={tripInfo.children.toString()}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <TbMoodKid onClick={() => handleIconClick('children')} style={{ cursor: 'pointer', width: '32px', height: '32px' }} />,
                                        inputMode: 'numeric',
                                    }}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFieldFocus('children')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>YOUR EMAIL</Typography>
                                <TextField
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    size="small"
                                    name="email"
                                    value={requestInputInteracted.email ? tripInfo.email : 'safari101@tour.com'}
                                    fullWidth
                                    InputProps={{ endAdornment: <EmailIcon /> }}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFieldFocus('email')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left' }}>ARRIVAL DATE</Typography>
                                <TextField
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    size="small"
                                    name="arrivalDate"
                                    type="date"
                                    value={tripInfo.arrivalDate.toString()}
                                    fullWidth
                                    margin="normal"
                                    onChange={handleInputChange}
                                    onFocus={() => handleFieldFocus('arrivalDate')}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ inputProps: { min: getTodayDate() } }}
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'left', mt: '1rem' }}>TRIP DESCRIPTION</Typography>
                        <TextField
                            name="description"
                            multiline
                            rows={5}
                            fullWidth
                            inputProps={{ maxLength: 1000 }}
                            value={requestInputInteracted.description ? tripInfo.description : 'Please describe your plan!'}
                            onChange={handleInputChange}
                            onFocus={() => handleFieldFocus('description')}
                            sx={{ mt: 2, mb: 3 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button
                                color="warning"
                                onClick={handleSubmit}
                                style={{
                                    backgroundColor: '#ffd700',
                                    color: 'black',
                                    border: 'none',
                                    padding: isMobile ? '10px 20px' : '15px 30px',
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                                className="custom-button"
                            >
                                SUBMIT REQUEST
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </>
    )
}
export default Request;















