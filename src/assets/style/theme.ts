import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend the default theme type to include our custom color
declare module '@mui/material/styles' {
    interface Palette {
        customButtonColor: Palette['primary'];
        customFontColor: Palette['primary'];
        customBackgroundColor: Palette['primary'];

    }
    interface PaletteOptions {
        customButtonColor?: PaletteOptions['primary'];
        customFontColor?: PaletteOptions['primary'];
        customBackgroundColor?: PaletteOptions['primary'];

    }
}

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#ffffff', //#c58a60
        },
        secondary: {
            main: '#F5C19D',
        },
        customButtonColor: {
            main: '#f5c738',
        },
        customFontColor: {
            main: '#0b1234',
        },
        customBackgroundColor: {
            main: '#f6ede6',
        }
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