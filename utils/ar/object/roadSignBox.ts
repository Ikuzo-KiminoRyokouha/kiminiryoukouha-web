import { MeshBasicMaterial, Texture } from "three";

/**
 * @param distance  현재 나의 좌표와 해당 포인트가 얼마나 먼지 에 대한 거리 (단위 : meter)
 * @description 거리정보에 대한 Texture를 반환해주는 함수입니다
 */
export function createDistanceTexture(
  distance: number,
  color: string = "skyblue"
): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.font = "Bold 100px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  const text = distance > 1000 ? distance / 1000 + "km" : distance + "m";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * @description 색깔만 있는 순정 Texture를 반환해줍니다.
 */
export function createPlaneTexture(color: string = "skyblue"): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fill();

  const texture = new Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * @description 표지만에서 쓰는 Material을 반환해주는 함수입니다.
 */
export function createRoadSignMaterial(
  distance: number,
  color: string = "skyblue"
): Array<MeshBasicMaterial> {
  const distanceTexture = createDistanceTexture(Math.round(distance));
  const plainTexture = createPlaneTexture(color);
  const plainMaterial = new MeshBasicMaterial({
    map: plainTexture,
  });
  const distanceMaterial = new MeshBasicMaterial({
    map: distanceTexture,
  });

  return [
    plainMaterial,
    plainMaterial,
    plainMaterial,
    plainMaterial,
    distanceMaterial,
    distanceMaterial,
  ];
}
