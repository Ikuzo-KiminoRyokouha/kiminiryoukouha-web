import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 0;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-top: 0;
`;

const HomeLink = styled.div`
  margin-top: 12px;
  cursor: pointer;
`;

export default function NotFound() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <>
      <Container>
        <Title>404</Title>
        <Description>Page Not Found</Description>
        <HomeLink onClick={onClick}>Go back home &rarr;</HomeLink>
      </Container>
    </>
  );
}
