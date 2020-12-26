import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import ProgressBar from "../components/ProgressBar";

const ImageUploadContainer = styled.form`
  margin: 30px auto 10px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid #01bf71;
  border-radius: 50%;
  margin: 10px auto;
  line-height: 30px;
  color: #01bf71;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    background-color: #01bf71;
    color: #fff;
  }
`;

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
`;

const Output = styled.div`
  height: 60px;
  font-size: 0.8rem;
`;

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const fileTypes = ["image/png", "image/jpeg"];

  const onInputChange = (e) => {
    let selected = e.target.files[0];
    if (selected && fileTypes.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "please select an image file",
      });
    }
  };

  return (
    <ImageUploadContainer>
      <Label>
        <Input type="file" onChange={onInputChange} />
        <span>+</span>
      </Label>
      <Output>
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </Output>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
