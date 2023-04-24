import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EXIF from "exif-js";
import authRequest from "@/utils/request/authRequest";
import { useRouter } from "next/router";
import useAlbum from "hooks/useAlbum";
import { base64ToArrayBuffer } from "@/utils/extension/baseToArray";

const CameraHolder = styled.div`
  margin: auto 0;
  padding: 0;
  /* box-sizing: border-box; */
  /* background-color: #313131; */
`;

const AppCamera = styled.div`
  /* margin: auto 0; */
  position: relative;
`;

const Result = styled.div<{ showModal: boolean }>`
  position: fixed;
  top: 70px;
  left: ${(props) => (props.showModal ? "0" : "100%")};
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  transition: 0.4s;
`;

const Video = styled.video`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const Button = styled.button`
  padding: 8px 16px;
  position: relative;
  top: -50px;
  left: 50%;
  background-image: linear-gradient(to right, #844fff 50%, #ff4f84 50%);
  background-position: 0%;
  background-size: 200%;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  transition: 0.4s;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    background-position: 100%;
  }
`;

const BackButton = styled.button`
  position: fixed;
  top: 72px;
  padding: 8px 16px;
  background-color: gray;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  transition: 0.4s;
  z-index: 5;
  cursor: pointer;
`;

const ModalButton = styled.button`
  display: block;
  margin: 10px auto;
  padding: 8px 16px;
  background-image: linear-gradient(to right, #844fff 50%, #ff4f84 50%);
  background-position: 0%;
  background-size: 200%;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  transition: 0.4s;
  z-index: 5;
  cursor: pointer;
  &:hover {
    background-position: 100%;
  }
`;

const Image = styled.img`
  margin: 5%;
  margin: auto 0;
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const Canvas = styled.canvas`
  display: none;
`;

interface Meta {
  latitude: number;
  longitude: number;
}

export default function Camera({ travelsData, todayPlanId }) {
  const router = useRouter();

  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [planId, setPlnaId] = useState(7);
  const [destinationId, setDestinationId] = useState();

  const [photoMetadata, setPhotoMetadata] = useState<Meta>();
  const { createAlbumImage } = useAlbum();
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickSubmit = () => {
    const formData = new FormData();

    var arr = photoUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], `${todayPlanId}.jpeg`, { type: mime });
    formData.append("file", file);
    formData.append("planId", todayPlanId);
    formData.append("mapx", photoMetadata.latitude + "");
    formData.append("mapy", photoMetadata.longitude + "");
    formData.append("destinationId", destinationId);
    createAlbumImage(formData);
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;
    if (!photo) return;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    // 이미지 URL 저장
    setPhotoUrl(photo.toDataURL("image/jpeg"));
    // const exifData = EXIF.readFromBinaryFile(
    //   base64ToArrayBuffer(photoUrl.split(",")[1])
    // );
    // 모달 창 열기
    setShowModal(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPhotoMetadata(() => ({
          latitude,
          longitude,
        }));
        // 캡쳐 로직 추가
      },

      (error) => console.error(error)
    );
  };

  const cloesPhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    setShowModal(false);
    setPhotoUrl("");
  };

  const handlePlanIdChange = (e) => {
    // setPlanId(e.target.value);
    setDestinationId(e.target.value);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  // useEffect(() => {
  //   console.log("photo metadata", photoMetadata);
  // }, [photoMetadata]);

  return (
    <CameraHolder>
      <AppCamera>
        <Video ref={videoRef} autoPlay />
        <Button onClick={takePhoto}>shot</Button>
      </AppCamera>

      <Canvas ref={photoRef} />

      <Result showModal={showModal}>
        {showModal && (
          <div>
            <Image src={photoUrl} alt="Captured"></Image>
            <BackButton onClick={cloesPhoto}>x</BackButton>

            <>
              <select
                style={{ display: "block", margin: "12px auto" }}
                name="fruits"
                onChange={handlePlanIdChange}
              >
                <option value="" selected>
                  -- 선택 --
                </option>
                {travelsData.travels.map((travel) => {
                  return (
                    <option
                      value={travel.destinationId}
                      key={travel.detinationId}
                    >
                      {travel.destination.title}
                    </option>
                  );
                })}
                <option value={0}>기타</option>
              </select>
              <ModalButton onClick={onClickSubmit}>save</ModalButton>
            </>
          </div>
        )}
      </Result>
    </CameraHolder>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data: todayPlanData } = await authRequest.get(
      process.env.NEXT_PUBLIC_API_URL + `/plan/today`,
      {
        cookie: context.req.headers.cookie,
      }
    );
    const todayPlanId = todayPlanData.plan.id;
    const { data: travelsData } = await authRequest.get(
      process.env.NEXT_PUBLIC_API_URL + `/travel/${todayPlanId}`,
      {
        cookie: context.req.headers.cookie,
      }
    );

    return { props: { travelsData, todayPlanId } };
  } catch (error) {
    console.log("error occured");
    console.log(error);
    return { props: { travelsData: -1 } };
  }
}
