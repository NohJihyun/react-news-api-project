//[[[컴포넌트설명]]
//카테고리 선택 UI 만들기 [첫번째 방식 styled-component 두번째방식 url파라미터 NavLink 스타일적용]
//1첫번째방식.styled-component 적용(1.props로 전달받은것 스타일링) | 381 2.css로 카테고리 클릭시 스타일 적용
//2두번째방식.386 url파라미터 NavLink 스타일적용
import styled from "styled-components";
import { NavLink } from "react-router-dom";

//소문자 categories
const categories = [
  {
    name: "all",
    text: "전체보기",
  },
  {
    name: "business",
    text: "비즈니스",
  },
  {
    name: "entertainment",
    text: "엔터테인먼트",
  },
  {
    name: "health",
    text: "건강",
  },
  {
    name: "science",
    text: "과학",
  },
  {
    name: "sports",
    text: "스포츠",
  },
  {
    name: "technology",
    text: "기술",
  },
];
//[[[스타일작업]]]
//1.첫번째방식 UseState로 상태관리하면서 style-component로 스타일 적용
//1.첫번째방식 styled-component javascript 내장 스타일이 적용된 컴포넌트를 만들수 있다
//2.두번째방식 URL파라미터를 적용하여 category 에 스타일일 styled-component에서 NavLink api로 스타일 적용
const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;
//[[첫번째방식]]
//1.첫번째방식 381카테고리 클릭시 디자인 되는 css
//1.첫번째방식 245설명참고 Props에따른조건부스타일링: 스타일쪽에서 props 카테고리를 참조해서 컴포넌트에 css 적용
// const Category = styled.div`
//   font-size: 1.125rem;
//   cursor: pointer;
//   white-space: pre;
//   text-decoration: none;
//   color: inherit;
//   padding-bottom: 0.25rem;

//   &:hover {
//     color: #495057;
//   }
//   ${(props) =>
//     props.active &&
//     css`
//       font-weight: 600;
//       border-bottom: 2px soild #22b8cf;
//       color: #22b8cf;
//       &:hover {
//         color: #3bc9db;
//       }
//     `}

//   & + & {
//     margin-left: 1rem;
//   }
//`;
//[[두번째방식]]
//2.386두번째방식 Url파라미터 category styled-component 방식에서 navLink api로 스타일 적용시키기
//styled-component에서 NavLink를 사용할때 styled(컴포넌트이름)``
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;
//[[첫번째방식]]
//378 1.첫번째방식 UseState상태관리및 styled-component로 javascript 파일내에서 스타일을 선언해 컴포넌트에 스타일 적용하는 방식
//378 영어/한글 첫렌더 한글 클릭시 --> 영어  name은 영어를 가르키고 text는 한글을 가르킨다
//변환하여 실제 name 영어를 가르키는데 출력은 한글이 출력이 될수 있도록 연결
//381 props로 전달받은 함수와 카테고리를 받아서 css 적용및 onClick 이벤트헨들링 설정
// const Categories = ({ onSelect, category }) => {
//   return (
//     //컴포넌트 배열로 변환작업
//     <CategoriesBlock>
//       {categories.map((c) => (
//         <Category
//           key={c.name}
//           active={category === c.name}
//           onClick={() => onSelect(c.name)}
//         >
//           {c.text}
//         </Category>
//       ))}
//     </CategoriesBlock>
//   );
// };
//[[두번째방식-URL파라미터및Navlink스타일적용]]
const Categories = () => {
  return (
    //컴포넌트 배열로 변환작업
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={c.name === "all" ? "/" : `/${c.name}`} // 전체경로 전체보기 경로수정
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};
export default Categories;
