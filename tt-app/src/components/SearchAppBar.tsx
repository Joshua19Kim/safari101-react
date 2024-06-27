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
import { Link } from "react-router-dom";
import {Grid} from "@mui/material";
import logoImage from '../assets/img/tazania101Logo-cutout.png';


const Logo = styled('img')({
    maxHeight: 55,
    marginTop: "1rem"
})

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
                            <Box sx={{ display: 'flex' }}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        href="#app-bar-with-responsive-menu"
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'flex', sm: 'flex', md: 'flex' },
                                            fontFamily: 'monospace',
                                            fontWeight: 400,
                                            fontSize: { xs: '4vw', md: '3vh' },
                                            color: 'inherit',
                                            textDecoration: 'none',
                                            marginLeft: '3rem',
                                            textShadow: '3px 3px 6px rgba(0,0,0,5)',
                                        }}
                                    >
                                        Home
                                    </Typography>
                                </Link>

                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="#app-bar-with-responsive-menu"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', sm: 'flex', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 400,
                                        fontSize: { xs: '4vw', md: '3vh' },
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        marginLeft: '2rem',
                                        textShadow: '3px 3px 6px rgba(0,0,0,5)'
                                    }}
                                >
                                    Make A Request
                                </Typography>

                            </Box>
                        </Grid>
                        <Grid item xs={4} container justifyContent="center">
                            <Box sx={{ textAlign: 'center' }}>
                                <Logo src={logoImage} alt="Logo" />
                            </Box>
                        </Grid>
                        <Grid item xs={4} container justifyContent="flex-end">
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', sm: 'flex', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 400,
                                    fontSize: {xs: '4vw', md: '3vh'},
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    marginLeft: '2rem',
                                    textShadow: '3px 3px 6px rgba(0,0,0,5)',

                                }}
                            >
                                Contact
                            </Typography>

                            <div ref={searchRef}>
                                {isSearchClicked ? (
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{'aria-label': 'search'}}
                                            inputRef={inputRef}
                                        />
                                    </Search>
                                ) : (
                                    <SearchIcon onClick={handleSearchClick}
                                                sx={{display: {xs: 'flex', sm: 'flex', md: 'flex'}}}/>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}