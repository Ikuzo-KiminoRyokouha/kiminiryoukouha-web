import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

import MyInput from "../components/MyInput";
import useInput from "../hooks/useInput";
import { mLogin } from "../utils/fetchFn/mutation/user";
import React from "react";
import { setJWTToken } from "../utils/client";

export default function LoginPage() {
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement>(null);
  const { mutate } = useMutation(["login"], mLogin, {
    onSuccess: async (res) => {
      console.log(res.data.accessToken)
      setJWTToken(res.data.accessToken);
      // reloadUser();
      router.push("/");
    },
    onError(error) {
      alert("something went wrong");
      console.log("error occured", error);
    },
  });
  const id = useInput("", "id");
  const pwd = useInput("", "password");

  const onSubmit = () => {
    mutate({
      email: id.value,
      password: pwd.value,
    });
  };

  return (
    <div className="max-w-8xl mx-auto mb-[53px] flex w-full flex-1 flex-col items-center justify-center">
      <Head>
        <title>Login</title>
        <meta name="description" content="login page" />
      </Head>
      <div className="flex h-full w-full flex-col items-center justify-center md:w-2/5">
        <div>
          <h1 className="p-1 pb-5 text-4xl font-bold">Sign in</h1>
        </div>
        <div className="flex w-full flex-col p-4">
          <MyInput {...id} type="email" />
          <MyInput
            {...pwd}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitButton.current?.click();
              }
            }}
            type="password"
          />
          <div className="flex items-center ">
            <div>
              <input type="checkbox" id="remember" className="h-4 w-4" />
            </div>
            <div className="pb-1">
              <label htmlFor="remember" className=" pl-2 text-lg">
                remember me
              </label>
            </div>
          </div>
          <button
            ref={submitButton}
            onClick={onSubmit}
            type="submit"
            className="my-3 rounded bg-sky-600 p-4  text-white"
          >
            Sign In
          </button>

          <div className="flex justify-between">
            <Link href="signUp" legacyBehavior>
              <a className="text-xs text-sky-600 md:text-sm xl:text-base">
                Create Account
              </a>
            </Link>
            <Link href="findPwd" legacyBehavior>
              <a className="text-xs text-sky-600 md:text-sm xl:text-base">
                Forgot Password?
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
