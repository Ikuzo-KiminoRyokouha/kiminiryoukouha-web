import styled from "styled-components";

export const Transactions = ({ transactions }) => {
  let tempDay = 0;
  const today = new Date().toISOString().slice(0, 10).split("-").join("");
  console.log("kk", today);
  return (
    <Holder>
      {transactions.length != 0 ? (
        transactions.map((transaction) => {
          console.log(transaction.date);

          return (
            <>
              {/* {tempDay != transaction.date ? <div>ddd</div> : <div>ll</div>} */}
              <div>
                <span>{transaction.date + " "}</span>
                <span>
                  {transaction.time.slice(0, 2) +
                    "時　" +
                    transaction.time.slice(2, 4) +
                    "分 "}
                </span>
                <span>{transaction.inOrOut + " "}</span>
                <span>{transaction.amount + " "} </span>
                <span>{transaction.name + " "}</span>
              </div>
            </>
          );
        })
      ) : (
        <>旅行中の取引履歴はまだありません。</>
      )}
    </Holder>
  );
};

const Holder = styled.div`
  display: block;
  color: black;
`;
