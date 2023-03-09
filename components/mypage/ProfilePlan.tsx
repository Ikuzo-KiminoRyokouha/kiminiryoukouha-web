import DecidedPlanCard from "components/plan/DecidedPlanCard";

export default function ProfilePlan({ planInfo }) {
  console.log("planInfo123", planInfo);

  return (
    <>
      {/* <div className="grid  grid-cols-1 gap-y-10 pt-10 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {test()}
      </div>
      <div className="h-10 w-full"></div> */}
      {planInfo?.data?.message === "not found any plan" && (
        <div className="flex min-h-[8rem] items-center justify-center pt-16">
          <span className="text-2xl font-semibold">
            There isn't any Plans yet
          </span>
        </div>
      )}
      <div className="grid  grid-cols-1 gap-y-10 pt-10 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {planInfo ? (
          planInfo?.data?.plans?.map((el) => {
            // console.log("el123", el);
            return (
              <DecidedPlanCard
                img={
                  el?.travels[0]?.destination?.firstimage ||
                  "/assets/error_img.png"
                }
                title={el.title}
                days={el.travels.length}
                description={""}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="h-10 w-full"></div>
    </>
  );
}
