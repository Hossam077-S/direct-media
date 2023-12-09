import React from "react";

import styled, { keyframes } from "styled-components";

import loadingLogo from "../../assests/LoadingLogo.png";

const flowLogo = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(30px); // Adjust the float height as needed
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

const StyledLogo = styled.img`
  width: auto; // Adjust size as needed
  height: auto;
  animation: ${flowLogo} 2s linear infinite;
`;

export const SuspenseFallback2 = () => (
  <LoadingContainer>
    <StyledLogo src={loadingLogo} alt="Loading Logo" />
  </LoadingContainer>
);
