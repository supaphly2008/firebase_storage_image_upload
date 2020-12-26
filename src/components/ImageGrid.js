import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { firebaseApp } from "../firebase/firebase";
import useFirestore from "../hooks/useFirestore";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
`;

const Img = styled.img`
  border-radius: 5px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 480px) {
    width: 100%;
    height: 200px;
  }
`;

const ImageGrid = () => {
  const { docs } = useFirestore("images");

  const onImageDelete = (doc) => {
    const desertRef = firebaseApp.storage().refFromURL(doc.url);

    firebaseApp
      .firestore()
      .collection("images")
      .doc(doc.id)
      .delete()
      .then(() => {
        desertRef
          .delete()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Your Image has been deleted!",
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ImageContainer>
      {docs.map((doc) => (
        <Img key={doc.id} src={doc.url} onDoubleClick={() => onImageDelete({ id: doc.id, url: doc.url })} />
      ))}
    </ImageContainer>
  );
};

export default ImageGrid;
