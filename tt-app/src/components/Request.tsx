import SearchAppBar from "./SearchAppBar";
import React, {useEffect, useState} from "react";
import {Background} from "../assets/style/styledComponents";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container} from "reactstrap";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import EmailIcon from '@mui/icons-material/Email';
import {sendEmail} from "../api/api";



const backgroundImage = "safariBackground.jpg"



const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};



const Request = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [tripInfo, setTripInfo] = useState<TripInfo>({
        adults: 2,
        children: 0,
        arrivalDate: getTodayDate(),
        description: "",
        email: "joshua.1.9.kim@gmail.com",
    })

    useEffect(() => {
        if (location.state !== null) {
            setTripInfo(location.state as TripInfo)
        }

    }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTripInfo(prev=> ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        const result = await sendEmail(tripInfo);

        if (result.success) {
            alert(result.message);
            navigate('/thank-you');
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
                       justifyContent:'center'
                   }}
               >

                   <Box
                       sx={{
                           width:'80rem',
                           height:'auto',
                           backgroundColor:'white',
                           marginTop:'9vh'
                       }}
                   >
                       <Typography variant="h2" component="h1" gutterBottom>
                           Request Page
                       </Typography>

                       <Box>
                           <TextField
                               label="Number of Adults"
                               name="adults"
                               value={tripInfo.adults}
                               fullWidth
                               InputProps={{ endAdornment: <PersonIcon /> }}
                               onChange={handleInputChange}
                               margin="normal"
                           />
                           <TextField
                               label="User Email"
                               name="email"
                               value={tripInfo.email}
                               fullWidth
                               InputProps={{ endAdornment: <EmailIcon /> }}
                               onChange={handleInputChange}
                               margin="normal"
                           />
                           <TextField
                               label="Number of Children"
                               name="children"
                               value={tripInfo.children}
                               fullWidth
                               InputProps={{ endAdornment: <ChildCareIcon /> }}
                               onChange={handleInputChange}
                               margin="normal"
                           />
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
                       </Box>
                       <Box sx={{ mt: 2 }}>
                           <TextField
                               label="Trip Description"
                               name="description"
                               multiline
                               rows={4}
                               fullWidth
                               value={tripInfo.description}
                               onChange={handleInputChange}
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
                           SUBMIT REQUEST
                       </Button>

                   </Box>

                </Box>
            </>
    )
}
export default Request;















