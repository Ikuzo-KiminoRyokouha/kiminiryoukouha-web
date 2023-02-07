import { useLayoutEffect } from "react";
import mainRequest from "../../utils/request/mainRequest";

interface Props {
  destinationId: string;
}

export default function BigIntroduceCard({ destinationId }) {
  useLayoutEffect(() => {
    mainRequest
      .get(`/destination/detail/${destinationId}`)
      .then((res) => console.log(res));
  }, []);
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center md:max-w-7xl">
      <p className="pt-20 pb-10 text-2xl font-bold">장소</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eius,
        voluptas nostrum veniam consectetur ad blanditiis mollitia autem minus
        in odio sed corrupti harum tempora. Dolor laudantium natus voluptatibus
        excepturi.
      </p>
    </div>
  );
}
