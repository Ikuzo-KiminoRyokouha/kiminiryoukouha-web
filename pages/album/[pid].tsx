import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import AlbumByMap from "components/album/AlbumByMap";
import AlbumSlider from "components/album/AlbumSlider";
import DayPerAlbum from "components/album/DayPerAlbum";
import authRequest from "@/utils/request/authRequest";
import NotFound from "components/404";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const MotionButton = styled.div<{ isOn: boolean }>`
  width: 50px;
  height: 30px;
  background-color: #b9b7b7;
  display: flex;
  border-radius: 40px;
  padding: 5px;
  cursor: pointer;
  justify-content: ${(props) => (props.isOn ? "flex-end" : "flex-start")};
  margin: 2% 5% 0 auto;
`;

const BtnHandle = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
`;

export default function AlbumDetail({ albumData }) {
  const router = useRouter();
  const id = router.query?.pid as string;
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  const images = albumData.images;
  return (
    <>
      <MotionButton isOn={isOn} onClick={toggleSwitch}>
        <BtnHandle layout transition={spring} />
      </MotionButton>

      {isOn ? (
        <AlbumByMap images={images}></AlbumByMap>
      ) : Boolean(images) == true ? (
        Object.keys(images).map((key) => {
          return <DayPerAlbum album={images[key]}></DayPerAlbum>;
        })
      ) : (
        <NotFound></NotFound>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data: albumData } = await authRequest.get(
      process.env.NEXT_PUBLIC_API_URL + `/album/${context.params.pid}`,
      {
        cookie: context.req.headers.cookie,
      }
    );
    return { props: { albumData } };
  } catch (error) {
    console.log("error occured");
    return { props: { albumData: -1 } };
  }
}
