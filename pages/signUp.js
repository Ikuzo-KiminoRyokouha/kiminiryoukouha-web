import Head from "next/head";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import useInput from "../hooks/useInput";

export default function SignUp() {
  const id = useInput("", "id");
  const pwd = useInput("", "password");
  const checkPwd = useInput("", "password Confirm");
  const nick = useInput("", "nickname");

  return (
    <div className="mx-auto flex flex-col items-center justify-center pb-20 md:h-screen">
      <Head>
        <title>SignUp</title>
        <meta name="description" content="SignUp page" />
      </Head>
      <div className="w-1/4">
        <div>
          <h1 className="p-1 pb-5 text-4xl">SignUp</h1>
        </div>
        <form className="flex flex-col ">
          <MyInput {...id} type="email" />
          <MyInput {...pwd} type="password" />
          <MyInput {...checkPwd} type="password" />
          <MyInput {...nick} type="text" />
          <MyButton name="Sign Up" />
        </form>
      </div>
    </div>
  );
}
