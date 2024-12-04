import * as React from 'react';
import { Theme, styled } from '@mui/material/styles';
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

interface BaseNavLink {
    text: string;
    path: string;
    hasDropdown: boolean;
}

interface DropdownNavLink extends BaseNavLink {
    hasDropdown: true;
    dropdownKey: 'eastAfrica' | 'climbing';
}

interface SimpleNavLink extends BaseNavLink {
    hasDropdown: false;
    dropdownKey?: never;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

type NavLink = DropdownNavLink | SimpleNavLink;

const Logo = styled('img')({
    height: '3rem',
    width: '8rem',
})
const DropdownContent = styled(Paper)<{category: string}>(({ theme, category }) => ({
    padding: theme.spacing(1),
    backgroundColor: theme.palette.customBackgroundColor.main,
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

const NavLinks: NavLink[] = [
    {
        text: "East Africa▾",
        path: "#",
        hasDropdown: true,
        dropdownKey: 'eastAfrica'
    },
    {
        text: "Safari",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Kilimanjaro",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Climbing▾",
        path: "#",
        hasDropdown: true,
        dropdownKey: 'climbing'
    },
    {
        text: "Zanzibar",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Day Trips",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Photographic Safari",
        path: "/trips",
        hasDropdown: false
    }
];


const TopNavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // Create breakpoints for different screen sizes
    const isXLarge = useMediaQuery(theme.breakpoints.up('xl'));
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const [eastAfricaList, setEastAfricalList] = React.useState<Category[]>([]);
    const [climbingList, setClimbingList] = React.useState<Category[]>([]);

    const getVisibleLinksCount = () => {
        if (isXLarge) return NavLinks.length;
        if (isLarge) return 6;
        if (isMedium) return 4;
        return 0;
    };

    const visibleLinks = NavLinks.slice(0, getVisibleLinksCount());

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
    const hasHiddenLinks = () => {
        const visibleCount = getVisibleLinksCount();
        return visibleCount < NavLinks.length;
    };

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
            }, 300);
        }
    };

    const handleNavLinkHover = (dropdownName: string | null) => {
        if (dropdownName === null) {
            handleDropdownClose(true);
        } else {
            handleDropdownOpen(dropdownName);
        }
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
                        <Typography variant="subtitle1"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: "1.2rem",
                                    }}>
                            {category.name}
                        </Typography>
                    </CategoryCard>
                ))}
            </DropdownContent>
        )
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={(theme: Theme) => ({
                backgroundColor: theme.palette.customBackgroundColor.main,
                boxShadow: 'none',
                height: '4rem',
                // minHeight: '3.5rem'
            })}>
                <Toolbar sx={{ height: '100%', padding: 0 }}>
                    <Grid container alignItems="center" sx={{ height: '100%' }}>
                        {/* Logo */}
                        <Grid item xs={3} md={2} lg={1} sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Logo src={logoImage} alt="Logo" />
                            </Link>
                        </Grid>

                        {/* Navigation Links */}
                        <Grid item xs={6} md={8} lg={9} sx={{
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: { md: 1, lg: 2 },
                                flexWrap: 'nowrap'
                            }}>
                                {visibleLinks.map((link, index) => (
                                    <Box
                                        key={index}
                                        onMouseEnter={() =>
                                            link.hasDropdown
                                                ? handleNavLinkHover(link.dropdownKey)
                                                : handleNavLinkHover(null)
                                        }
                                        onMouseLeave={() =>
                                            link.hasDropdown
                                                ? handleDropdownClose()
                                                : null
                                        }
                                        sx={{ whiteSpace: 'nowrap' }}
                                    >
                                        <NavBarLink to={link.path} text={link.text} />
                                        {link.hasDropdown && link.dropdownKey === 'eastAfrica' && (
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
                                        )}
                                        {link.hasDropdown && link.dropdownKey === 'climbing' && (
                                            <Popper
                                                open={openDropdown === 'climbing'}
                                                placement="bottom-start"
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
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Grid>


                        <Grid item xs={9} md={2} sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingRight: 2,
                            gap: 1
                        }}>
                            <Button
                                color="warning"
                                onClick={() => navigate('/request')}
                                style={{
                                    backgroundColor: theme.palette.customButtonColor.main,
                                    color: theme.palette.customButtonFontColor.main,
                                    border: 'none',
                                    padding: '10px 20px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    borderRadius: "15px",
                                    whiteSpace: 'nowrap'
                                }}
                                className="custom-button"
                            >
                                Request
                            </Button>

                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{
                                    display: {
                                        xs: 'flex',
                                        md: hasHiddenLinks() ? 'flex' : 'none',
                                    }
                                }}
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
};

export default TopNavBar;