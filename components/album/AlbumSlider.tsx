import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Slider = styled.div`
  position: relative;
  /* top: -100px; */
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: #0fdaa3;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #5b5b5b;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: typeof window !== "undefined" ? window.outerWidth + 5 : 0,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: typeof window !== "undefined" ? -window.outerWidth - 5 : 0,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

export default function AlbumSlider() {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);

  const onBoxClicked = (movieId: number) => {
    // navigate(`/movies/${movieId}`);
    console.log("box clicked");
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Slider>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {[
            { id: 1, title: "k" },
            { id: 1, title: "kk" },
            { id: 1, title: "kkk" },
            { id: 1, title: "kkkk" },
            { id: 1, title: "kkkkk" },
            { id: 1, title: "kkkkkk" },
            { id: 1, title: "kkkkkkk" },
            { id: 1, title: "kkkkkkkk" },
            { id: 1, title: "kkkkkkkkk" },
            { id: 1, title: "aaaaa" },
            { id: 1, title: "aaaa" },
            { id: 1, title: "aaa" },
            { id: 1, title: "aa" },
            { id: 1, title: "a" },
          ]
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((img) => (
              <Box
                layoutId={img.id + ""}
                key={img.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => onBoxClicked(img.id)}
                transition={{ type: "tween" }}
                bgphoto={"../../public/test.jpg"}
              >
                <Info variants={infoVariants}>
                  <h4>{img.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Slider>
  );
}
