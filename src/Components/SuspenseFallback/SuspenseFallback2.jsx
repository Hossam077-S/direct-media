import React from "react";

import styled, { keyframes } from "styled-components";

import Larrow from "../../assests/IIleXb01.svg";
import Rarrow from "../../assests/US7ukR01.svg";

const floatLeft = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px); // Adjust the float height as needed
  }
  100% {
    transform: translateY(0);
  }
`;

const floatRight = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(25px); // Adjust the float height as needed
  }
  100% {
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full viewport height
`;

const StyledLarrow = styled.img`
  width: 25px; // Adjust size as needed
  height: auto;
  animation: ${floatLeft} 2s linear infinite;
`;

const StyledRarrow = styled.img`
  width: 25px; // Adjust size as needed
  height: auto;
  animation: ${floatRight} 2s linear infinite;
`;

export const SuspenseFallback2 = () => (
  <LoadingContainer>
    <StyledRarrow src={Rarrow} alt="Right Arrow" />
    <StyledLarrow src={Larrow} alt="Left Arrow" />
  </LoadingContainer>
);
