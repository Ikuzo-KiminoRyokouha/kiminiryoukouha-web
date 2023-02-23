import IProps from "@/types/props.interface";
import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { HiPencil } from "react-icons/hi";
import { Modal, Portal } from "./modal";
import useToggle from "hooks/useToggle";
import useInput from "hooks/useInput";
import useProfile from "hooks/useProfile";
import ProfilePlan from "components/mypage/ProfilePlan";
import ProfilePosts from "components/mypage/ProfilePosts";
import {
  ButtonProps,
  ContentsProps,
  FixProfileProps,
  FollowingFollowerInfo,
  FollwerFollweeInfoProps,
  InfoProps,
  NavButtonProps,
  NavProps,
  ShowFollowerProps,
  ShowFollowingProps,
} from "@/types/profile.interface";
import { useRouter } from "next/router";
import { useUser } from "@/utils/client";
import { useQueryClient } from "@tanstack/react-query";
import { getUserFollower } from "@/utils/fetchFn/query/profile";

const ProfileContext = createContext<{
  arr: Array<number>;
}>(undefined);

export default function Profile({ children }: IProps) {
  const arr = [, , , , , , , , , , , , , ,].fill(0);

  return (
    <ProfileContext.Provider value={{ arr }}>
      <div className="flex w-full flex-1">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col">{children}</div>
      </div>
    </ProfileContext.Provider>
  );
}

Profile.Header = ({ children }: IProps) => {
  return <div className="flex h-1/3 min-h-[286px]">{children}</div>;
};

Profile.Body = ({ children }: IProps) => {
  return <div className="flex h-full flex-col">{children}</div>;
};

Profile.Image = () => {
  return (
    <div className="flex h-full w-1/5 justify-center py-10">
      <div className="relative hidden w-4/5 overflow-hidden rounded after:block after:pb-[100%] md:block">
        <Image src={"/assets/main-img.png"} layout={"fill"} />
      </div>
    </div>
  );
};

Profile.Info = ({
  nickname,
  description,
  followerNum,
  followingNum,
  isMyProfile,
  followerInfo,
  followingInfo,
  getUserFolloweeRefetch,
  getUserFollowerRefetch,
  userInfoRefetch,
}: InfoProps) => {
  const { writeDescription, userFollow, userUnfollow } = useProfile();
  // console.log("isMyProfile", isMyProfile);
  // HiPencil 아이콘 누를시 모달창 띄워주기 위한 state
  const isFixing = useToggle(false);
  // follower 누를시 모달창 띄워주기 위한 state
  const isShowFollower = useToggle(false);
  // following 누를시 모달창 띄워주기 위한 state
  const isShowFollowing = useToggle(false);
  // follow버튼을 보여줄지 unfollow버튼을 보여줄지 결정하는 state
  const isFollow = useToggle(false);

  const myName = useUser();
  console.log("myName", myName[0]?.nickname);
  console.log("followerInfo", followerInfo);
  console.log("followingInfo", followingInfo);
  console.log("followerNum", followerNum);
  console.log("followingNum", followingNum);
  console.log("nickname", nickname);

  const router = useRouter();
  console.log("router234", router.query?.username);

  // 이진탐색
  const binarySearch = function (arr, target) {
    if (arr === undefined) return false;
    let start = 0;
    let end = arr.length - 1;
    let mid;

    while (start <= end) {
      mid = parseInt(String((start + end) / 2));

      if (target == arr[mid].nickname) {
        return true;
      } else {
        if (target < arr[mid].nickname) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    binarySearch(followerInfo, myName[0]?.nickname)
      ? isFollow.setTrue()
      : isFollow.setFalse();
  }, [followerInfo, myName[0]?.nickname]);

  console.log("isFollow.value", isFollow.value);

  const onClick = {
    writeDescription: () => {
      // 닉네임옆 연필 아이콘 누를시 모달창띄워주기
      console.log("writeDescription function launched");
      isFixing.setTrue();
    },
    showFollowing: () => {
      // following 클릭시 팔로우중인 사람들 모달창으로 띄워줌
      console.log("showFollowing function launched");
      isShowFollowing.setTrue();
    },
    showFollower: () => {
      // follower클릭시 팔로워들 모달창으로 띄워줌
      console.log("showFollower function launched");
      isShowFollower.setTrue();
    },
    followUser: () => {
      // 버튼에 들어가는 유저 팔로우 함수
      console.log(
        `followUser function launched follow ${router.query?.username}`
      );
      try {
        userFollow(
          {
            targetId: Number(router.query?.username),
          },
          {
            onSuccess: async () => {
              await getUserFolloweeRefetch();
              await getUserFollowerRefetch();
              isFollow.setTrue();
            },
          }
        );
      } catch (err) {
        console.error("followUser function launched" + err);
      }
    },
    unfollowUser: () => {
      // 유저 언팔 함수
      console.log("unfollowUser function launched");
      userUnfollow(
        {
          targetId: Number(router.query?.username),
        },
        {
          onSuccess: async () => {
            await getUserFolloweeRefetch();
            await getUserFollowerRefetch();
            isFollow.setFalse();
          },
        }
      );
    },
  };

  return (
    <div className="flex h-full w-10/12 flex-col py-10">
      {/* 상단 닉네임, 팔로우정보 */}
      <div className="flex h-1/3 w-full justify-between">
        <div className="w-5/6">
          {/* 닉네임 */}
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-4xl">{nickname}</span>
              {isMyProfile === true && (
                <HiPencil
                  className="cursor-pointer pl-3 pt-2"
                  size={35}
                  onClick={onClick.writeDescription}
                />
              )}
            </div>
            <div className="flex pt-2">
              {/* 팔로우 팔로워 */}
              {["following", "follower"].map((el) => {
                return (
                  <div className="flex">
                    <span
                      className="text-md cursor-pointer pr-1 font-semibold leading-8"
                      onClick={
                        (el === "follower" && onClick.showFollower) ||
                        onClick.showFollowing
                      }
                    >
                      {el === "follower" && followerNum}
                      {el === "following" && followingNum}
                    </span>
                    <span
                      className="text-md cursor-pointer pr-3 leading-8"
                      onClick={
                        (el === "follower" && onClick.showFollower) ||
                        onClick.showFollowing
                      }
                    >
                      {el}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isFollow.value && (
          <Profile.Button
            title={"unfollow"}
            onClick={onClick.unfollowUser}
            isMyProfile={isMyProfile}
          />
        )}
        {!isFollow.value && (
          <Profile.Button
            title={"follow"}
            onClick={onClick.followUser}
            isMyProfile={isMyProfile}
          />
        )}
      </div>
      {/* 하단 description */}
      <div className="flex h-2/3 w-full flex-col">
        <div className="h-1/6 w-5/6"></div>
        <div className="h-5/6 w-5/6 ">
          <div className="line-clamp-5 block h-full w-11/12 overflow-hidden pt-3">
            <span className="text-lg leading-5">{description}</span>
          </div>
        </div>
      </div>
      {isFixing.value && (
        <FixProfile
          hide={isFixing.setFalse}
          description={description}
          writeDescription={writeDescription}
          userInfoRefetch={userInfoRefetch}
        />
      )}
      {isShowFollower.value && (
        <ShowFollower
          hide={isShowFollower.setFalse}
          followerInfo={followerInfo}
        />
      )}
      {isShowFollowing.value && (
        <ShowFollowing
          hide={isShowFollowing.setFalse}
          followingInfo={followingInfo}
        />
      )}
    </div>
  );
};

Profile.Button = ({ title, onClick, isMyProfile }: ButtonProps) => {
  return (
    <>
      {!isMyProfile && (
        <div className="px-10">
          {/* 팔로우상태면 언팔로우 뜨게 */}
          <button
            className={`w-24 rounded ${
              title === "follow" ? "bg-sky-600" : "bg-red-500"
            } p-2 text-white`}
            onClick={onClick}
          >
            <span className="text-lg">{title}</span>
          </button>
        </div>
      )}
    </>
  );
};

Profile.Nav = ({ children, navItemWidth, navPage }: NavProps) => {
  return (
    <nav className="m-2">
      <div className="mx-2 flex">{children}</div>
      {/* 라인 */}
      <div className="mx-4 w-full border-2 border-slate-200">
        <ActionBar navItemWidth={navItemWidth} navPage={navPage} />
      </div>
    </nav>
  );
};

Profile.Contents = ({ navPage, planInfo, communityPosts }: ContentsProps) => {
  // console.log("communityPosts", communityPosts);
  // console.log("myCommunityPosts", myCommunityPosts);

  return (
    <div className="mx-auto ml-8 w-full">
      {/* 계획중인여행 */}
      {navPage === "계획중인여행" && <ProfilePlan planInfo={planInfo} />}
      {/* 내 게시물 */}
      {navPage === "내 게시물" && (
        <ProfilePosts communityPosts={communityPosts} />
      )}
    </div>
  );
};

Profile.NavButton = ({ title, onClick, setNavItemWidth }: NavButtonProps) => {
  const ref = useRef();

  useEffect(() => {
    const { width } = (ref.current as HTMLSpanElement).getClientRects()[0];
    setNavItemWidth((prev) => {
      const newObj = {};
      newObj[title] = width;
      return { ...prev, ...newObj };
    });
  }, []);
  return (
    <span ref={ref} className="m-2 cursor-pointer text-xl" onClick={onClick}>
      {title}
    </span>
  );
};

// 프로필 수정 모달에 들어가야할 거 description 수정, 프로필 이미지 수정
function FixProfile({
  hide,
  description,
  writeDescription,
  userInfoRefetch,
}: FixProfileProps) {
  const myDescription = useInput(description);

  // 프로필 사진 올리기
  const submitImage = () => {
    console.log("submitImage function launched");
  };

  const submitDescription = () => {
    console.log("submitDescription function launched");
    writeDescription(
      { description: myDescription.value },
      {
        onSuccess: async () => {
          await userInfoRefetch();
        },
      }
    );
    hide();
  };

  return (
    <>
      <Portal qs={"#__next"}>
        <Modal hide={hide}>
          <Modal.Header hide={hide} />
          <div className="flex w-full">
            <div className="h-40 w-40">
              <Modal.Image src="/assets/main-img.png" />
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                className="rounded bg-sky-600 p-2 text-lg font-semibold text-white"
                onClick={submitImage}
              >
                Upload Image
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <span className="text-lg font-semibold">Description</span>
            </div>
            <div className="relative mt-4 min-h-[10rem] w-full rounded border-2 border-slate-300">
              <textarea
                className="absolute inset-0 w-full resize-none border-slate-300 p-1 leading-6"
                {...myDescription}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="h- min-h-[2.5rem] w-full rounded bg-sky-600 text-lg font-semibold text-white"
              onClick={submitDescription}
            >
              Done
            </button>
          </div>
        </Modal>
      </Portal>
    </>
  );
}

function ShowFollowing({ hide, followingInfo }: ShowFollowingProps) {
  console.log("followingInfo123", followingInfo);
  return (
    <>
      <Portal qs="#__next">
        <Modal hide={hide}>
          <Modal.Header hide={hide} />
          <div>this is showFollowing</div>
          {!followingInfo.length && <div>There isn't any following yet...</div>}
          <FollowerFollweeInfo info={followingInfo} hide={hide} />
        </Modal>
      </Portal>
    </>
  );
}

function ShowFollower({ hide, followerInfo }: ShowFollowerProps) {
  console.log("followerInfo123", followerInfo);
  return (
    <>
      <Portal qs="#__next">
        <Modal hide={hide}>
          <Modal.Header hide={hide} />
          <div>this is showFollower</div>
          {!followerInfo.length && <div>There isn't any following yet...</div>}
          <FollowerFollweeInfo info={followerInfo} hide={hide} />
        </Modal>
      </Portal>
    </>
  );
}

function FollowerFollweeInfo({ info, hide }: FollwerFollweeInfoProps) {
  console.log("info123", info);

  const router = useRouter();
  return (
    <>
      <div className="flex flex-col">
        {info &&
          info.map((el) => {
            return (
              <div className="flex items-center border-b-2 border-b-slate-200 py-3">
                <div className="relative h-10 w-10">
                  <Image src={"/assets/main-img.png"} layout={"fill"} />
                </div>
                <div className="pl-5">
                  <span
                    className="cursor-pointer text-lg font-semibold leading-8"
                    onClick={() => {
                      hide();
                      router.push({
                        pathname: `/profile/${el.id}`,
                      });
                    }}
                  >
                    {el.nickname}
                  </span>
                </div>
              </div>
            );
          })}
        {!info && <div>없음</div>}
      </div>
    </>
  );
}

const ActionBar = styled.div<{
  navItemWidth: { [key: string]: number };
  navPage: string;
}>`
  width: ${(props) => props.navItemWidth[props.navPage] + "px"};
  border-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgb(186 230 253 / var(--tw-border-opacity));
  margin-left: ${(props) =>
    Array.from(Object.keys(props.navItemWidth))
      .map((el, idx) => {
        if (
          idx >=
          Array.from(Object.keys(props.navItemWidth)).indexOf(props.navPage)
        )
          return 0;
        return props?.navItemWidth[el] + 16;
      })
      .reduce((partialSum, a) => partialSum + a, 0) + "px"};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

/**
 * mypage 구현해야 할 것
 *
 *  - mypage 보단 profile이 더 적합한 단어라고 생각됨 mypage -> profile 싹다 고치기 -> 완
 *  - 다른 사람의 프로필에 접근하고 싶을 때 -> 백엔드 고쳐서 나중에 follower, followee 연결만 하면 완
 *  - following, follower 눌렀을때 모달로 정보 표시 -> 완
 *  - follow 유무에 따라 follow버튼 또는 unfollow 버튼
 *  - Profile.Contents arr 오류 수정 -> 완
 *  - type 지정 -> 완
 *  - reactQuery로 받아올때 잠깐의 시간동안 로딩창 or 로딩 애니메이션 만들어주기 -> 나중에 ssr로 바꿀계획인데 일다 컴포넌트 만들어놓음 component/commmon/LoadingCircle 완
 *  - 계획중인여행, 내 게시물 backend 연결 + infinite scroll 구현
 *  - 연필 -> 완
 *  - 내계획, 내 게시물 -> 백 수정되면 끝
 */
