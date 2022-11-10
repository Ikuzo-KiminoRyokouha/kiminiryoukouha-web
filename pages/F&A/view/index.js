import { useRouter } from "next/router";

export default function qwe() {
  const router = useRouter();
  return (
    <>
      <div>F&A View 페이지 {router.query.id}</div>
    </>
  );
}
