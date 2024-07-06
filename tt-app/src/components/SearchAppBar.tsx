import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import GradingIcon from '@mui/icons-material/Grading';
import InfoIcon from '@mui/icons-material/Info';

import NavBarLink from "../assets/style/NavBarTextWithLink";
import { Link, useLocation } from "react-router-dom";
import {Drawer, Grid, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import logoImage from '../assets/img/tazania101Logo-cutout.png';
import List from '@mui/material/List';

const Logo = styled('img')({
    maxHeight: 55,
    marginTop: "1rem",
    height:'5vw',
    width: 'auto',
});

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/contact">
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/request">
                        <ListItemIcon>
                            <GradingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Make A Request" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/aboutus">
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About Us" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default function SearchAppBar() {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        // Close the sidebar when the location changes
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#c58a60', boxShadow: 'none', height: '9vh' }}>
                <Toolbar>
                    <Grid container alignItems="center">

                        <Grid item xs={1} container justifyContent="left">
                            <Box sx={{ textAlign: 'center' }}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Logo
                                          src={logoImage} alt="Logo" />
                                </Link>

                            </Box>
                        </Grid>
                        <Grid item md={10} container justifyContent="flex-end">
                            {/*<Box sx={{*/}
                            {/*    flexDirection:'column'*/}
                            {/*}}>*/}
                                <NavBarLink to="/contact" text="East Africa" />
                                <NavBarLink to="/contact" text="Safaris" />
                                <NavBarLink to="/contact" text="Kilimanjaro" />
                                <NavBarLink to="/contact" text="Climbing" />
                                <NavBarLink to="/contact" text="Zanzibar" />
                                <NavBarLink to="/contact" text="Day Trips" />
                                <NavBarLink to="/contact" text="Photograpic Safari" />
                                <NavBarLink to="/contact" text="Contact" />

                            {/*</Box>*/}


                        </Grid>
                        <Grid item xs={1} container justifyContent="right">
                            <Box className="Nav-request">
                                <Link to='/request' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', sm: 'none', md: 'flex' },
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            fontSize: { md: '2.5vh' },
                                            color: 'inherit',
                                            textDecoration: 'none',
                                            marginRight: '1rem',
                                            textShadow: '3px 3px 6px rgba(0,0,0,5)',
                                        }}>
                                        Request
                                    </Typography>
                                </Link>
                                <IconButton
                                    className="Nav-menu-icon"
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2,
                                        display: { xs: 'flex', sm: 'flex', md: 'none' },
                                        alignSelf: 'right',
                                    }}
                                    onClick={toggleSidebar}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>


                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </Box>
    );
}
