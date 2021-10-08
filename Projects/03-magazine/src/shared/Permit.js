import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  // 세션 스토리지에서 key값을 복사해서 api key값으로 변경한다.
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션 스토리지가 있는지 없는지 확인한다.
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_session && is_login) {
    return <>{props.children}</>;
  }
  return null;
};

export default Permit;
