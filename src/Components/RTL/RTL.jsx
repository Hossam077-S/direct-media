import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StylesProvider, jssPreset } from "@mui/styles";
import { create } from "jss";
import rtl from "jss-rtl";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Create a theme instance.
const theme = createTheme({
  direction: "rtl", // Both here and in the StylesProvider
});

export default function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
}
