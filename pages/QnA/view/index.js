import { useRouter } from "next/router";

export default function QnAView() {
  const router = useRouter();
  return (
    <>
      <div>페이지 아이디 : {router.query.id}</div>
    </>
  );
}
