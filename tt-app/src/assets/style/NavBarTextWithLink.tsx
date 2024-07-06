import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavBarLinkProps {
    to: string;
    text: string;
}

const NavBarLink: React.FC<NavBarLinkProps> = ({ to, text }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: 'none', sm: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: { xs: '2vh', md: '2vh' },
                color: 'inherit',
                textDecoration: 'none',
                marginRight: '2rem',
                textShadow: '3px 3px 6px rgba(0,0,0,5)',
            }}
        >
            {text}
        </Typography>
    </Link>
);

export default NavBarLink;