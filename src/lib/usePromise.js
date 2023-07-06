//[[[컴포넌트설명 ]]]
//컴포넌트에서 API호출처럼 호출된 데이터의 상태관리를 PROMISE를 사용해야 하는 경우 간결하게 코드작성
//API로 받아온 데이터를 대기중 | 완료결과| 실패결과 에 대한 상태관리를 하는 동시에, 의존배열 DEPS를 UseEffect의 의존 배열로 설정한다.
import { useState, useEffect } from "react";

//389UsePromis hook을 사용한 promise의 대기중|완료결과|실패결과에 대한 상태를 관리한다
export default function usePromise(promiseCreator, deps) {
  //대기중|완료|실패에 대한 상태관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  //UseEffect 처음 렌더링 될때 특정함수를 실행시키는 hook
  //callback 지옥 -> promis -> es8문법 async/await 사용 try catch
  //useEffect에 async 적용하려면 함수를 별도로 선언후 사용해야 한다.
  useEffect(() => {
    const process = async () => {
      setLoading(true);

      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); //deps useEffect의 의존배열로 설정 EsLint 경고 빠른수정 --> ESLiNT 규치무시설정 2번째 클릭
  //반환
  return [loading, resolved, error];
}
