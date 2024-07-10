import Box from "@mui/material/Box";
import { Theme } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import {Grid, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import {Button} from "reactstrap";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


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
export const RequestBox: React.FC<BackGroundImage> = ({image}) => {

    const navigate = useNavigate();
    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: 2,
        children: 0,
        arrivalDate: getTodayDate(),
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'adults' || name === 'children') {
            const numValue = value.replace(/\D/g, '');
            setTripInfo(prev => ({ ...prev, [name]: numValue }));
        } else {
            setTripInfo(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleIconClick = (field: any) => {
        setTripInfo(prev => ({
            ...prev,
            [field]: field === 'adults' ? 2 : 0
        }));
    };

    const handleSubmit = () => {
        navigate('/request', { state: tripInfo });
    }

    return (
        <Box className='outside-box-landing' sx={{
            width:'100vw',
            height:'40vh',
            marginTop:'9vh',
            backgroundImage: `url(${require(`../assets/img/${image}`)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>

            <Box className='inside-box-landing'
                 sx={(theme:Theme) => ({
                     backgroundColor: theme.palette.primary.main,
                     height: '20rem',
                     width: '23rem',
                     marginTop:'4vh',
                     marginLeft:'4vh',
                     marginRight:'4vh',
                     marginBottom:'4vh',
                     padding: '1rem',
                     borderRadius: '10px',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                 })}
            >

                <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                    LET'S PLAN YOUR OWN ITINERARY!
                </Typography>

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#ffd700', fontWeight: 'bold',
                                textAlign: 'left'}}>ADULTS</Typography>
                            <TextField fullWidth
                                       name="adults"
                                       InputProps={{
                                           endAdornment: <PersonIcon onClick={() => handleIconClick('adults')} style={{ cursor: 'pointer' }} />,
                                           inputMode: 'numeric',
                                       }}
                                       value={tripInfo.adults}
                                       onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#ffd700' , fontWeight: 'bold',
                                textAlign: 'left'}}>CHILDREN</Typography>
                            <TextField fullWidth
                                       name="children"
                                       InputProps={{
                                           endAdornment: <ChildCareIcon onClick={() => handleIconClick('children')} style={{ cursor: 'pointer' }} />,
                                           inputMode: 'numeric',}}
                                       value={tripInfo.children}
                                       onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 2, mb: 2, }}>
                    <Typography sx={{ color: '#ffd700', fontWeight: 'bold',
                        textAlign: 'left' }}>ESTIMATED ARRIVAL DATE</Typography>
                    <TextField type="date"
                               name="arrivalDate"
                               fullWidth
                               value={tripInfo.arrivalDate}
                               onChange={handleInputChange}
                               InputProps={{
                                   inputProps: { min: getTodayDate() }
                               }}
                    />
                </Box>

                <Box>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            mt: 2,
                            backgroundColor: '#ffd700',
                            color: 'black',
                            '&:hover': { backgroundColor: '#e6c200' }
                        }}
                    >
                        START PLANNING
                    </Button>

                </Box>

            </Box>
        </Box>
    )
}

export default RequestBox;