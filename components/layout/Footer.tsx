/**
 * @description 웹 상에서 보이는 Footer 컴포넌트 입니다.
 */
export default function Footer() {
  return (
    <div className=" hidden h-36 bg-gray-200 lg:block">
      <div className="flex h-full flex-col items-center justify-center space-y-3 text-gray-600">
        <p>AR/AIベースのオールインワン旅行プラットフォーム あなたの旅行は？</p>
        <p>CREATED BY イクゾ　2022-11-06</p>
        {/* <p>Contact : 대충 이메일 주소@이메일.com</p> */}
      </div>
    </div>
  );
}
