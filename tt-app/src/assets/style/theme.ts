import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend the default theme type to include our custom color
declare module '@mui/material/styles' {
    interface Palette {
        customColor: Palette['primary'];
    }
    interface PaletteOptions {
        customColor?: PaletteOptions['primary'];
    }
}

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#c58a60', // Your main theme color (gold in this case)
        },
        secondary: {
            main: '#1976d2', // Your secondary theme color (blue in this case)
        },
        customColor: {
            main: '#f44336', // Example of a custom color
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;