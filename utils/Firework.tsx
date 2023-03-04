import styled, { keyframes } from "styled-components";

// keyframe
const firework = keyframes`
  /* 0% { 
   // 밑에서 위로 올라가는 표현
    transform: translate(-50%, 60vh);
    width: 5vmin;
    opacity: 1;
  } */
  0% { 
    width: 5vmin;
    opacity: 1;
  }
  100% { 
    width: 45vmin; 
    opacity: 0; 
  }
`;

/**
 * @description 폭죽이 터질때 몇갈래로 터질지 지정하는 함수(많으면 많을수록 터지는 갈래가 많아짐)
 * @param count 폭죽터질때 갈래 갯수 default 20
 */
function customFirework(count: number = 20): string {
  let styles = "";

  // 폭죽 particle 크기 설정 함수
  function setParticleSize(min: number = 0.2, max: number = 0.5): string {
    // 터지는 크기 0.2 ~ 0.5 적당할듯
    let particleSize = Math.random() * (max - min) + min;
    // toFixed(1) => 소수점 한자리까지 끊어줌 return string
    return particleSize.toFixed(1);
  }

  function setColor(): string {
    // 무지개 7가지 색상
    let colorList = [
      // "#FF0000",
      // "#FF7F00",
      // "#FFFF00",
      // "#00FF00",
      // "#0000FF",
      // "#000080",
      "#A020F0",
    ];
    let color = colorList[Math.floor(Math.random() * colorList.length)];

    return color;
  }

  // 폭죽 퍼지는 방향 정하는 함수
  function setDirection() {
    let direction = Math.floor(Math.random() * 10);
    return direction * 10;
  }

  let color = setColor();
  for (let i = 0; i < count; i++) {
    let particleSize = setParticleSize();
    let direction1 = setDirection();
    let direction2 = setDirection();
    let customProperty = `radial-gradient(circle, ${color} ${particleSize}vmin, #0000 0) ${direction1}% ${direction2}%,`;
    styles += customProperty;
  }
  //   console.log("styles123 \n", styles.substring(0, styles.length - 1) + ";");
  return styles.substring(0, styles.length - 1) + ";";
}

interface FireworkProps {
  top: string;
  left: string;
}

export const Firework = styled.div<FireworkProps>`
  content: "";
  // #1 중앙정렬
  position: absolute;
  top: ${(props) => {
    console.log("props.top : ", props.top);
    return props.top || " 50%";
  }}; // y축 +일수록 아래로 이동

  left: ${(props) => {
    console.log("props.left : ", props.left);
    return props.left || "50%";
  }}; // x축 +일수록 오른쪽으로 이동
  transform: translate(-50%, -50%);
  // #1 여기까지
  width: 5vmin;
  // aspect-ratio -> 비율
  aspect-ratio: 1;
  // 폭죽 갈래
  background: ${customFirework()};
  background-size: 5vmin 5vmin;
  background-repeat: no-repeat;
  animation: ${firework} 2s infinite;
`;

/**
 * white -> color
 */
