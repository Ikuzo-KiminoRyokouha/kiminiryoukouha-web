import Head from "next/head";
import useInput from "../hooks/useInput";
import Link from "next/link";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";

export default function LoginPage() {
  const id = useInput("", "id");
  const pwd = useInput("", "password");
  return (
    <div className="mx-auto flex flex-col items-center justify-center pb-20 md:h-screen">
      <Head>
        <title>Login</title>
        <meta name="description" content="login page" />
      </Head>
      <div className="w-1/4">
        <div>
          <h1 className="p-1 pb-5 text-4xl">Sign in</h1>
        </div>
        <form className="flex flex-col ">
          <MyInput {...id} type="email" />
          <MyInput {...pwd} type="password" />

          <div className="flex items-center ">
            <div>
              <input type="checkbox" id="remember" className="h-4 w-4" />
            </div>
            <div className="pb-1">
              <label for="remember" className=" pl-2 text-lg">
                remember me
              </label>
            </div>
          </div>
          <MyButton name="Sign In" />

          <div className="flex justify-between">
            <Link href="signUp" legacyBehavior>
              <a className="text-sky-600">Create Account</a>
            </Link>
            <Link href="findPwd" legacyBehavior>
              <a className="text-sky-600">Forgot Password?</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
