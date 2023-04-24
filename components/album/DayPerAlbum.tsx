import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import AlbumByMap from "./AlbumByMap";

const ImgsDateHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 2%;
`;

const LineHolder = styled.div`
  height: 100%;
  position: relative;
`;

const DateLine = styled.div`
  height: 5px;
  background-color: #b8b8b8;
  bottom: 10%;
  width: 95%;
  margin: 0 2%;
  border-radius: 5px;
  position: absolute;
`;

const Date = styled.div`
  height: 100%;
  color: #b8b8b8;
  font-family: "Courier New", Courier, monospace;
  font-weight: 800;
  font-size: 30px;
`;

const ImgHolder = styled.div`
  margin-bottom: 72px;
  display: grid;
  padding: 5px;
  gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: #b8b8b8;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
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
  background-color: #8a8a8a;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

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

export default function DayPerAlbum({ album }) {
  const onBoxClicked = (movieId: number) => {
    // navigate(`/movies/${movieId}`);
    console.log("box clicked");
  };

  return (
    <>
      <ImgsDateHolder>
        <Date>{album[0].createdAt.toString().slice(0, 10)}</Date>
        <LineHolder>
          <DateLine></DateLine>
        </LineHolder>
      </ImgsDateHolder>
      <ImgHolder>
        {album.map((img) => {
          return (
            <>
              <Box
                layoutId={img.id + ""}
                key={img.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => onBoxClicked(img.id)}
                transition={{ type: "tween" }}
                bgPhoto={img.url}
              >
                {/* <Info variants={infoVariants}>
                  <h4>{img.title}</h4>
                </Info> */}
              </Box>
            </>
          );
        })}
      </ImgHolder>
    </>
  );
}
