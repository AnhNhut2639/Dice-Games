import React, { useCallback, useEffect, useState } from "react";
import { useShallowEqualSelector } from "../../hooks/useShallowEqualSelector";
import {
  getCurrentMoney,
  priceBet,
  winBet,
  selectLoading,
  setLoading,
} from "../../store/slices/appSlice";
import { formatNumber } from "../../utils";
import { useDispatch } from "react-redux";
import AnimatedNumbers from "react-animated-numbers";
import SuccessSound from "../../audio/success.mp3";
import SpinSound from "../../audio/spin.mp3";
const HashDice = () => {
  const dispatch = useDispatch();
  const [numberRandom, setNumberRandom] = useState<number>(0);
  const [countRight, setCountRight] = useState<boolean>(false);
  const [MoneyAdd, setMoneyAdd] = useState<number>(0);
  const [selectedMileStone, setSelectedMileStone] = useState<number>(49999);
  const [arrayNumbersRandom, setArrayNumbersRandom] = useState<Array<string>>(
    []
  );
  // audio
  const audioSuccess = new Audio(SuccessSound);
  const audioSpin = new Audio(SpinSound);

  // amount
  const currentMoney = useShallowEqualSelector(getCurrentMoney);
  const isLoading = useShallowEqualSelector(selectLoading);
  const [amount, setAmount] = useState<number>(100000);
  const [payout, setPayout] = useState<number>(1.98);

  const setDoubleAmount = () => {
    if (amount >= currentMoney) {
      setAmount(currentMoney);
      return;
    }
    setAmount(amount * 2);
  };
  const setDivideDoubleAmount = () => {
    if (amount <= 100000) {
      setAmount(100000);
      return;
    }
    setAmount(amount / 2);
  };

  const generateNumbers = () => {
    const min = 10000;
    const max = 99999;
    audioSpin.play();
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    const arr = num.toString();

    dispatch(priceBet(amount));
    dispatch(setLoading(true));
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
        setCountRight(true);
        const result = amount * payout + amount;
        setMoneyAdd(amount * payout);
        audioSuccess.play();
        dispatch(winBet(result));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        return;
      }
    }
    if (selectedMileStone === 50000) {
      if (numberRandom <= 50000) {
        setCountRight(true);
        const result = amount * payout + amount;
        setMoneyAdd(amount * payout);
        audioSuccess.play();
        dispatch(winBet(result));
        dispatch(setLoading(true));
      } else {
        dispatch(setLoading(false));
        return;
      }
    }
  }, [numberRandom]);

  useEffect(() => {
    if (numberRandom <= 0) return;
    setTimeout(() => {
      compare();
    }, 2000);
  }, [arrayNumbersRandom]);

  useEffect(() => {
    if (countRight) {
      setTimeout(() => {
        setCountRight(false);
      }, 2000);
    }
  }, [countRight]);

  return (
    <div className="h-[100vh] w-[100vw] flex items-start justify-start">
      <div className="sidebar w-1/5 h-full bg-black py-4 text-white space-y-4">
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="bg-gray-600 shadow-lg px-4 py-1 text-white font-semibold cursor-pointer ">
            Manual
          </div>
          <div className="bg-gray-600 shadow-lg px-4 py-1 text-white opacity-70 hover:opacity-100 cursor-pointer ">
            Auto
          </div>
        </div>
        <div className="px-4 space-y-3">
          <div className="space-y-2 ">
            <div className="flex items-center justify-between ">
              <div>Amount</div>
              <div>0 USD</div>
            </div>
            <div className=" flex justify-between gap-1 w-full h-10 bg-gray-500 ">
              <input
                type="number"
                className="outline-none h-full font-semibold w-2/4 px-1 bg-transparent"
                value={amount}
              />
              <div
                className="flex items-center justify-center h-full w-12 bg-[#31343b] cursor-pointer opacity-70 hover:opacity-100"
                onClick={setDoubleAmount}
              >
                x2
              </div>
              <div
                className="flex items-center justify-center h-full w-12 bg-[#31343b] cursor-pointer opacity-70 hover:opacity-100"
                onClick={setDivideDoubleAmount}
              >
                /2
              </div>
              <div className="flex items-center justify-center h-full text-sm w-12 bg-[#31343b] cursor-pointer opacity-70 hover:opacity-100 ">
                {`< >`}
              </div>
            </div>
          </div>
          {/* Payout  */}
          <div className="space-y-2 ">
            <div className="flex items-center justify-between ">
              <div>Payout</div>
              <div>chance: 50%</div>
            </div>
            <div className=" flex gap-1 w-full h-10 bg-gray-500 ">
              <input
                type="number"
                className="outline-none h-full font-semibold w-full px-1 bg-transparent"
                value={payout}
              />
            </div>
          </div>
        </div>

        <div
          onClick={generateNumbers}
          className="mx-4 h-16 bg-green-500 hover:bg-green-600  font-semibold text-lg flex items-center justify-center cursor-pointer"
        >
          <button
            disabled={isLoading}
            className="h-full w-full disabled:bg-slate-400"
          >
            Bet
          </button>
        </div>
      </div>
      <div className="content relative w-4/5 h-full flex flex-col gap-6 items-center justify-center bg-blue-300 ">
        <div className="absolute flex gap-1 top-10 right-20 font-semibold text-xl text-white">
          <div>Wallet:</div>
          <div className="relative">
            {formatNumber(currentMoney)}
            <div
              className={` ${
                countRight ? "animation-effect" : "animation-effect-reverse"
              } absolute  font-semibold text-green-700 text-2xl w-max`}
            >
              + {formatNumber(MoneyAdd)}
            </div>
          </div>
        </div>
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
              <AnimatedNumbers
                includeComma
                animateToNumber={parseInt(number)}
                locale="en-US"
                configs={[
                  { mass: 1, tension: 220, friction: 100 },
                  { mass: 1, tension: 180, friction: 130 },
                  { mass: 1, tension: 280, friction: 90 },
                  { mass: 1, tension: 180, friction: 135 },
                  { mass: 1, tension: 260, friction: 100 },
                  { mass: 1, tension: 210, friction: 180 },
                ]}
              ></AnimatedNumbers>
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
            className="px-4 py-1 bg-green-500 text-white rounded-xl shadow-lg disabled:bg-slate-400"
            disabled={isLoading}
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
      {/* <div>
        compare: {selectedMileStone} {arrayNumbersRandom}
      </div>
      <div> right:{countRight}</div> */}
    </div>
  );
};

export default HashDice;
