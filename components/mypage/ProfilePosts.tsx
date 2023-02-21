import { CommunityPostsProps } from "@/types/profile.interface";
import ThreadCard from "components/ThreadCard";

interface ProfilePostsProps {
  communityPosts?: [CommunityPostsProps];
}

export default function ProfilePosts({ communityPosts }: ProfilePostsProps) {
  // console.log("communityPosts", communityPosts);
  // console.log("myCommunityPosts", myCommunityPosts);
  console.log("communityPosts123", communityPosts);

  return (
    <>
      {/* <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">{test()}</div>
      </div> */}
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">
          {!communityPosts.length && (
            <div className="flex min-h-[8rem] items-center justify-center">
              <span className="text-2xl font-semibold">
                There isn't any Posts yet
              </span>
            </div>
          )}
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
