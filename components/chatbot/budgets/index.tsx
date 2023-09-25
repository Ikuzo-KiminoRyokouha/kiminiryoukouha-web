import styled from "styled-components";

export const BudgetIndex = ({ budgets, transactions, startDay, endDay }) => {
  // console.log("budget index", props.budgets.dayPer);

  const totalCost = budgets.totalCost;
  const dayPer = budgets.dayPer;
  const start = startDay.toString().slice(0, 10).split("-").join("");
  const end = endDay.toString().slice(0, 10).split("-").join("");

  const today = new Date();
  let totoalRemain = 0;

  return (
    <Holder>
      <TotalCost>総予算 : {totalCost}</TotalCost>
      <br></br>
      {dayPer != null ? (
        Object.keys(dayPer).map((key) => {
          let dayPerTrans = 0;
          transactions.map((transaction) => {
            if (transaction.date == Number(key) + Number(start) - 1)
              if (transaction.inOrOut == "출금")
                dayPerTrans += Number(transaction.amount);
              else dayPerTrans -= Number(transaction.amount);
          });
          totoalRemain += Number(dayPer[key]) - dayPerTrans;
          return (
            <div>
              Day{key}: {dayPer[key]} / expenditure: {dayPerTrans} / remain:{" "}
              {Number(dayPer[key]) - dayPerTrans > 0 ? (
                <RemainPlus>{Number(dayPer[key]) - dayPerTrans}</RemainPlus>
              ) : (
                <RemainMinus>{Number(dayPer[key]) - dayPerTrans}</RemainMinus>
              )}
              {end == Number(key) + Number(start) - 1 ? (
                <>
                  {" "}
                  <br></br>
                  <br></br>
                  <TotalRemain>
                    予想より
                    {totoalRemain > 0 ? (
                      <RemainPlus>{totoalRemain}</RemainPlus>
                    ) : (
                      <RemainMinus>{totoalRemain}</RemainMinus>
                    )}
                    が残っています。
                  </TotalRemain>
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <div>予算管理情報がありません。</div>
      )}
    </Holder>
  );
};

const Holder = styled.div`
  color: black;
`;

const TotalCost = styled.div`
  text-align: center;
  color: black;
  font-size: larger;
`;

const TotalRemain = styled.div`
  text-align: center;
  color: black;
  font-size: larger;
`;

const RemainPlus = styled.span`
  color: blue;
  font-size: large;
`;

const RemainMinus = styled.span`
  color: red;
  font-size: large;
`;
