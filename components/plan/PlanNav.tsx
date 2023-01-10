import EachPlanNav from "./EachPlanNav";

export default function PlanNav() {
  interface eachPlan {
    url: string;
    isClicked: boolean;
    place: string;
  }

  const test1: eachPlan = {
    url: "/plan/new/choose",
    isClicked: true,
    place: "GyeongJu",
  };
  const test2: eachPlan = {
    url: "/plan/new/choose",
    isClicked: false,
    place: "準備中",
  };

  return (
    <>
      <div className="flex h-full w-1/4 flex-col ">
        {/* 네비 한칸 */}
        <EachPlanNav {...test1} />
        <EachPlanNav {...test2} />
        <EachPlanNav {...test2} />
      </div>
    </>
  );
}
