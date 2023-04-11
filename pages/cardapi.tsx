import React from "react";

async function onClick() {
  var tmpWindow = window.open("about:blank");
  if (tmpWindow !== null) {
    tmpWindow.location =
      "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=5ddeeed1-1cc5-4af6-ba50-79e055884302&redirect_uri=http://localhost:3000/test/authCode&scope=login+inquiry+transfer&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&auth_type=0";
  }
}

export default function CardAPI() {
  return (
    <div className="App">
      <button onClick={onClick}>계좌연결</button>
    </div>
  );
}
