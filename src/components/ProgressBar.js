import React, { useEffect } from "react";
import styled from "styled-components";
import useStorage from "../hooks/useStorage";

const Progress = styled.div`
  height: 5px;
  background-color: #01bf71;
  margin-top: 20px;
`;

const ProgressBar = (props) => {
  const { file, setFile } = props;
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <Progress style={{ width: progress + "%" }} />;
};

export default ProgressBar;
