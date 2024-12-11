import * as React from 'react';
import { Theme } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Grid,
    Popper,
    useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom";
import NavBarLink from "./NavBarTextWithLink";
import logoImage from '../../assets/img/logo/LOGO-Main.png';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import { eastAfricaCategories, climbingCategories, NavLinks } from '../constants/constants';
import {CategoryCard, DropdownContent, Logo} from "../../assets/style/styledComponents";


const TopNavBar: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Create breakpoints for different screen sizes
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));
    const [visibleLinksCount, setVisibleLinksCount] = React.useState(NavLinks.length);

    const navContainerRef = React.useRef<HTMLDivElement>(null);
    const [availableWidth, setAvailableWidth] = React.useState(0);


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

    const handleCategoryClick = (category: string, categoryName: string) => {
        navigate(`/trips/${categoryName}/${category}`);
        handleDropdownClose();
    };


    const updateVisibleLinks = React.useCallback(() => {
        if (navContainerRef.current) {
            const containerWidth = navContainerRef.current.offsetWidth;
            const linkWidth = 200;
            const maxVisibleLinks = Math.floor(containerWidth / linkWidth);
            setAvailableWidth(containerWidth);
            setVisibleLinksCount(Math.min(maxVisibleLinks, NavLinks.length)); // Update state
            return maxVisibleLinks;
        }
        return 0;
    }, []);

    const getVisibleLinksCount = () => {
        if (!isMedium) return 0;
        return visibleLinksCount;
    };


    const visibleLinks = React.useMemo(() => {
        return NavLinks.slice(0, getVisibleLinksCount());
    }, [visibleLinksCount]);

    React.useEffect(() => {
        updateVisibleLinks();
        const container = navContainerRef.current;
        if (container) {
            const resizeObserver = new ResizeObserver(() => {
                updateVisibleLinks();
            });

            resizeObserver.observe(container);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [updateVisibleLinks]);


    const renderDropdownContent = (categoryTitle: string, categories: CategoryTopic[]) => (
        <DropdownContent category={categoryTitle}>
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    onClick={() => handleCategoryClick(categoryTitle, category.id)}
                >
                    <img
                        src={require(`../../assets/img/${category.image}`)}
                        alt={category.id}
                        style={{ width: "15vw", height: "15vh", objectFit: 'cover', marginRight: 8 }}
                    />
                    <Typography variant="subtitle1"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1.2rem",
                                }}>
                        {category.id}
                    </Typography>
                </CategoryCard>
            ))}
        </DropdownContent>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={(theme: Theme) => ({
                backgroundColor: theme.palette.customBackgroundColor.main,
                boxShadow: 'none',
                height: '4rem',
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
                        <Grid item xs={6} md={8} lg={9}
                              ref={navContainerRef}
                              sx={{
                                  display: { xs: 'none', md: 'flex' },
                                  justifyContent: 'center',
                                  overflow: 'hidden'
                              }}
                        >
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
                                                sx={{mt:'4rem'}}
                                            >
                                                {({ TransitionProps }) => (
                                                    <Box
                                                        {...TransitionProps}
                                                        onMouseEnter={() => handleDropdownOpen('eastAfrica')}
                                                        onMouseLeave={() => handleDropdownClose()}
                                                    >
                                                        {renderDropdownContent("eastAfrica", eastAfricaCategories)}
                                                    </Box>
                                                )}
                                            </Popper>
                                        )}
                                        {link.hasDropdown && link.dropdownKey === 'climbing' && (
                                            <Popper
                                                open={openDropdown === 'climbing'}
                                                placement="bottom-start"
                                                transition
                                                sx={{mt:'4rem'}}
                                            >
                                                {({ TransitionProps }) => (
                                                    <Box
                                                        {...TransitionProps}
                                                        onMouseEnter={() => handleDropdownOpen('climbing')}
                                                        onMouseLeave={() => handleDropdownClose()}
                                                    >
                                                        {renderDropdownContent("climbing", climbingCategories)}
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
                                sx={{
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
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: theme.palette.customButtonColor.dark,
                                    },
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