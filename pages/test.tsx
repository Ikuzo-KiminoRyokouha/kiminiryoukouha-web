import dayjs from "dayjs";

export default function Test() {
  return (
    <div className="item-center flex min-h-full w-full justify-center bg-gray-50">
      <div className="flex rounded-md bg-white shadow-lg">
        <div>
          {/* 달 과 달 앞뒤 이동 아이콘 맨 위에있는거 */}
          <div className="flex flex-col px-6 pt-5 pb-6">
            <div className="flex items-center justify-center">
              <button className="p2 flex items-center justify-center rounded-xl">
                <svg
                  className="h-6 w-6 stroke-current text-gray-900"
                  fill="none"
                >
                  <path
                    d="M13.25 8.75L9.75 12l3.5 3.25"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div>Nobember</div>
              <button className="p2 flex items-center justify-center rounded-xl">
                <svg
                  className="h-6 w-6 stroke-current text-gray-900"
                  fill="none"
                >
                  <path
                    d="M10.75 8.75l3.5 3.25-3.5 3.25"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-900">
              {/*  요일 한줄 */}
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                Mo
              </span>
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                Tu
              </span>
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                We
              </span>
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                Th
              </span>
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                Fr
              </span>
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                Sa
              </span>
              <span className="item-cetner flex h-10 w-10 justify-center rounded-lg">
                Su
              </span>
              {/* 날짜 시작 */}
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                1
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                2
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                3
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                4
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                5
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                6
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                7
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                8
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                9
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                10
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                11
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                12
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                13
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                14
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                15
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                16
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                17
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                18
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                19
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                20
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                21
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                22
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                23
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                24
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                25
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                26
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                27
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                28
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                29
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                30
              </span>
              <span className="item-center flex h-10 w-10 justify-center rounded-lg">
                31
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
