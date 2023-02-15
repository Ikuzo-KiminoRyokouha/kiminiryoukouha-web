import ThreadCard from "components/ThreadCard";

export default function ProfilePosts() {
  function test() {
    let testArr = [];
    for (let i = 0; i < 10; i++) {
      testArr.push(
        <div className="py-5">
          <ThreadCard pokemon={undefined} onClick={() => {}} />
        </div>
      );
    }
    return testArr;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">{test()}</div>
      </div>
      {/* <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">
          {arr.map(() => {
            return (
              <div className="py-5">
                <ThreadCard pokemon={undefined} onClick={() => {}} />
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
}
