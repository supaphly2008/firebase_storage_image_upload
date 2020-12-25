import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import firebaseApp from "../firebase/firebase";

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

  @media screen and (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

const ImageGrid = (props) => {
  const { imageUrl } = props;

  const onImageClick = (url) => {
    const desertRef = firebaseApp.storage().refFromURL(url);
    desertRef
      .delete()
      .then(() => {
        Swal.fire({
          title: "Do you want to delete this image?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: `Delete`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Image deleted!", "", "success");
          }
        });
      })
      .catch((err) => {
        console.error("image delete error", err);
      });
  };

  return (
    <ImageContainer>
      {imageUrl.map((url, index) => {
        return <Img loading="lazy" src={url} key={index} onDoubleClick={() => onImageClick(url)} />;
      })}
    </ImageContainer>
  );
};

export default ImageGrid;
