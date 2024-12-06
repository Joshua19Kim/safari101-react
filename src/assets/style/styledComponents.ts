import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";


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

export const DropdownContent = styled(Paper)<{category: string}>(({ theme, category }) => ({
    padding: theme.spacing(1),
    backgroundColor: theme.palette.customBackgroundColor.main,
    width: "auto",
    marginLeft: category ==="eastAfrica" ? "5rem" : category === "climbing" ? "20vw" : "auto",
    display: 'flex',
    flexDirection: 'row',

}));

export const CategoryCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: theme.spacing(1),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },

}));