import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavBarLinkProps {
    to: string;
    text: string;
}

const NavBarLink: React.FC<NavBarLinkProps> = ({ to, text }) => {
    const specialCases = ['Contact', "East Africa▾", "Climbing▾" ];

    const linkTo = specialCases.includes(text) ? to : `${to}/${encodeURIComponent(text)}`;

    return (
        <Link to={linkTo} style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    px: 3,
                    display: 'flex',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '2vh',
                    color: 'inherit',
                    textDecoration: 'none',
                    // textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                }}
            >
                {text}
            </Typography>
        </Link>
    );
};

export default NavBarLink;