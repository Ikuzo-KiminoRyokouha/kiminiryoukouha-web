import Head from "next/head";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import useInput from "../hooks/useInput";

export default function SignUp() {
  const id = useInput("");
  const pwd = useInput("");
  const checkPwd = useInput("");
  const nick = useInput("");

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
          <MyInput {...id} type="email" placeholder="id" />
          <MyInput {...pwd} type="password" placeholder="password" />
          <MyInput
            {...checkPwd}
            type="password"
            placeholder="password confirm"
          />
          <MyInput {...nick} type="text" placeholder="nickname" />
          <MyButton name="Sign Up" />
        </form>
      </div>
    </div>
  );
}
