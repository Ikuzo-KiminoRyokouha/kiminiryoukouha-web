import IProps from "@/types/props.interface";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { HiPencil } from "react-icons/hi";
import { Modal, Portal } from "./modal";
import useInput from "hooks/useInput";
import useProfile from "hooks/useProfile";
import ProfilePlan from "components/mypage/ProfilePlan";
import ProfilePosts from "components/mypage/ProfilePosts";
import {
  ButtonProps,
  ContentsProps,
  FixProfileProps,
  FollwerFollweeInfoProps,
  NavButtonProps,
  NavProps,
  ShowFollowerProps,
  ShowFollowingProps,
  UseProfileProps,
} from "@/types/profile.interface";
import { useRouter } from "next/router";
import { binarySearch } from "@/utils/math";

const ProfileContext = createContext<UseProfileProps>({
  writeDescription: () => {},
  userFollow: () => {},
  userUnfollow: () => {},
  userInfo: undefined,
  userInfoRefetch: undefined,
  userFollowee: undefined,
  getUserFolloweeRefetch: undefined,
  userFollower: undefined,
  getUserFollowerRefetch: undefined,
  planInfo: undefined,
  communityPosts: undefined,
  nickname: "",
  myName: [],
  isFollow: { value: false },
  onClick: {},
  isFixing: { value: false },
  isShowFollowing: { value: false },
  isShowFollower: { value: false },
  followerInfo: [],
  followerNum: 0,
  followingNum: 0,
  description: "",
  followingInfo: [],
});

export default function Profile({ children }: IProps) {
  const profileData = useProfile();
  return (
    <ProfileContext.Provider value={{ ...profileData }}>
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

Profile.Info = ({ isMyProfile }) => {
  const {
    nickname,
    writeDescription,
    userInfoRefetch,
    myName,
    isFollow,
    onClick,
    isFixing,
    isShowFollower,
    isShowFollowing,
    followerInfo,
    followerNum,
    followingNum,
    description,
    followingInfo,
  } = useContext(ProfileContext);

  useEffect(() => {
    // 팔로워 중 로그인한 유저가 있는지 비교해서 팔로우 언팔로우 설정
    binarySearch(followerInfo, myName[0]?.nickname)
      ? isFollow.setTrue()
      : isFollow.setFalse();
  }, [followerInfo, myName[0]?.nickname]);

  return (
    <div className="flex h-full w-10/12 flex-col py-10">
      {/* 상단 닉네임, 팔로우정보 */}
      <div className="flex h-1/3 w-full justify-between">
        <div className="w-5/6">
          {/* 닉네임 */}
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-4xl">{nickname}</span>
              {/* 로그인한 유저 프로필 수정버튼 */}
              {isMyProfile === true && (
                <HiPencil
                  className="cursor-pointer pl-3 pt-2"
                  size={35}
                  onClick={onClick.fixProfile}
                />
              )}
            </div>
            <div className="flex pt-2">
              {/* 팔로우 팔로워 */}
              {["following", "follower"].map((el, idx) => {
                return (
                  <div className="flex" key={idx}>
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
        {/* 팔로우 언팔로우 버튼 */}
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
      {/* 프로필 수정 모달 */}
      {isFixing.value && (
        <FixProfile
          hide={isFixing.setFalse}
          description={description}
          writeDescription={writeDescription}
          userInfoRefetch={userInfoRefetch}
        />
      )}
      {/* 팔로워 정보 모달 */}
      {isShowFollower.value && (
        <ShowFollower
          hide={isShowFollower.setFalse}
          followerInfo={followerInfo}
        />
      )}
      {/* 팔로잉 정보 모달 */}
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

Profile.Contents = ({ navPage }: ContentsProps) => {
  const { planInfo, communityPosts } = useContext(ProfileContext);
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

/**
 * 프로필 수정 모달
 */
function FixProfile({
  hide,
  description,
  writeDescription,
  userInfoRefetch,
}: FixProfileProps) {
  const myDescription = useInput(description);

  // 프로필 사진 올리기
  const submitImage = () => {
    // console.log("submitImage function launched");
  };

  const submitDescription = () => {
    // console.log("submitDescription function launched");
    try {
      writeDescription(
        { description: myDescription.value },
        {
          onSuccess: async () => {
            await userInfoRefetch();
          },
        }
      );
      hide();
    } catch (err) {
      // console.log("submitDescription function err : " + err);
    }
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
                イメージアップロ-ド
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <span className="text-lg font-semibold">説明</span>
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
              作成
            </button>
          </div>
        </Modal>
      </Portal>
    </>
  );
}

/**
 * 팔로잉 정보 모달
 */
function ShowFollowing({ hide, followingInfo }: ShowFollowingProps) {
  // console.log("followingInfo123", followingInfo);
  return (
    <>
      <Portal qs="#__next">
        <Modal hide={hide}>
          <Modal.Header hide={hide} />
          <div>フォロー</div>
          {!followingInfo.length && <div>まだフォローされていません。</div>}
          <FollowerFolloweeInfo info={followingInfo} hide={hide} />
        </Modal>
      </Portal>
    </>
  );
}

/**
 * 팔로워 정보 모달
 */
function ShowFollower({ hide, followerInfo }: ShowFollowerProps) {
  // console.log("followerInfo123", followerInfo);
  return (
    <>
      <Portal qs="#__next">
        <Modal hide={hide}>
          <Modal.Header hide={hide} />
          <div>フォロワー</div>
          {!followerInfo.length && <div>まだフォロワーがありません。</div>}
          <FollowerFolloweeInfo info={followerInfo} hide={hide} />
        </Modal>
      </Portal>
    </>
  );
}

function FollowerFolloweeInfo({ info, hide }: FollwerFollweeInfoProps) {
  // console.log("info123", info);

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
        {!info && <div>無し</div>}
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
 *  - 계획중인여행, 내 게시물 backend 연결 + infinite scroll 구현
 *  - 내계획, 내 게시물 -> 백 수정되면 끝
 *  - 사진 업로드
 */
