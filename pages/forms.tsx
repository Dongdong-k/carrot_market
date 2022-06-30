import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  // useForm Hook
  // handleSubmit - event.PreventDefault 기능
  // formState : errors state 제공 / 별도 state 생성 필요없고 오류 개선시 자동 업데이트 됨
  // mode : inputvalidate 조건 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  // onValid : Input 값을 Data로 가져옴
  // onInvalid : errors 값을 가져옴
  const onValid = (data: LoginForm) => {
    console.log(data);
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: { value: 5, message: "Min Length is 5" },
        })}
        type={"text"}
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Do not use Gamil",
          },
        })}
        type={"email"}
        placeholder="Email"
        className={`${
          Boolean(errors.email) ? "border-red-500 border-2" : null
        }`}
      />
      {errors ? <span>{errors?.email?.message}</span> : null}
      <input
        {...register("password", { required: "Password is required" })}
        type={"password"}
        placeholder="Password"
      />
      <input type={"submit"} value="Create Account" />
    </form>
  );
}
