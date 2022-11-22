import Head from "next/head";
import useInput from "../hooks/useInput";
import Link from "next/link";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { useMutation } from "@tanstack/react-query";
import { mLogin } from "../utils/fetchFn/mutation/user";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const { mutate } = useMutation(["login"], mLogin, {
    onSuccess() {
      router.push("/");
    },
    onError(error) {
      alert("something went wrong");
      console.log(error);
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
      <div className="flex h-full flex-col items-center justify-center md:w-1/4">
        <div>
          <h1 className="p-1 pb-5 text-4xl font-bold">Sign in</h1>
        </div>
        <div className="flex flex-col ">
          <MyInput {...id} type="email" />
          <MyInput {...pwd} type="password" />
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
          <MyButton onClick={onSubmit} name="Sign In" />

          <div className="flex justify-between">
            <Link href="signUp" legacyBehavior>
              <a className="text-xs text-sky-600 md:text-base">
                Create Account
              </a>
            </Link>
            <Link href="findPwd" legacyBehavior>
              <a className="text-xs text-sky-600 md:text-base">
                Forgot Password?
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
