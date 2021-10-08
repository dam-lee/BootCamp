const SET_PREVIEW = "image/SET_PREVIEW";

const initialState = {
  image: "",
  file: [],
};

export function setPreview(preview, file) {
  return { type: SET_PREVIEW, preview, file };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "image/SET_PREVIEW": {
      return { image: action.preview, file: action.file };
    }
    default:
      return state;
  }
}
