//[[[컴포넌트설명]]]
//API를 요청한다
//뉴스데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링 해주는 컴포넌트
//1.styled-components 컴포넌트 스타일링 적용 2.api 호출 axios 3. useState 상태관리 4. useEffect 렌더링 될때마다 특정작업수행 5.390usePromise커스텀 utill hook
import styled from "styled-components";
//import NewsItem from "./NewsItem";
//import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
//371sampleArticle 데이터 연습 주석
// const sampleArticle = {
//   title: "제목",
//   description: "내용",
//   url: "https://google.com",
//   urlToImage: "https://via.placeholder.com/160",
// };
// //sampleArticle 데이터를 props로 NewsItem 컴포넌트에게 전달
// const NewsList = () => {
//   return (
//     <NewsListBlock>
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//       <NewsItem article={sampleArticle} />
//     </NewsListBlock>
//   );
// };
//374데이터연동
//374화면에 보이는 시점에 API요청
//374컴포넌트가 처음 렌더링되는 시점에 API를 요청하면 된다 주의할점은 async/await를 사용시 함수내부에 함수를 또따로 만들어 적용해야한다.
//374loding 상태도 관리 API 요청이 대기 중인지 판별 요청대기시 loding값이 true 요청이 끝나면 false
//382App.js에서 props로 전달하고 있는 카테고리를 카테고리에 맞게 화면에 출력되도록 작업
//390usePromise커스텀 utill hook --> 해당 컴포넌트에서  상태관리와 useEffect 설정을 직접하지 않고, utill 함수로 따로뺀것을 적용
const NewsList = ({ category }) => {
  //374 데이터 연동 articles:기사
  //const [articles, setAticles] = useState(null);
  //const [loading, setLoading] = useState(null);

  //390usePromise커스텀 utill hook --> 해당 컴포넌트에서  상태관리와 useEffect 설정을 직접하지 않고, utill 함수로 따로뺀것을 적용
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`
    );
  }, [category]);
  //374 데이터 연동
  // useEffect 처음 렌더링되는 시점에 적용, 특정작업수행 [] 빈배열 처음렌더될때 함수실행 특정업데이트할때 [값사용]
  // useEffect(() => {
  //   //async를 사용하는 함수 따로 선언
  //   const fetchData = async () => {
  //     setLoading(true); //Api요청 대기중인지 판별 요청대기중 일때 ture / 요청이 끝나면 false
  //     //382App.js에서 props로 전달하고 있는 카테고리를 카테고리에 맞게 화면에 출력되도록 작업 1.query 2. query에 카테고리값을 공백|문자열로 작업해 담아서 요청해서 받아올때 주소에 쿼리를 담았다
  //     try {
  //       const query = category === "all" ? "" : `&category=${category}`;
  //       const response = await axios.get(
  //         `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`
  //       );
  //       setAticles(response.data.articles);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false); //api요청이 끝났으면 false
  //   };
  //   fetchData();
  // }, [category]); //useEffect 382 컴포넌트가 처음 렌더링 될때, category 값이 바뀔때 요청하도록 설정하였다

  //374데이터 연동 대기중일때 반환
  //390usePromise커스텀 utill hook
  if (loading) {
    return <NewsListBlock>대기 상태.... 로딩중 ...</NewsListBlock>;
  }
  //374데이터 연동 아직 articles 값이 설정되지 않았을때
  //374데이터 연동 if (!articles) {
  //390usePromise커스텀 utill hook
  if (!response) {
    return null; // 하단에 컴포넌트 변환하여 적용시킬때 !articles 조회해서 해당값이 현재 null인지 검사 : 데이터가 없을때 null에는 map함수가 없기때문에 렌더링 과정에서 에러 발생
  }
  //390usePromise커스텀 utill hook
  //에러가 발생하였을때
  if (error) {
    return <NewsListBlock>에러발생</NewsListBlock>;
  }
  //articles 값이 유효할때
  const { articles } = response.data;
  return (
    //jsx {} && 연산자 사용 조건부렌더링
    //map을 사용 새로운 배열을 만들어서 컴포넌트 배열로 변환과정
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
