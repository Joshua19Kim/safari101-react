import * as React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    styled, ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import GradingIcon from "@mui/icons-material/Grading";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import { eastAfricaCategories, climbingCategories } from './constants/constants';


interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SidebarDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '80%',
        maxWidth: '300px',
        backgroundColor: theme.palette.customBackgroundColor.main,
    },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleDropdownToggle = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const handleCategoryClick = (category: string, categoryName: string) => {
        navigate(`/trips/${categoryName}/${category}`);
        onClose();
    };

    return (
        <SidebarDrawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '80%',
                    maxWidth: '300px',
                    backgroundColor: theme => theme.palette.customBackgroundColor.main,
                }
            }}
        >
            <List component="nav">
                <ListItem button
                          onClick={() => handleNavigation('/')}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                </ListItem>
                <ListItem button
                          onClick={() => handleNavigation('/request')}
                >
                    <ListItemIcon>
                        <GradingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Make A Request" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                </ListItem>
                {/* East Africa Dropdown */}
                <ListItem
                    button
                    onClick={() => handleDropdownToggle('eastAfrica')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="East Africa" />
                    {openDropdown === 'eastAfrica' ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openDropdown === 'eastAfrica'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {eastAfricaCategories.map((category) => (
                            <ListItem
                                button
                                key={category.id}
                                onClick={() => handleCategoryClick('eastAfrica', category.id)}
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Box sx={{ width: 50 }} />
                                </ListItemIcon>
                                <ListItemText primary={category.id} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Safari */}
                <ListItem
                    button
                    onClick={() => handleNavigation('/trips/Safari')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Safari" />
                </ListItem>

                {/* Kilimanjaro */}
                <ListItem
                    button
                    onClick={() => handleNavigation('/trips/Kilimanjaro')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Kilimanjaro" />
                </ListItem>

                {/* Climbing Dropdown */}
                <ListItem
                    button
                    onClick={() => handleDropdownToggle('climbing')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Climbing" />
                    {openDropdown === 'climbing' ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openDropdown === 'climbing'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {climbingCategories.map((category) => (
                            <ListItem
                                button
                                key={category.id}
                                onClick={() => handleCategoryClick('climbing', category.id)}
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Box sx={{ width: 50 }} />
                                </ListItemIcon>
                                <ListItemText primary={category.id} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Zanzibar */}
                <ListItem
                    button
                    onClick={() => handleNavigation('/trips/Zanzibar')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Zanzibar" />
                </ListItem>

                {/* Day Trips */}
                <ListItem
                    button
                    onClick={() => handleNavigation('/trips/Day Trips')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Day Trips" />
                </ListItem>

                {/* Photographic Safari */}
                <ListItem
                    button
                    onClick={() => handleNavigation('/trips/Photographic Safari')}
                    sx={{
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover,
                        }
                    }}
                >
                    <ListItemIcon>
                        <Box sx={{ width: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary="Photographic Safari" />
                </ListItem>

                <ListItem button component={Link} to="/aboutus">
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="About Us" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                </ListItem>
            </List>
        </SidebarDrawer>
    );
};

export default Sidebar;