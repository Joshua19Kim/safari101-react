import * as React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Box,
    styled, ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';
import { getCategories } from '../api/sanityApi';
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GradingIcon from "@mui/icons-material/Grading";
import InfoIcon from "@mui/icons-material/Info";

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

const SidebarListItem = styled(ListItem)(({ theme }) => ({
    padding: '12px 16px',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer',
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
    const [eastAfricaList, setEastAfricaList] = React.useState<Category[]>([]);
    const [climbingList, setClimbingList] = React.useState<Category[]>([]);

    React.useEffect(() => {
        if (isOpen) {
            getCategoryList("eastAfricaAreaList");
            getCategoryList("climbingAreaList");
        }
    }, [isOpen]);

    const getCategoryList = async (category: string) => {
        try {
            const response = await getCategories(category);
            if (category === "eastAfricaAreaList") {
                setEastAfricaList(response);
            } else if (category === "climbingAreaList") {
                setClimbingList(response);
            }
        } catch (error) {
            console.error('Error fetching items', error);
            if (category === "eastAfricaAreaList") {
                setEastAfricaList([]);
            } else if (category === "climbingAreaList") {
                setClimbingList([]);
            }
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleDropdownToggle = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const handleCategoryClick = (categorySlug: string) => {
        navigate(`/category/${categorySlug}`);
        onClose();
    };

    return (
        <SidebarDrawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <List component="nav">
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/request">
                        <ListItemIcon>
                            <GradingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Make A Request" primaryTypographyProps={{ fontFamily: 'roboto' }} />
                    </ListItem>
                </List>
                {/* East Africa Dropdown */}
                <SidebarListItem onClick={() => handleDropdownToggle('eastAfrica')}>
                    <ListItemText primary="East Africa" />
                    {openDropdown === 'eastAfrica' ? <ExpandLess /> : <ExpandMore />}
                </SidebarListItem>
                <Collapse in={openDropdown === 'eastAfrica'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {eastAfricaList.map((category) => (
                            <SidebarListItem
                                key={category._id}
                                onClick={() => handleCategoryClick(category.slug.current)}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary={category.name} />
                            </SidebarListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Safari */}
                <SidebarListItem onClick={() => handleNavigation('/trips/Safari')}>
                    <ListItemText primary="Safari" />
                </SidebarListItem>

                {/* Kilimanjaro */}
                <SidebarListItem onClick={() => handleNavigation('/trips/Kilimanjaro')}>
                    <ListItemText primary="Kilimanjaro" />
                </SidebarListItem>

                {/* Climbing Dropdown */}
                <SidebarListItem onClick={() => handleDropdownToggle('climbing')}>
                    <ListItemText primary="Climbing" />
                    {openDropdown === 'climbing' ? <ExpandLess /> : <ExpandMore />}
                </SidebarListItem>
                <Collapse in={openDropdown === 'climbing'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {climbingList.map((category) => (
                            <SidebarListItem
                                key={category._id}
                                onClick={() => handleCategoryClick(category.slug.current)}
                                sx={{ pl: 4 }}
                            >
                                <ListItemText primary={category.name} />
                            </SidebarListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Zanzibar */}
                <SidebarListItem onClick={() => handleNavigation('/trips/Zanzibar')}>
                    <ListItemText primary="Zanzibar" />
                </SidebarListItem>

                {/* Day Trips */}
                <SidebarListItem onClick={() => handleNavigation('/trips/Day Trips')}>
                    <ListItemText primary="Day Trips" />
                </SidebarListItem>

                {/* Photographic Safari */}
                <SidebarListItem onClick={() => handleNavigation('/trips/Photographic Safari')}>
                    <ListItemText primary="Photographic Safari" />
                </SidebarListItem>
                {/*<ListItem button component={Link} to="/aboutus">*/}
                {/*    <ListItemIcon>*/}
                {/*        <InfoIcon />*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="About Us" primaryTypographyProps={{ fontFamily: 'roboto' }} />*/}
                {/*</ListItem>*/}
            </List>
        </SidebarDrawer>
    );
};

export default Sidebar;