import * as React from 'react';
import { Theme, styled, alpha } from '@mui/material/styles';
import {AppBar, Box, Toolbar, IconButton, Typography, Grid, Paper, Popper, ClickAwayListener} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useLocation, useNavigate} from "react-router-dom";
import NavBarLink from "../assets/style/NavBarTextWithLink";
import logoImage from '../assets/img/logo/LOGO-Main.png';
import Sidebar from './Sidebar';
import {getData} from "../api/api";

const Logo = styled('img')(({ theme }) => ({
    height: '6vh',
    minHeight: '2.5rem',
    width: '8rem',
}));

const DropdownContent = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    maxWidth: "80%",
    width: "50rem",
}));

const CategoryCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const SearchAppBar: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const location = useLocation();
    const [eastAfricaList, setEastAfricalList] = React.useState<Category[]>([]);
    const [climbingList, setClimbingList] = React.useState<Category[]>([]);
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
    const eastAfricaRef = React.useRef<HTMLDivElement>(null);
    const climbingRef = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        getCategoryList("/east-africas")
        getCategoryList("/climbings")
    },[])

    React.useEffect(() => {
        setIsSidebarOpen(false);

    }, [location]);

    const getCategoryList = async (category: string) => {
        try {
            const response = await getData(category);
            if(category === "/east-africas"){
                setEastAfricalList(response.data)
            } else if( category === "/climbings") {
                setClimbingList(response.data)
            }
        } catch (error) {
            console.error('Error fetching items', error);
            if(category === "/east-africas"){
                setEastAfricalList([])
            } else if( category === "/climbings") {
                setClimbingList([])
            }
        }
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleDropdownOpen = (dropdownName: string) => {
        setOpenDropdown(dropdownName);
    };

    const handleDropdownClose = () => {
        setOpenDropdown(null);
    };

    const handleCategoryClick = (link: string) => {
        navigate(link);
        handleDropdownClose();
    };

    const renderDropdownContent = (categories: Category[]) => (
        <DropdownContent>
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    onClick={() => handleCategoryClick(category.attributes.link)}
                >
                    <img
                        src={`http://localhost:1337${category.attributes.mainImage.data.attributes.url}`}
                        alt={category.attributes.name}
                        style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 8 }}
                    />
                    <Typography variant="subtitle1">{category.attributes.name}</Typography>
                </CategoryCard>
            ))}
        </DropdownContent>
    );

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

                        <Grid item xs={6} md={10} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <ClickAwayListener onClickAway={handleDropdownClose}>
                                    <Box
                                        ref={eastAfricaRef}
                                        onMouseEnter={() => handleDropdownOpen('eastAfrica')}
                                    >
                                        <NavBarLink to="#" text="East Africa▾"  />
                                        <Popper
                                            open={openDropdown === 'eastAfrica'}
                                            anchorEl={eastAfricaRef.current}
                                            placement="bottom-start"
                                            transition
                                        >
                                            {renderDropdownContent(eastAfricaList)}
                                        </Popper>
                                    </Box>
                                </ClickAwayListener>
                                <NavBarLink to="/contents" text="Safari" />
                                <NavBarLink to="/contents" text="Kilimanjaro" />
                                <ClickAwayListener onClickAway={handleDropdownClose}>
                                    <Box
                                        ref={climbingRef}
                                        onMouseEnter={() => handleDropdownOpen('climbing')}
                                    >
                                        <NavBarLink to="#" text="Climbing▾" />
                                        <Popper
                                            open={openDropdown === 'climbing'}
                                            anchorEl={climbingRef.current}
                                            placement="bottom-start"
                                            transition
                                        >
                                            {renderDropdownContent(climbingList)}
                                        </Popper>
                                    </Box>
                                </ClickAwayListener>
                                <NavBarLink to="/contents" text="Zanzibar" />
                                <NavBarLink to="/contents" text="Day Trips" />
                                <NavBarLink to="/contents" text="Photographic Safari" />
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