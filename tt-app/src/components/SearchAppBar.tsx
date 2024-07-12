import * as React from 'react';
import { Theme, styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from "react-router-dom";
import NavBarLink from "../assets/style/NavBarTextWithLink";
import logoImage from '../assets/img/logo/LOGO-Main.png';
import Sidebar from './Sidebar';

const Logo = styled('img')(({ theme }) => ({
    height: '6vh',
    minHeight: '2.5rem',
    width: '8rem',
}));

const SearchAppBar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={(theme: Theme) => ({
                backgroundColor: theme.palette.primary.main,
                boxShadow: 'none',
                height: '9vh',
                minHeight:'3.5rem'
            })}>
                <Toolbar sx={{ height: '100%', padding: 0 }}>
                    <Grid container alignItems="center" sx={{ height: '100%' }}>
                        <Grid item xs={3} md={1} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Logo src={logoImage} alt="Logo" />
                            </Link>
                        </Grid>

                        <Grid item xs={6} md={10} sx={{ display: { xs: 'none', sm:'none', md: 'flex' }, justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <NavBarLink to="/category" text="East Africa▾" />
                                <NavBarLink to="/contents" text="Safari" />
                                <NavBarLink to="/contents" text="Kilimanjaro" />
                                <NavBarLink to="/category" text="Climbing▾" />
                                <NavBarLink to="/contents" text="Zanzibar" />
                                <NavBarLink to="/contents" text="Day Trips" />
                                <NavBarLink to="/contents" text="Photograpic Safari" />
                                <NavBarLink to="/contact" text="Contact" />
                            </Box>
                        </Grid>

                        <Grid item xs={9} md={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <NavBarLink to="/request" text="Request" />
                            </Box>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </Box>
    );
}

export default SearchAppBar;