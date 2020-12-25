import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import firebaseApp from "../firebase/firebase";

const ImageUploadContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: #01bf71;
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const Progress = styled.progress`
  width: 50%;
  margin-bottom: 10px;
`;

const ImageUpload = () => {
  const [progress, setProgress] = useState(0);
  const onInputChange = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref("hair_gallery/" + file.name);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      function error(err) {
        Swal.fire({
          icon: "error",
          title: "oops...",
          text: "Looks like something went wrong!",
        });
        setProgress(0);
      },
      function conplete(complete) {
        Swal.fire({
          icon: "success",
          title: "Thanks",
          text: "Your image has been uploaded!",
        });
        setProgress(0);
      }
    );
  };

  return (
    <ImageUploadContainer>
      <Progress value={progress} max="100">
        0%
      </Progress>
      <input type="file" onChange={onInputChange} />
    </ImageUploadContainer>
  );
};

export default ImageUpload;
