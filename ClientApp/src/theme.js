import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#55B2B8' },
    secondary: { main: '#F8BBD0' }
};
const themeName = 'main theme color';

export default createMuiTheme({ palette, themeName });