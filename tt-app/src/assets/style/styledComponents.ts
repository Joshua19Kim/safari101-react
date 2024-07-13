// src/styledComponents.ts
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";


interface BackgroundImageProps {
    bgImage: string;
}

export const Background = styled(Box)<BackgroundImageProps>(({ bgImage }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        right: '-10px',
        bottom: '-10px',
        background: `url(${bgImage}) no-repeat center center / cover`,
        filter: 'blur(10px)',
    },
}));
