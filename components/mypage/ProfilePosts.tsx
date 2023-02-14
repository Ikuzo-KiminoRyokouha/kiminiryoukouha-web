import ThreadCard from "components/ThreadCard";

interface Props {
  arr: any;
}

export default function ProfilePosts({ arr }: Props) {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-2/3 pt-10">
          {arr.map(() => {
            return (
              <div className="py-5">
                <ThreadCard pokemon={undefined} onClick={() => {}} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
