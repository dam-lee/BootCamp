import React from "react";

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class LifecycleEx extends React.Component {
  // 생성자 함수, 초기 값 설정
  constructor(props) {
    super(props);

    this.state = {
      cat_name: "나비",
    };

    console.log("in constructor!"); // 1번. 초기값 설정이 먼저 찍힘
  }

  changeCatName = () => {
    // 다음 강의에서 배울, state 업데이트 하는 방법입니다!
    // 지금은 componentDidUpdate()를 보기 위해 쓰는 거니까, 처음보는 거라고 당황하지 말기!
    this.setState({ cat_name: "바둑이" });

    console.log("고양이 이름을 바꾼다!"); // 버튼을 클릭했을 때 1번째로 찍힘.
  };

  // 가상돔이 실제 돔에 올라가는 메소드
  componentDidMount() {
    // 3번째로 콘솔에 찍힘
    // 화면에 나타나는게 끝났다.
    // dom에 완벽하게 올라갔을 때. 딱 맨처음 1번만 생김. 딱 한번만 생성될 테니까
    // 리렌더링될 때 실행되지 않는다.
    // 보통 ajax나 event를 여기서 많이 한다.
    console.log("in componentDidMount!");
  }

  componentDidUpdate(prevProps, prevState) {
    // 버튼을 클릭했을 때 3번째로 찍힘
    // 이전에 내가 갖고 있던 값과 새롭게 변경될 값을 찍어줌
    // 부모한테 받은 props가 없어서 안찍힘,
    // 리렌더링이 끝난 다음에 호출이 되는 라이프 사이클 메소드 함수이다.
    console.log(prevProps, prevState);
    // 현재 데이터와 이전 데이터를 비교하려면 여기서 비교한다.
    console.log("in componentDidUpdate!");
  }

  componentWillUnmount() {
    console.log("in componentWillUnmount!");
  }

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    console.log("in render!"); // 2번째로 콘솔에 찍힘.
    // 생성 된 다음에 render에 들어왔다는 것은 생성된 컴포넌트를 DOM에다가 붙일 거야!
    // 붙일 dom은 return안에 내용들.
    // 버튼을 클릭했을 때 2번째로 찍힘

    return (
      <div>
        {/* render 안에서 컴포넌트의 데이터 state를 참조할 수 있습니다. */}
        <h1>제 고양이 이름은 {this.state.cat_name}입니다.</h1>
        <button onClick={this.changeCatName}>고양이 이름 바꾸기</button>
      </div>
    );
  }
}

export default LifecycleEx;
