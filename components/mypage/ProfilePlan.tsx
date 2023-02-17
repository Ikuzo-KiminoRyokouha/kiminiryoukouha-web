import DecidedPlanCard from "components/plan/DecidedPlanCard";

export default function ProfilePlan({ planInfo }) {
  console.log("planInfo", planInfo);

  function test() {
    let testArr = [];
    for (let i = 0; i < 10; i++) {
      testArr.push(
        <DecidedPlanCard img={""} title={""} days={""} description={""} />
      );
    }
    return testArr;
  }
  return (
    <>
      {/* <div className="grid  grid-cols-1 gap-y-10 pt-10 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {test()}
      </div>
      <div className="h-10 w-full"></div> */}
      <div className="grid  grid-cols-1 gap-y-10 pt-10 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {planInfo &&
          planInfo.map((el) => {
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
          })}
      </div>
      <div className="h-10 w-full"></div>
    </>
  );
}
