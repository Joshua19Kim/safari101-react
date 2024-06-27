// src/styledComponents.ts
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SectionBoxProps {
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


export const SectionBox = styled(Box)<SectionBoxProps>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: isSelected ? '8%' : '100%',
    width: '100%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'height 0.3s ease-in-out',
}));

interface SectionTypographyProps {
    isSelected: boolean;
}

export const SectionTypography = styled(Typography)<SectionTypographyProps>(({ isSelected }) => ({
    fontSize: isSelected ? '2vw' : '5vw',
    color: 'white',
    position: 'absolute',
    fontWeight: 'bold',
    fontFamily: 'roboto',
    top: isSelected ? '0%' : '30%',
    left: isSelected ? '10%' : '2%',
    right: isSelected ? 'auto' : '50%',
    textShadow: '3px 3px 6px rgba(0,0,0,5)',
    transform: isSelected ? 'rotate(0deg)' : 'rotate(270deg)',
    whiteSpace: 'nowrap',
}));

export const Section = styled(Box)({
    flex: 1,
    height: '100%',
    width: '33.33%',
    position: 'relative',
    transition: 'height 0.3s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
        opacity: 0.8,
    },
});

export const ContentsBox = styled(Box)<SectionBoxProps>(({ isSelected }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: isSelected ? '92%' : '0%',
    width: '100%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'height 0.3s ease-in-out',
    backgroundColor: 'white',
}));

