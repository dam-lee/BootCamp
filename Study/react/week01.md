# 사전 준비

터미널에서 nvm --version 입력하면 버전 확인가능
나는 cmd에서는 확인되지만 터미널에서는 확인이 안됨..
bash: nvm: command not found 문구뜸
yarn add [옵션:글로벌/로컬] [패키지명]
yarn add global create-react-app
cra : 리액트를 웹상에서 사용할 수 있게 모든 패키지들이 담겨져있음.
node_modules : 설치한 패키지들이 들어간다
public :
src : 실제로 우리가 짜는 코드들은 다 src 폴더에 들어감.
package.json : 리액트 프로젝트의 설정 파일.

React에서는 html파일은 public에 있는 index.html 파일 한개 뿐이다.
jsx는 html 품은 자바스크립트 파일이며, jsx 문법을 사용해서 리액트 요소를 만들고, DOM 위에 띄워서 뷰를 그려준다.

return 안에서 if문은 할 수 없다. 대신에 삼항연산자를 사용한다.

# JSX

1. 태그는 꼭 닫아준다.
2. 무조건 1개의 엘리먼트를 반환
3. return 에는 무조건 1개의 값을 반환해야한다. 아무것도 없음 null이라도 반환해야함. (null도 자바스크립트에선 객체
   )
4. 스타일을 넣어줄 땐 객체로 넣어줘야함. style={{color:red}}

- jsx는 딕셔너리(객체)로 넣어주기 때문에 style도 {}로 한번 더 감싸줘야함.
