import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import GradingIcon from '@mui/icons-material/Grading';
import InfoIcon from '@mui/icons-material/Info';

import { Link, useLocation } from "react-router-dom";
import {Drawer, Grid, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import logoImage from '../assets/img/tazania101Logo-cutout.png';
import List from '@mui/material/List';

const Logo = styled('img')({
    maxHeight: 55,
    marginTop: "1rem"
});

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    const [isSearchClicked, setIsSearchClicked] = React.useState<boolean>(false);
    const searchRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        // Close the sidebar when the location changes
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleSearchClick = () => {
        setIsSearchClicked(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsSearchClicked(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none', maxHeight: 50 }}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs={4} container justifyContent="flex-start">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4} container justifyContent="center">
                            <Box sx={{ textAlign: 'center' }}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Logo src={logoImage} alt="Logo" />
                                </Link>

                            </Box>
                        </Grid>
                        <Grid item xs={4} container justifyContent="flex-end">
                            <Link to="/request" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="#app-bar-with-responsive-menu"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', sm: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        fontSize: { xs: '4vw', md: '3vh' },
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        marginRight: '2rem',
                                        textShadow: '3px 3px 6px rgba(0,0,0,5)',
                                    }}
                                >
                                    Request
                                </Typography>
                            </Link>
                            <div ref={searchRef}>
                                {isSearchClicked ? (
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            inputRef={inputRef}
                                        />
                                    </Search>
                                ) : (
                                    <SearchIcon onClick={handleSearchClick}
                                                sx={{
                                                    marginTop: '1rem',
                                                    display: { xs: 'flex', sm: 'flex', md: 'flex' } }} />
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </Box>
    );
}
