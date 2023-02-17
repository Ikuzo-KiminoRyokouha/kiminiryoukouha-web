import DecidedPlanCard from "components/plan/DecidedPlanCard";

interface Props {
  arr: any;
}

export default function ProfilePlan({ arr }: Props) {
  return (
    <>
      <div className="grid  grid-cols-1 gap-y-10 pt-10 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {arr.map(() => {
          return (
            <DecidedPlanCard img={""} title={""} days={""} description={""} />
          );
        })}
      </div>
      <div className="h-10 w-full"></div>
    </>
  );
}
