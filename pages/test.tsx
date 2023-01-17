import axios from "axios";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    axios
      .get(
        "https://api.odsay.com/v1/api/searchPubTransPathT?SX=128.4516861&SY=35.9697369&EX=129.3308558&EY=35.7893791&apiKey=G9nLatUkrdyGFFEWBa6BDQ"
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>this is test page</div>;
}
