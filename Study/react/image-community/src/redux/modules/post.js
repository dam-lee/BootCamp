import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";

// 액션 생성 함수
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (post) => ({ post }));

const initialState = {
  list: [],
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "mida",
  //   user_profile:
  //     "https://midadictionary.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  // },
  image_url: "https://midadictionary.s3.ap-northeast-2.amazonaws.com/cat.jpg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((doc) => {
        let _post = doc.data();

        //  Object.keys() 는 key값들을 배열      let post_list = [];로 만들어준다. ['contents', 'comment_cnt'...]
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        post_list.push(post);

        // console.log("post_list = ", post_list);
        // let post = {
        //   id: doc.id,
        //   user_info: {
        //     user_name: _post.user_name,
        //     user_profile: _post.user_profile,
        //     user_id: _post.user_id,
        //   },
        //   image_url: _post.image_url,
        //   contents: _post.contents,
        //   comment_cnt: _post.comment_cnt,
        //   insert_dt: _post.insert_dt,
        // };
        // post_list.push(post);
      });
      dispatch(setPost(post_list));
    });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    // 어떤 콜렉션 선택할지 미리 정해줌
    const postDB = firestore.collection("post");
    // getState() 는 리덕스 스토어에 있는 유저 정보를 가져옴
    const _user = getState().user.user; // 스토어에 있는 유저 정보를 담음
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;

    // 여러명이 업로드 할때 중복 파일이 생기지 않도록 uid와 등록한 시간을 기록한다.
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");

              // 리덕스 스토어에 preview 미리보기 상태값이 그대로 있어서
              // 파이어스토어에 업로드 되고나면 값을 null로 초기화
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              console.log("post 작성 error", err);
              alert(err);
            });
        })
        .catch((err) => {
          console.log("이미지 업로드 error", err);
          alert(err);
        });
    });
  };
};

const updatePostFB = (post) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _list = getState().post.list;
    const list = _list.map((item) => {
      return item.id === post.id
        ? {
            ...item,
            id: post.id,
            contents: post.contents,
            image_url: post.image_url,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
          }
        : item;
    });
    console.log("list = ", list);
    console.log("postDB , ", postDB);
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft를 쓰면 state의 값을 불변성을 지켜주면서 복사해준다.
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
};

export { actionCreators };
