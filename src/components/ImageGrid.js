import React from "react";
import styled from "styled-components";
import useFirestore from "../hooks/useFirestore";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

const ImageGrid = () => {
  const { docs } = useFirestore("images");

  return (
    <ImageContainer>
      {docs.map((doc) => (
        <Img key={doc.id} src={doc.url} />
      ))}
    </ImageContainer>
  );
};

export default ImageGrid;
