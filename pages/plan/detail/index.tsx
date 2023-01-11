import PlanPlaceCard from "../../../components/plan/PlanPlaceCard";
import SideBar from "../../../components/plan/SideBar";

export default function PlanDetail() {
  return (
    <div className="max-w-8xl mx-auto mb-[53px] flex max-h-full w-full flex-1 lg:mb-0">
      <SideBar />
      <div className="basis-4/5 space-y-4 p-4">
        <div className="text-xl font-semibold">계획 제목</div>
        <div className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque est
          reiciendis tempore perferendis voluptates error libero neque, vitae
          nulla iure quibusdam, culpa iusto obcaecati ducimus vel repudiandae,
          ea repellendus facilis.
        </div>
        <div className="flex w-full flex-col items-end space-y-3">
          <p>남은 일정 : 1개</p>
          <p>예산 : 100000</p>
        </div>
        <PlanPlaceCard />
        <PlanPlaceCard />
      </div>
    </div>
  );
}
