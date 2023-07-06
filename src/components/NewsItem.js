//[[[컴포넌트설명]]]
//각 뉴스 정보를 보여주는 컴포넌트
//style-components 사용 javascript 파일에 내장시키는 방법 '스타일이 적용된 컴포넌트를 만들수 있다'
import styled from "styled-components";

const NewItemBlock = styled.div`
  display: flex;

  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;
//prop로 article 통째로 받아온다.
const NewsItem = ({ article }) => {
  //비구조화 할당으로 props값 추출
  const { title, description, url, urlToImage } = article;
  return (
    // jsx--> {}: 1. 출력 2.AND && 연산자 사용할때
    <NewItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewItemBlock>
  );
};

export default NewsItem;
