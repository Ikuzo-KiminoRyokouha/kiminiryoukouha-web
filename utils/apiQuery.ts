import axios from "axios";

function commonUrl(type: string) {
  const endPoint = "http://apis.data.go.kr/B551011/KorService/" + type;
  let queryParams =
    "?" + "ServiceKey" + "=" + process.env.NEXT_PUBLIC_DATA_API_KEY;
  queryParams += "&" + "MobileOS" + "=" + "ETC";
  queryParams += "&" + "MobileApp" + "=" + "AppTest";
  queryParams += "&" + "_type" + "=" + "json";
  return endPoint + queryParams;
}
export async function getDescriptionFromAPI(
  contentId: number,
  contentTypeId: number
) {
  let url = commonUrl("detailCommon");

  url += "&" + "contentId" + "=" + contentId;
  url += "&" + "contentTypeId" + "=" + contentTypeId;
  url += "&" + "overviewYN" + "=" + "Y";
  console.log("url : ", url);
  const data = await axios
    .get(url)
    .then((res) => {
      console.log(res);
      return res.data.response.body.items.item;
    })
    .catch((e) => {
      console.log("e : ", e);
      return null;
    });
  if (data) return data[0].overview;
  else null;
}
