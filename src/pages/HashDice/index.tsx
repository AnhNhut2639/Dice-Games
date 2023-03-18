import React, { useCallback, useEffect, useState } from "react";

const HashDice = () => {
  const [numberRandom, setNumberRandom] = useState<number>(0);
  const [countRight, setCountRight] = useState<number>(0);
  const [selectedMileStone, setSelectedMileStone] = useState<number>(49999);
  const [arrayNumbersRandom, setArrayNumbersRandom] = useState<Array<string>>(
    []
  );

  const generateNumbers = () => {
    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    const arr = num.toString();
    const newNumbers = Array.from(arr);
    setArrayNumbersRandom(newNumbers);
    setNumberRandom(num);
  };
  const numberMileStone = (text = "High") => {
    const milestone = {
      High: 49999,
      Low: 50000,
    };
    return setSelectedMileStone(milestone[text as keyof typeof milestone]);
  };

  const compare = useCallback(() => {
    if (selectedMileStone === 49999) {
      if (numberRandom > 49999) {
        setCountRight(countRight + 1);
      } else {
        return;
      }
    }
    if (selectedMileStone === 50000) {
      if (numberRandom <= 50000) {
        setCountRight(countRight + 1);
      } else {
        return;
      }
    }
  }, [numberRandom]);

  useEffect(() => {
    if (numberRandom <= 0) return;
    compare();
  }, [arrayNumbersRandom]);

  // payout x amount = result money

  // payout càng tăng thì cơ hội trúng càng giảm

  return (
    <div className="h-[100vh] w-[100vw] flex items-start justify-start">
      <div className="sidebar w-1/5 h-full bg-slate-500">
        <div>
          <div>Money default</div>
          <div>101903.070</div>
        </div>

        <div>
          <div>Amount</div>
          <div>100000000</div>
        </div>
        <div>
          <div>Payout</div>
        </div>
      </div>
      <div className="content w-4/5 h-full flex flex-col gap-6 items-center justify-center ">
        <div className="wrap-number flex items-center justify-center gap-4 text-5xl font-semibold">
          {arrayNumbersRandom.length <= 0 ? (
            <>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </>
          ) : arrayNumbersRandom ? (
            arrayNumbersRandom.map((number, index) => (
              <div key={index}>{number}</div>
            ))
          ) : (
            <>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
            </>
          )}
        </div>
        <div>
          <button
            onClick={generateNumbers}
            className="px-4 py-1 bg-green-500 text-white rounded-xl shadow-lg"
          >
            Spin
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div
            onClick={() => numberMileStone("High")}
            className={`${
              selectedMileStone <= 49999 && "text-green-500"
            } px-4 py-2 cursor-pointer bg-slate-500`}
          >
            High
          </div>
          <div className="bg-gray-600 px-4 py-2 text-white font-semibold ">
            {selectedMileStone > 49999 ? "<" : ">"}
            {selectedMileStone}
          </div>
          <div
            onClick={() => numberMileStone("Low")}
            className={`${
              selectedMileStone > 49999 && "text-green-500"
            } px-4 py-2 cursor-pointer bg-slate-500`}
          >
            Low
          </div>
        </div>
      </div>
      <div>
        compare: {selectedMileStone} {arrayNumbersRandom}
      </div>
      <div> right:{countRight}</div>
    </div>
  );
};

export default HashDice;
