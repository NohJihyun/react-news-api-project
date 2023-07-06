//[[[컴포넌트설명]]]
//362(axios-api 데이터 받아오기)
//380import { useStaten useCallback } from "react";

//import axios from "axios";
//import NewsList from "./components/NewsList";
//import Categories from "./components/Categories"
//import { useState, useCallback } from "react";
//import { all } from "axios";

//385리액트라우트적용하기
import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

//const App = () => {
//362[[[promise .than을 통한 api 응답된 데이터 받아오기]]]
//현재상태 useState / 변경함수설정 setData
// const [data, setData] = useState(null);
// //이벤트헨드링 함수생성
// const onClick = () => {
//   //api받아오기 데이터 axios , promise(callback함수의 대처)의 .then 사용
//   //.then 사용 비동기적으로 데이터를 response로 응답
//   axios
//     .get("https://jsonplaceholder.typicode.com/todos/1")
//     .then((response) => {
//       setData(response.data);
//     });
//362[[[async/await 방식을 통한 api 응답된 데이터 받아오기]]]
//const [data, setData] = useState();
//함수앞에 async추가
//try/catch사용
//promis 앞에 await 추가 특정값을 변수에 담기
//365Your API key is: e1e9cad42f644673ae0289094f955d8f 발급받은 api key
//365"https://newsapi.org/v2/top-headlines?country=kr&apiKey=e1e9cad42f644673ae0289094f955d8f" 적용
//   const onClick = async () => {
//     try {
//       const response = await axios.get(
//         "https://newsapi.org/v2/top-headlines?country=kr&apiKey=e1e9cad42f644673ae0289094f955d8f"
//       );
//       setData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div>
//       {/* onClic 이벤트헨들링 설정 */}
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       {/* && 연산자를 사용한 jsx 조건부 렌더링  */}
//       {/* 요청한API를 컴포넌트에 response로 응답받은 JSON데이터 받아 보여준다 */}
//       {data && (
//         <textarea
//           rows={7}
//           value={JSON.stringify(data, null, 2)}
//           readOnly={true}
//         />
//       )}
//     </div>
//   );
//

//const App = () => {
//380category 한글로 출력되게 만든것을 state로 관린한다
//const [category, setCategory] = useState(all);
//함수선언/정의 useCallback 컴포넌트성능최적화 [] 컴포넌트 처음렌더시 함수생성
//const onSelect = useCallback((category) => setCategory(category), []);
//63 jsx 1.부모요소안에2.virtualDom컴포넌트변화감지하나의Dom트리구조--> 사용안하려면 <fragment> = <>
//380 이벤트헨들링 함수설정 <Categories>,<NewsList> 컴포넌트에 props로 카테고리 데이터와 함수를 전달
//return (
//<>
//<Categories category={category} onSelect={onSelect} />
//{/*380<NewsList> 컴포넌트에 props로 카테고리 데이터 전달*/}
//<NewsList category={category} />
//</>
//);
//};

//385리액트라우트적용하기 | 카테고리컴포넌트에서 선택된 카테고리값을 알려줄 필요도 없고, onSelect 함수를 따로 전달해줄필요없다.
//385경로에 category URL파라미터가 없어도 NewsPage 페이지를 보여주고, 있어도 NewsPage를 보여려고 2번 사용하였다
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<NewsPage />} />
    </Routes>
  );
};

export default App;
