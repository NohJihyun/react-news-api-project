//[[[컴포넌트설명]]]
//router 페이지 연결
//url파라미터방식사용
import { useParams } from "react-router-dom";
import Categories from "../components/Categories";
import NewsList from "../components/NewsList";

const NewsPage = () => {
  //url파라미터방식적용
  const params = useParams();
  //카테고리가 선택되지 않았으면 기본값 All로 사용 || 논리연산자 인수중 하나라도 ture면 ture 반환 모두 아니면 false
  const category = params.category || "all";

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};

export default NewsPage;
