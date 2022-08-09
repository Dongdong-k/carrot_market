import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { FieldErrors, useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data, error }] =
    useMutation<WriteResponse>("/api/posts");

  useEffect(() => {
    // data 변결될 때 마다 실행
    if (data && data.ok) {
      router.push(`/community/${data?.post?.id}`);
    }
  }, [data, router]);

  const onValid = (data: WriteForm) => {
    console.log(data);
    if (loading) return; // loading 상태시 재요청 안한다는 의미
    post(data);
  };

  const onInvalid = (data: FieldErrors) => {
    console.log(data?.question);
  };

  return (
    <Layout canGoBack title="Write Post">
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="p-4 space-y-4"
      >
        <TextArea
          register={register("question", {
            required: true,
            minLength: { value: 10, message: "minium Length : 10" },
          })}
          placeholder="Ask a question!"
          required
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
