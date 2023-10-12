import useChatBot from "hooks/useChatBot";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const UpdateTravel = ({ ...props }) => {
  const { createTravel } = useChatBot();
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    if (!isCreated) {
      createTravel({
        planId: props.planId,
        destinationId: props.steps["travel4-1"].metadata,
      });
      setIsCreated(true);
    }
  }, [isCreated]);

  return (
    <>
      <Holder>追加 完了!!</Holder>
    </>
  );
};

const Holder = styled.div`
  background-color: #848484;
  width: 80%;
  height: 100%;
  text-align: center;
  font-size: large;
  padding: 5px;
  border-radius: 0 12px 12px 12px;
`;
