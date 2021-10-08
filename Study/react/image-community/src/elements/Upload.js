import React from "react";
import { Button } from "../elements";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
const Upload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();
  const selectFile = (e) => {
    console.log(fileInput.current.files[0]);

    // selector했을때 input에 파일 객체가 들어가고, 그 값을 읽어오기 위해 new FileReader() 사용
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    // readAsDataURL 라는 메소드에 () 내가 넣고 싶은 파일 객체를 넣는다.
    reader.readAsDataURL(file);

    // 읽기가 끝난 뒤에 event를 받아와야 결과값을 받아서 사용할 수 있다.
    // onloadend 로 읽기가 끝난뒤의 일을 실행할 수 있다.
    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };
  return (
    <>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={is_uploading}
      />
      <Button onClick={uploadFB}>업로드</Button>
    </>
  );
};

export default Upload;
