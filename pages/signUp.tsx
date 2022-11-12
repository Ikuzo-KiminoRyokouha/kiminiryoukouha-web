import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import useInput from "../hooks/useInput";
import { mSignUp } from "../utils/fetchFn/mutation/user";

export default function SignUp() {
  const router = useRouter();

  const { mutate } = useMutation(["signUp"], mSignUp, {
    onSuccess() {},
  });

  const id = useInput("", "id");
  const pwd = useInput("", "password");
  const checkPwd = useInput("", "password Confirm");
  const nick = useInput("", "nickname");

  const onSubmit = () => {
    mutate({
      email: id.value,
      name: nick.value,
      password: pwd.value,
      role: "user",
    });
  };

  return (
    <div className="max-w-8xl mx-auto flex w-full flex-col items-center justify-center pb-20 md:h-screen">
      <Head>
        <title>SignUp</title>
        <meta name="description" content="SignUp page" />
      </Head>
      <div className="w-1/4">
        <div>
          <h1 className="p-1 pb-5 text-4xl">SignUp</h1>
        </div>
        <div className="flex flex-col ">
          <MyInput {...id} type="email" />
          <MyInput {...pwd} type="password" />
          <MyInput {...checkPwd} type="password" />
          <MyInput {...nick} type="text" />
          <MyButton onClick={onSubmit} name="Sign Up" />
        </div>
      </div>
    </div>
  );
}
