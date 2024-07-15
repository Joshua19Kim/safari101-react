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
            main: '#c58a60',
        },
        secondary: {
            main: '#F5C19D',
        },
        customColor: {
            main: '#ffd700',
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