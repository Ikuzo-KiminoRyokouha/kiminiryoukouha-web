import {
  CommunityPostsProps,
  MyCommunityPostsProps,
} from "@/types/profile.interface";
import ThreadCard from "components/ThreadCard";

interface ProfilePostsProps {
  communityPosts?: [CommunityPostsProps];
  myCommunityPosts?: [MyCommunityPostsProps];
}

export default function ProfilePosts({
  communityPosts,
  myCommunityPosts,
}: ProfilePostsProps) {
  // console.log("communityPosts", communityPosts);
  // console.log("myCommunityPosts", myCommunityPosts);
  function test() {
    let testArr = [];
    for (let i = 0; i < 10; i++) {
      testArr.push(
        <div className="py-5">
          <ThreadCard
            pokemon={undefined}
            onClick={() => {}}
            content={undefined}
            createdAt={undefined}
            id={undefined}
            img={undefined}
            plan={undefined}
          />
        </div>
      );
    }
    return testArr;
  }

  return (
    <>
      {/* <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">{test()}</div>
      </div> */}
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">
          {communityPosts.map((el) => {
            console.log("el456", el);
            return (
              <div className="py-5">
                <ThreadCard
                  pokemon={undefined}
                  onClick={() => {}}
                  content={el.content}
                  createdAt={el.createdAt}
                  id={el.id}
                  img={el.img}
                  plan={el.plan}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
