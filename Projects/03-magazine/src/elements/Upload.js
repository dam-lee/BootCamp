import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setPreview } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    // file을 읽는다.
    reader.readAsDataURL(file);

    // file 읽는게 성공적으로 되었을때 실행
    reader.onload = () => {
      dispatch(setPreview(reader.result, file));
    };
    // file 읽기 실패되었을때 실행
    reader.onerror = (error) => {
      alert("이미지를 읽어오는데 실패했습니다.");
      console.log("error = ", error);
    };
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
  };
  return (
    <>
      <FileUpload type="file" ref={fileInput} onChange={selectFile} />
    </>
  );
};

const FileUpload = styled.input`
  margin: 15px 0px;
`;

export default Upload;
