import { useRouter } from "next/router";

export default function FnAView() {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <div>페이지 아이디 : {router.query.id}</div>
    </>
  );
}
