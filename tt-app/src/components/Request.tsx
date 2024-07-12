import SearchAppBar from "./SearchAppBar";
import React, {useEffect, useState} from "react";
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container} from "reactstrap";
import Typography from "@mui/material/Typography";
import {Grid, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import EmailIcon from '@mui/icons-material/Email';
import {sendEmail} from "../api/api";
import {TbMoodKid} from "react-icons/tb";



const backgroundImage = "safariBackground.jpg"



const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};




const Request = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: 2,
        children: 0,
        email: "",
        arrivalDate: getTodayDate(),
        description: "",
    })

    useEffect(() => {
        if (location.state !== null) {
            setTripInfo(location.state);
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
                <Background bgImage={require(`../assets/img/${backgroundImage}`)} />

               <Box
                   sx={{
                       display:'flex',
                       alignItems:'center',
                       alignContent:'center',
                       justifyContent:'center',
                       minWidth:'33rem',

                   }}
               >

                   <Box
                       sx={{
                           width:'50rem',
                           height:'auto',
                           backgroundColor:'#FEF4ED',
                           marginTop:'12vh',
                           padding: 3,
                       }}
                   >
                       <Typography variant="h2" component="h1" gutterBottom>
                           Request
                       </Typography>
                       <Grid container spacing={2}>
                           <Grid item container spacing={2}>
                               <Grid item xs={2}>
                                   <TextField
                                       label="Number of Adults"
                                       name="adults"
                                       value={tripInfo.adults}
                                       fullWidth
                                       InputProps={{
                                           endAdornment: <PersonIcon onClick={() => handleIconClick('adults')} style={{ cursor: 'pointer' }} />,
                                           inputMode: 'numeric',
                                       }}
                                       onChange={handleInputChange}
                                       margin="normal"
                                   />
                               </Grid>
                               <Grid item xs={2}>
                                   <TextField
                                       label="Number of Children"
                                       name="children"
                                       value={tripInfo.children}
                                       fullWidth
                                       InputProps={{
                                           endAdornment: <TbMoodKid onClick={() => handleIconClick('children')}
                                                                    style={{ cursor: 'pointer', width: '32px', height: '32px' }}
                                           />,
                                           inputMode: 'numeric',}}
                                       onChange={handleInputChange}
                                       margin="normal"
                                   />
                               </Grid>
                               <Grid item xs={4}>
                                   <TextField
                                       label="Your Email"
                                       name="email"
                                       value={tripInfo.email}
                                       fullWidth
                                       InputProps={{ endAdornment: <EmailIcon /> }}
                                       onChange={handleInputChange}
                                       margin="normal"
                                   />
                               </Grid>
                               <Grid item xs={4}>
                                   <TextField
                                       label="Arrival Date"
                                       name="arrivalDate"
                                       type="date"
                                       value={tripInfo.arrivalDate}
                                       fullWidth
                                       margin="normal"
                                       onChange={handleInputChange}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                       InputProps={{
                                           inputProps: { min: getTodayDate() }
                                       }}
                                   />

                               </Grid>
                           </Grid>
                       </Grid>

                       <TextField
                           label="Trip Description"
                           name="description"
                           multiline
                           rows={5}
                           fullWidth
                           value={tripInfo.description}
                           onChange={handleInputChange}
                           sx={{ mt: 2, mb:3 }}
                       />

                       <Button
                           variant="contained"
                           fullWidth
                           onClick={handleSubmit}
                           sx={{
                               mt: 2,
                               mb: 3,
                               backgroundColor: '#ffd700',
                               color: 'black',
                               '&:hover': { backgroundColor: '#e6c200' }
                           }}
                       >
                           SUBMIT REQUEST
                       </Button>

                   </Box>

                </Box>
            </>
    )
}
export default Request;















