import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  bgColor: "#000",
  borderColor: "white",
  fontColor: "white"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
      box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        font-size:14px;
        color:${(props) => props.theme.fontColor};
    }
`;
