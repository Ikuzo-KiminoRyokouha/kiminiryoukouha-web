import { getTodayTreavel } from "@/utils/fetchFn/query/chatBot";
import { useQuery } from "@tanstack/react-query";
import useChatBot from "hooks/useChatBot";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

export const TodayTravel = () => {
  const { updateClearTravel, deleteTravel } = useChatBot();
  const { data, refetch } = useQuery(["getTodayTreavel"], getTodayTreavel);
  // const travels = useMemo(() => data?.data.travels, [data]);
  const travels = data?.data.travels;

  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const updateBottonOnclick = (travelId) => {
    updateClearTravel(travelId);
    setUpdateModal(() => {
      return !updateModal;
    });
  };

  const deleteBottonOnclick = (travelId) => {
    deleteTravel(travelId);
    setDeleteModal(() => {
      return !deleteModal;
    });
    // handleRefresh();
  };
  return (
    <div style={{ display: "block" }}>
      <Holder>
        <h2 style={{ textAlign: "center", marginBottom: "12px" }}>
          本日の旅程
        </h2>
        <TravelsHolder>
          {travels?.map((travel) => {
            return (
              <TravelHolder>
                <TravelDes>
                  {travel.destination.title}
                  <br />
                  完了：
                  {travel.clear === true ? (
                    <span style={{ color: "blue" }}>完了</span>
                  ) : (
                    <>
                      <span style={{ color: "red" }}>未完成</span>
                      <br />
                      <Button
                        onClick={() => {
                          updateBottonOnclick(travel.id);
                        }}
                      >
                        完了
                      </Button>

                      <Button onClick={() => deleteBottonOnclick(travel.id)}>
                        削除
                      </Button>
                    </>
                  )}
                </TravelDes>
                <TravelImg src={travel.destination.firstimage}></TravelImg>
              </TravelHolder>
            );
          })}
        </TravelsHolder>
      </Holder>
      {deleteModal == true ? (
        <>
          <Modal>
            削除 完了
            <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
          </Modal>
        </>
      ) : null}
      {updateModal == true ? (
        <>
          <Modal>
            修正 完了
            <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

const Holder = styled.div`
  margin: 0, 10%;
  color: black;
`;

const TravelsHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TravelHolder = styled.div`
  margin: 5px;
`;

const TravelDes = styled.div`
  text-align: center;
`;

const TravelImg = styled.img`
  margin: 5%;
  margin: 5px 0;
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const Button = styled.button`
  background-color: #0284c7;
  color: white;
  padding: 2px;
  border-radius: 5px;

  margin: 5px;
`;

const Modal = styled.div`
  color: black;
  font-size: 10px;
  text-align: center;
  padding: 5px;
  border-radius: 12px;
  border: 1px solid #0284c7;
`;

const RefreshButton = styled.button`
  background-color: #0284c7;
  color: white;
  padding: 2px;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  margin: 0, auto;
`;
