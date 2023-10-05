import { useState } from "react";
import { useInput, useToggle } from "../../hooks";
import { Modal, Portal } from "../common/modal";
import { FcAddImage } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mCreatePost, mUpdatePost } from "@/utils/fetchFn/mutation/community";
import { getPlans } from "@/utils/fetchFn/query/profile";

interface PostWriteModalProps {
    img: string;
    planId: number | null;
    hideModal: () => void;
    nickname: string;
    isFixed: boolean; // 게시물 수정인지 여부
    postId?: number;
    refetchData: () => void;
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
    const contentsInput = useInput("", "内容をご入力ください。");
    const showPlan = useToggle(false);
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

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

    const { data: myPlanData } = useQuery(["getPlans", 1], getPlans);

    const submit = () => {
        if (isFixed) {
            if (!selectedPlan) {
                updatePost({
                    id: postId, // 게시물 인덱스
                    img,
                    content: contentsInput.value,
                    planId,
                });
            } else {
                updatePost({
                    id: postId, // 게시물 인덱스
                    img,
                    content: contentsInput.value,
                    planId: selectedPlan,
                });
            }
            alert("修正ができました。");
        } else {
            createPost({
                img: "",
                content: contentsInput.value,
                planId: selectedPlan,
            });
            alert("投稿が共有されました。");
        }
        hideModal();
        contentsInput.onChange("");
    };

    return (
        <>
            <Portal qs={"#__next"}>
                <Modal hide={hideModal}>
                    <Modal.Header hide={hideModal} />
                    <div className="h-fit">
                        <div className=" border-0 py-2 text-center text-xl font-black">
                            <label>投稿</label>
                        </div>
                        {/* 디바이더 */}
                        <div className="h-2 w-full border-t" />
                        <div className=" w-full justify-around">
                            <div className="flex h-auto w-full items-center space-x-3 p-2">
                                <FaUserCircle size={40} />
                                <span>{nickname}</span>
                            </div>
                            {/* 게시물 내용 입력 */}
                            <div className="relative w-full">
                                <textarea
                                    className="w-full resize-none  rounded-md px-2 py-2 text-lg outline-none"
                                    rows={10}
                                    {...contentsInput}
                                />
                                {showPlan.value && (
                                    <div className="z-10 h-fit w-full">
                                        {/* 마이플랜 가져와서 보여주기 */}
                                        <ul>
                                            {myPlanData &&
                                                myPlanData?.data?.plans?.map(
                                                    (plan, idx) => {
                                                        return (
                                                            <>
                                                                <PlanList
                                                                    idx={idx}
                                                                    plan={plan}
                                                                    setSelectedPlan={
                                                                        setSelectedPlan
                                                                    }
                                                                    key={
                                                                        plan.id
                                                                    }
                                                                />
                                                            </>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {/* plan 선택 */}
                            <div className="flex justify-end py-2">
                                <FcAddImage
                                    size={50}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        showPlan.onClick();
                                    }}
                                />
                            </div>
                        </div>
                        <Modal.Footer>
                            <button
                                onClick={submit}
                                className="h-10 flex-1 rounded-md bg-sky-600 text-lg font-bold text-white hover:bg-sky-500"
                            >
                                完了
                            </button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </Portal>
        </>
    );
}

function PlanList({ setSelectedPlan, plan, idx }) {
    const clicked = useToggle(false);
    return (
        <li
            className={`cursor-pointer py-1 text-lg ${
                clicked.value ? "text-sky-600" : ""
            }`}
            onClick={() => {
                clicked.onClick();
                setSelectedPlan(plan.id);
            }}
        >
            {String(idx + 1) + ". "}
            {plan.title}
        </li>
    );
}
