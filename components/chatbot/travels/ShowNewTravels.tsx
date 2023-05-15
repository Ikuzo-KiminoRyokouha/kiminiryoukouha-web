import RatingStar from "@/common/card/RatingStar";
import { AnimatePresence, motion } from "framer-motion";
import useChatBot from "hooks/useChatBot";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 80%;
  height: 100%;
  border-radius: 40px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
  background-color: black;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const box = {
  entry: (back: boolean) => {
    return { x: back ? -500 : 500, opacity: 0, scale: 0 };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 1 },
  }),
};

export const ShowNewTravels = ({ ...props }) => {
  const [destinations, setDestinations] = useState([]);
  console.log(destinations);
  useEffect(() => {
    if (props?.destinations) {
      setDestinations([...props?.destinations]);
    }
  }, [props?.destinations]);

  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);

  const nextPlease = () => {
    setBack(false);
    if (visible <= 3) {
      setVisible((prev) => prev + 1);
    }
  };
  const prevPlease = () => {
    setBack(true);
    if (visible > 0) {
      setVisible((prev) => prev - 1);
    }
  };

  return (
    <>
      {destinations && destinations.length > 0 && (
        <>
          <Wrapper>
            <AnimatePresence custom={back}>
              <Box
                custom={back}
                variants={box}
                initial="entry"
                animate="center"
                exit="exit"
                key={visible}
                bgPhoto={destinations[visible][0].firstimage}
              >
                {destinations[visible][0].title}
                <br />
              </Box>
            </AnimatePresence>
            <div className="mt-5">
              <RatingStar rating={destinations[visible][1]}></RatingStar>
            </div>

            <div>
              <Button onClick={prevPlease}>prev</Button>

              <Button onClick={nextPlease}>next</Button>
            </div>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Button = styled.button`
  background-color: #848484;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: 10px 5px 5px 5px;
`;
