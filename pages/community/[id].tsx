import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Answer, Post, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface AnswerWithUser extends Answer {
  user: User;
}

// Post 에 User 항목 추가
interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wonderings: number;
  };
  answers: AnswerWithUser[];
}

// Post 타입을 User가 추가된 내용으로 변경
interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

// For useForm Hook
interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const { register, handleSubmit, reset } = useForm<AnswerForm>();

  // 궁금해요 API
  const [getWonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );

  // 궁금해요 API 실행 및 캐쉬 업데이트
  const onWonderClick = () => {
    // onBound mutate
    if (!data) return;
    mutate(
      {
        ...data, // 기존 data 정보 가져오기
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            wonderings: data?.isWondering
              ? data?.post._count.wonderings - 1
              : data?.post._count.wonderings + 1, // 기존 data에서 필요한 부분만 수정
          },
        },
        isWondering: !data?.isWondering,
      },
      false
    ); // 두번째 인자 True 경우 : 캐시 업데이트 후 API 업데이트 실행 & Validate
    // 빠르게 여러번 클릭하는 경우 중복 실행 방지
    if (!loading) {
      getWonder({});
    }
  };

  // 댓글 API
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);
  console.log(router.query.id);
  console.log(data);

  // 댓글 handleSubmit - onValid
  const onValid = (form: AnswerForm) => {
    console.log(form);
    if (answerLoading) return; // loading 중이면 미실행하기
    sendAnswer(form);
  };

  // 댓글 입력 정상실행시 입력창 지우기
  useEffect(() => {
    if (answerData?.ok) {
      reset();
    }
  }, [answerData, reset]);

  return (
    <div>
      <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        동네질문
      </span>
      <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-slate-300" />
        <div>
          <p className="text-sm font-medium text-gray-700">
            {data?.post?.user?.name}
          </p>
          <Link href={`/users/profiles.${data?.post?.user?.name}`}>
            <a className="text-sm font-medium text-gray-700">
              View profile &rarr;
            </a>
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-2 px-4 text-gray-700">
          <span className="text-orange-500 font-medium">Q.</span>{" "}
          {data?.post?.question}
        </div>
        <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
          <button
            onClick={onWonderClick}
            className={cls(
              "flex space-x-2 items-center text-sm",
              data?.isWondering ? "text-teal-400" : ""
            )}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>궁금해요 {data?.post?._count?.wonderings} </span>
          </button>
          <span className="flex space-x-2 items-center text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>답변 {data?.post?._count?.answers}</span>
          </span>
        </div>
      </div>
      <div className="px-4 my-5 space-y-5">
        {data?.post?.answers.map((answer) => (
          <div key={answer.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div>
              <span className="text-sm block font-medium text-gray-700">
                {answer?.user?.name}
              </span>
              <span className="text-xs text-gray-500 block ">
                {+answer.createdAt}
              </span>
              <p className="text-gray-700 mt-2">{answer.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <form className="px-4" onSubmit={handleSubmit(onValid)}>
        <TextArea
          name="description"
          placeholder="Answer this question!"
          required
          register={register("answer", {
            required: true,
            minLength: { value: 5, message: "min Length is 5" },
          })}
        />
        <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
          {answerLoading ? "Loading..." : "Reply"}
        </button>
      </form>
    </div>
  );
};

export default CommunityPostDetail;
