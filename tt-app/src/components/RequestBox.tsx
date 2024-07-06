import Box from "@mui/material/Box";
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
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export const RequestBox: React.FC<BackGroundImage> = ({image}) => {

    const today= new Date();
    const navigate = useNavigate();
    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: 2,
        children: 0,
        arrivalDate: getTodayDate(),
    })



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTripInfo(prev=> ({ ...prev, [name]: value }));
    }

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
                 sx={{
                     backgroundColor: '#c58a60',
                     height: '18rem',
                     width: '23rem',
                     marginTop:'4vh',
                     marginLeft:'4vh',
                     marginRight:'4vh',
                     marginBottom:'4vh',

                     padding: '2rem',
                     borderRadius: '10px',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                 }}
            >
                <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                    LET'S PLAN YOUR DREAM TRIP TOGETHER!
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{ color: '#ffd700', fontWeight: 'bold',
                            textAlign: 'left'}}>ADULTS</Typography>
                        <TextField fullWidth
                                   name="adults"
                                   InputProps={{ endAdornment: <PersonIcon /> }}
                                   value={tripInfo.adults}
                                   onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ color: '#ffd700' , fontWeight: 'bold',
                            textAlign: 'left'}}>CHILDREN</Typography>
                        <TextField fullWidth
                                   name="children"
                                   InputProps={{ endAdornment: <ChildCareIcon /> }}
                                   value={tripInfo.children}
                                   onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
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
                    START CUSTOMIZING
                </Button>
            </Box>
        </Box>
    )
}

export default RequestBox;