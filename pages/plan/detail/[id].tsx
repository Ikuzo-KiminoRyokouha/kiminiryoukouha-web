import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PlanDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/plan/${id}`)
      .then((res) => console.log(res.data));
  }, []);

  return <div></div>;
}
