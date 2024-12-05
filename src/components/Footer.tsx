import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                padding: '1rem',
                marginTop: 'auto',
                textAlign: 'center',
                backgroundColor: theme => theme.palette.customBackgroundColor.main,
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    fontSize: '0.875rem',
                    opacity: 0.8
                }}
            >
                © Copyright Safari101 {currentYear} | All Rights Reserved
            </Typography>
        </Box>
    );
};

export default Footer;