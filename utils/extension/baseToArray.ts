export function base64ToArrayBuffer(base64) {
  //   const binaryString = window.atob(base64);
  const binaryString = URL.createObjectURL(
    new Blob([base64], { type: "text/plain" })
  );
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
