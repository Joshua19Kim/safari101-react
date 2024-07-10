import * as React from "react";
import {Drawer, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GradingIcon from "@mui/icons-material/Grading";
import InfoIcon from "@mui/icons-material/Info";

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


export default Sidebar;