import { createGlobalStyle } from "styled-components";
import MontserratRegular from "../assets/MontserratAlternates-Regular.ttf";
import MontserratMedium from "../assets/MontserratAlternates-Medium.ttf";
import MontserratSemiBold from "../assets/MontserratAlternates-SemiBold.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Montserrat Alternates";
    src: url(${MontserratRegular}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Montserrat Alternates";
    src: url(${MontserratMedium}) format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Montserrat Alternates";
    src: url(${MontserratSemiBold}) format("truetype");
    font-weight: 600;
    font-style: normal;
  }

  body {
    font-family: "Montserrat Alternates", sans-serif;
  }
`;