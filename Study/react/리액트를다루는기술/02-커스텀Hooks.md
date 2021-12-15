# Custom Hooks
* 여러 컴포넌트에서 비슷한 기능을 공유할 경우, 커스텀 훅으로 만들어서 로직을 재 사용하는 방법.
* custom hook의 이름은 무조건 use로 시작해야한다.
* custom hook은 다른 hook을 호출할 수 있다.
* 다른 hook들은 커스텀 훅의 위로 놓여야 하며, 조건부 함수가 아니여야 한다.
* 좋은 네이밍과 더불어 사용하면 코드의 가독성을 높이고 짧고 간결한 코드를 작성할 수 있다.
* 같은 hook을 사용하는 두개의 컴포넌트는 state를 공유하지 않는다. hook은 상태관련 로직을 재사용하는 것이지만, 커스텀 hook을 사용할때마다 그안의 state와 effect는 완전히 독립적이다.
* 독립된 state를 얻는 방법은 각각의 Hook 호출은 서로 독립된 state를 받기 때문이며, 하나의 컴포넌트 안에서 useState와 useEffect를 여러번 부를 수 있고, 이들은 모두 완전히 독립적이기 때문이다.
* Hook은 함수이기 때문에 Hook 사이에서도 정보를 전달할 수 있다.
```javascript
// useIuputs 커스텀 훅 컴포넌트
import {useReducer} from "react"
function reducer(state,action){
  return {
    ...state,
    [action.name]:action.value
  };
}

export default function useInputs(initialForm){
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target)
  };
  return [state, onChange]
}

// info.js
import React from "react"
import useInput from "./useIuputs";

const Info = () => {
  const [state, onChange] = useInputs({name:'', nickname:""});
  const {name, nickname} = state;
  
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <b>이름 : </b> {name}
      </div>
      <div>
        <b>닉네임 : </b> {nickname}
      </div>
    </div>
  )
}

export default Info;
```
