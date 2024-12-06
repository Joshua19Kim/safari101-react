import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend the default theme type to include our custom color
declare module '@mui/material/styles' {
    interface Palette {
        customButtonColor: Palette['primary'];
        customButtonFontColor: Palette['primary'];
        customFontColor: Palette['primary'];
        customBackgroundColor: Palette['primary'];
        priceColor: Palette['primary'];

    }
    interface PaletteOptions {
        customButtonColor?: PaletteOptions['primary'];
        customButtonFontColor?: PaletteOptions['primary'];
        customFontColor?: PaletteOptions['primary'];
        customBackgroundColor?: PaletteOptions['primary'];
        priceColor?: PaletteOptions['primary'];

    }
}

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#c58a60', //#c58a60
        },
        secondary: {
            main: '#F5C19D',
        },
        customButtonColor: {
            main: '#4a6c98',
            dark: '#314865',
            light: '#c9dffc'
        },
        customButtonFontColor: {
            main: '#ffff24',
        },
        customFontColor: {
            main: '#3b5375',
        },
        customBackgroundColor: {
            main: '#f6ede6',
        },
        priceColor: {
            main: '#00bf63'
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