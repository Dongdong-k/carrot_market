import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

// return type 설정 필요
export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutationFunction(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      // api에서 Req.body 가능하지만, req.body.email 맵핑 안되는 문제 해결
      // POST 프로토콜로 json 데이터 송부시 Fetch() 사용하는데
      // Body 데이터 유형은 반드시 Content-Type 헤더와 일치해야함
      // 보통 html form 태그 사용하여 Post 요청시 Content-type : application/x-www-form-urlencoded 임
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch(() => {
        return; // json 없는 경우 오류 발생시 처리코드
      }) // response.json() 을 return 하는 의미
      .then((data) => setState((prev) => ({ ...prev, data }))) // (json) => setData(json)
      .catch((error) => setState((prev) => ({ ...prev, error }))) // (error) => setError(error)
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutationFunction, { ...state }];
}
