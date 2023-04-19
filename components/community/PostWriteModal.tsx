import { useEffect, useState } from "react";
import { useInput, useToggle } from "../../hooks";
import authRequest from "../../utils/request/authRequest";
import { Modal, Portal } from "../common/modal";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import MyPlan from "./MyPlan";
import { useMutation } from "@tanstack/react-query";
import { mCreatePost, mUpdatePost } from "@/utils/fetchFn/mutation/community";

interface PostWriteModalProps {
  img: string;
  planId?: number;
  hideModal: () => void;
  nickname: string;
  isFixed?: boolean; // 게시물 수정인지 여부
  postId?: number;
  refetchData?: () => void;
}

export default function PostWriteModal({
  img,
  planId,
  hideModal,
  nickname,
  isFixed,
  postId,
  refetchData,
}: PostWriteModalProps) {
  const contentsInput = useInput("", "게시물 내용을 입력해주세요");
  // const [planData, setPlanData] = useState<Array<any> | undefined>([]);
  // const [planIndex, setPlanIndex] = useState<number>(0);
  // const hasPlan = useToggle(false);

  const { mutate: createPost } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: mCreatePost,
    onSuccess: () => {
      refetchData();
    },
  });

  const { mutate: updatePost } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: mUpdatePost,
    onSuccess: () => {
      refetchData();
    },
  });

  const onClick = {
    submit: () => {
      if (isFixed) {
        updatePost({
          id: postId, // 게시물 인덱스
          img,
          content: contentsInput.value,
          planId,
        });
        alert("글수정이 완료되었습니다.");
      } else {
        createPost({
          img,
          content: contentsInput.value,
          planId,
        });
        alert("글작성이 완료되었습니다.");
      }
      hideModal();
      contentsInput.onChange("");
    },
  };
  // const check = () => {
  //   let result = false;
  //   if (!contents.value) {
  //     alert("글을 작성해주세요.");
  //     return result;
  //   }
  //   if (hasPlan.value) {
  //     planId = null;
  //   } else {
  //     planId = null;
  //   }
  //   return !result;
  // };

  // useEffect(() => {
  //   authRequest
  //     .get(`/plan/all/${planIndex}`)
  //     .then((res) => {
  //       setPlanData(res.data.plans);
  //       setPlanIndex(res.data.plans.length - 1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // 태그 데이터 정렬 부분 " ,"

  // let planImg = "/assets/main-img.png";
  // let plan_travels = planData[planIndex]?.travels;
  // let travels_length = 0;
  // for (let key in plan_travels) {
  //   if (plan_travels.hasOwnProperty(key)) {
  //     travels_length++;
  //   }
  // }
  // for (let i = 0; i <= travels_length; i++) {
  //   if (plan_travels) {
  //     if (plan_travels[i]?.destination.firstimage) {
  //       planImg = plan_travels[i].destination.firstimage;
  //       break;
  //     }
  //   }
  // }
  return (
    <>
      <Portal qs={"#__next"}>
        <Modal hide={hideModal}>
          <Modal.Header hide={hideModal} />
          <div className="h-fit">
            <div className=" border-0 py-2 text-center text-xl font-black">
              <label>게시글 작성</label>
            </div>
            {/* 디바이더 */}
            <div className="h-2">
              <p className="w-full border-t"></p>
            </div>
            <div className="flex ">
              <div className=" w-full justify-around">
                <div className="flex ">
                  <div className="flex h-auto w-full items-center space-x-3 p-2">
                    <FaUserCircle
                      className="cursor-pointer"
                      size={40}
                      onClick={() => {
                        console.log("프로필");
                      }}
                    />
                    <span className="cursor-pointer">{nickname}</span>
                  </div>
                </div>
                {/* 게시물 내용 입력 */}
                <div className="w-full">
                  <textarea
                    className="w-full resize-none  rounded-md px-2 py-2 text-lg outline-none"
                    rows={10}
                    {...contentsInput}
                  />
                </div>
                {/* plan 선택 */}
                {/* <div className="flex w-full justify-end">
                  {hasPlan.value ? (
                    <FcRemoveImage
                      size={40}
                      onClick={(e) => {
                        hasPlan.onClick();
                      }}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FcAddImage
                      size={40}
                      onClick={(e) => {
                        hasPlan.onClick();
                      }}
                      className="cursor-pointer"
                    />
                  )}
                </div> */}
                {/* {hasPlan.value && (
                  <div className="flex items-center">
                    <div
                      className="cursor-pointer p-2"
                      onClick={() => {
                        if (planIndex < planData.length - 1) {
                          setPlanIndex(planIndex + 1);
                        }
                      }}
                    >
                      <MdOutlineArrowBackIosNew />
                    </div>
                    <MyPlan
                      planData={planData}
                      planIndex={planIndex}
                      planImg={""}
                    />
                    <div
                      className="cursor-pointer p-2"
                      onClick={() => {
                        if (planIndex > 0) {
                          setPlanIndex(planIndex - 1);
                        }
                      }}
                    >
                      <MdOutlineArrowForwardIos />
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <Modal.Footer>
              <button
                onClick={onClick.submit}
                className="h-10 flex-1 rounded-md bg-sky-600 text-lg font-bold text-white hover:bg-sky-500"
              >
                완료
              </button>
            </Modal.Footer>
          </div>
        </Modal>
      </Portal>
    </>
  );
}
