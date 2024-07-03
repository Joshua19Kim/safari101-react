// src/styledComponents.ts
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SelectedProps {
    isSelected: boolean;
}

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


export const SectionBox = styled(Box)<SelectedProps>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: isSelected ? '8%' : '100%',
    width: '100%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'height 0.3s ease-in-out',
}));


export const SectionTypography = styled(Typography)<SelectedProps>(({ isSelected }) => ({
    fontSize: isSelected ? '3vw' : '7vw',
    color: 'white',
    position: 'absolute',
    fontWeight: 'bold',
    fontFamily: 'roboto',
    top: isSelected ? '0%' : '50%',
    left: isSelected ? '10%' : '2%',
    right: isSelected ? 'auto' : '50%',
    textShadow: '3px 3px 6px rgba(0,0,0,5)',
    transform: isSelected ? 'rotate(0deg)' : 'rotate(270deg)',
    whiteSpace: 'nowrap',
    zIndex: 2,
}));

export const Section = styled(Box)<SelectedProps>(({ isSelected }) => ({
    flex: 1,
    height: '100%',
    width: '33.33%',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
        opacity: 0.8,
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the last value (0.3) for darkness
        opacity: isSelected ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        zIndex: 1,
    },
}));

export const ContentsBox = styled(Box)<SelectedProps>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: isSelected ? '100%' : '0%',
    width: '100%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'height 0.3s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflowY: 'auto', // Add this line to enable vertical scrolling
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
}));



