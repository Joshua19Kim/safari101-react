import * as React from 'react';
import { Theme, styled, alpha } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Grid,
    Paper,
    Popper,
    ClickAwayListener,
    useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useLocation, useNavigate} from "react-router-dom";
import NavBarLink from "../assets/style/NavBarTextWithLink";
import logoImage from '../assets/img/logo/LOGO-Main.png';
import Sidebar from './Sidebar';
import CircularProgress from "@mui/material/CircularProgress";
import {getCategories, getImage} from "../api/sanityApi";
import {Button} from "reactstrap";

const Logo = styled('img')(({ theme }) => ({
    height: '6vh',
    minHeight: '2.5rem',
    width: '8rem',
}));
const DropdownContent = styled(Paper)<{category: string}>(({ theme, category }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    width: "auto",
    marginLeft: category ==="eastAfrica" ? "5rem" : category === "climbing" ? "20vw" : "auto",
    display: 'flex',
    flexDirection: 'row',

}));

const CategoryCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    React.useEffect(() => {
        getCategoryList("eastAfricaAreaList")
        getCategoryList("climbingAreaList")
    },[])

    React.useEffect(() => {
        setIsSidebarOpen(false);

    }, [location]);

    const getCategoryList = async (category: string) => {
        setIsLoading(true);
        try {
            const response = await getCategories(category);
            if(category === "eastAfricaAreaList"){
                setEastAfricalList(response)
            } else if( category === "climbingAreaList") {
                setClimbingList(response)
            }
        } catch (error) {
            console.error('Error fetching items', error);
            if(category === "eastAfricaAreaList"){
                setEastAfricalList([])
            } else if( category === "climbingAreaList") {
                setClimbingList([])
            }
        } finally {
            setIsLoading(false);
        }
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleDropdownOpen = (dropdownName: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        setOpenDropdown(dropdownName);
    };

    const handleDropdownClose = (immediate: boolean = false) => {
        if (immediate) {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
            setOpenDropdown(null);
        } else {
            closeTimeoutRef.current = setTimeout(() => {
                setOpenDropdown(null);
            }, 400); // 300ms delay, adjust as needed
        }
    };

    const handleNavLinkHover = (dropdownName: string | null) => {
        if (dropdownName === null) {
            handleDropdownClose(true);
        } else {
            handleDropdownOpen(dropdownName);
        }
    };

    const moveToRequestPage = () => {
        navigate('/request');
    };


    const handleCategoryClick = (categoryName: string) => {
        navigate(`/category/${categoryName}`);
        handleDropdownClose();
    };


    const renderDropdownContent = (category: string, categories: Category[]) => (
        isLoading ? (
            <DropdownContent category={category}>
                <CircularProgress size={24} />
                <Typography variant="body2" sx={{ ml: 1 }}>Data is loading...</Typography>
            </DropdownContent>
        ) : categories.length === 0 ? (
            <DropdownContent category={category}>
                <Typography variant="body2">No categories available</Typography>
            </DropdownContent>
        ) : (
            <DropdownContent category={category}>
                {categories.map((category) => (
                    <CategoryCard
                        key={category._id}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <img
                            src={getImage(category.mainImage).width(400).url()}
                            alt={category.name}
                            style={{ width: "15vw", height: "15vh", objectFit: 'cover', marginRight: 8 }}
                        />
                        <Typography variant="subtitle1">{category.name}</Typography>
                    </CategoryCard>
                ))}
            </DropdownContent>
        )
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
                                <ClickAwayListener onClickAway={() => handleDropdownClose(true)}>
                                    <Box
                                        onMouseEnter={() => handleNavLinkHover('eastAfrica')}
                                        onMouseLeave={() => handleDropdownClose()}
                                    >
                                        <NavBarLink to="#" text="East Africa▾" />
                                        <Popper
                                            open={openDropdown === 'eastAfrica'}
                                            placement="bottom-start"
                                            transition
                                            sx={{mt:'9vh'}}
                                        >
                                            {({ TransitionProps }) => (
                                                <Box
                                                    {...TransitionProps}
                                                    onMouseEnter={() => handleDropdownOpen('eastAfrica')}
                                                    onMouseLeave={() => handleDropdownClose()}
                                                >
                                                    {renderDropdownContent("eastAfrica", eastAfricaList)}
                                                </Box>
                                            )}
                                        </Popper>
                                    </Box>
                                </ClickAwayListener>
                                <Box onMouseEnter={() => handleNavLinkHover(null)}>
                                    <NavBarLink to="/trips" text="Safari" />
                                </Box>
                                <Box onMouseEnter={() => handleNavLinkHover(null)}>
                                    <NavBarLink to="/trips" text="Kilimanjaro" />
                                </Box>
                                <ClickAwayListener onClickAway={() => handleDropdownClose(true)}>
                                    <Box
                                        onMouseEnter={() => handleNavLinkHover('climbing')}
                                        onMouseLeave={() => handleDropdownClose()}
                                    >
                                        <NavBarLink to="#" text="Climbing▾" />
                                        <Popper
                                            open={openDropdown === 'climbing'}
                                            placement="bottom"
                                            transition
                                            sx={{mt:'9vh'}}
                                        >
                                            {({ TransitionProps }) => (
                                                <Box
                                                    {...TransitionProps}
                                                    onMouseEnter={() => handleDropdownOpen('climbing')}
                                                    onMouseLeave={() => handleDropdownClose()}
                                                >
                                                    {renderDropdownContent("climbing", climbingList)}
                                                </Box>
                                            )}
                                        </Popper>
                                    </Box>
                                </ClickAwayListener>
                                <Box onMouseEnter={() => handleNavLinkHover(null)}>
                                    <NavBarLink to="/trips" text="Zanzibar" />
                                </Box>
                                <Box onMouseEnter={() => handleNavLinkHover(null)}>
                                    <NavBarLink to="/trips" text="Day Trips" />
                                </Box>
                                <Box onMouseEnter={() => handleNavLinkHover(null)}>
                                    <NavBarLink to="/trips" text="Photographic Safari" />
                                </Box>
                                <Box onMouseEnter={() => handleNavLinkHover(null)}>
                                    <NavBarLink to="/contact" text="Contact" />
                                </Box>
                            </Box>
                        </Grid>


                        <Grid item xs={9} md={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
                            <Box sx={{ backgroundColor:"ffd700" }}>
                                <Button
                                    color="warning"
                                    onClick={()=> navigate('/request')}
                                    style={{
                                        backgroundColor: '#ffd700',
                                        color: 'black',
                                        border: 'none',
                                        padding: '15px 30px',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    className="custom-button"
                                >
                                    Request
                                </Button>

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