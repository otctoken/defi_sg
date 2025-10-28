import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
//import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";

// 1) ID 列表
interface Item {
  id: string;
  countdown: string; // 倒计时（例如 "00:06:00"）
  reward: string;    // 奖励（例如 "12 SGC"）
  coinType: string;    // 奖励（例如 "12 SGC"）
  sgcApy: number;    // SGC 年化（百分比）
  tvl: number;       // TVL（SUI）
}

let dictlet = {
  id: "sui-30H",
  countdown: "253",
  reward: "1223321",
  coinType: "12SUI-36VSUI-20DEEP",
  sgcApy: 7,
  tvl: 186431
} as Item;

let dictlet1 = {
  id: "CC",
  countdown: "253",
  reward: "1223(jiajlsdalsndlajsdlasjdlakjsdlasjdl)",
  coinType: "12SUI-36VSUI-20DEEP",
  sgcApy: 7,
  tvl: 186431
} as Item;
let dictlet2 = {
  id: "DD",
  countdown: "253",
  reward: "1223",
  coinType: "12SUI-36VSUI-20DEEP",
  sgcApy: 7,
  tvl: 186431
} as Item;
let dictlet3 = {
  id: "AA",
  countdown: "253",
  reward: "1223",
  coinType: "12SUI-36VSUI-20DEEP",
  sgcApy: 7,
  tvl: 186431
} as Item;
const games = ["SUI-30H", "DEEP-30H"]//必须修改constants里面的字典数据...................！！
let items: Item[] = [dictlet, dictlet1, dictlet2, dictlet3];



// 3) 占位数据，避免首屏闪烁


export default function Home() {
  const [open, setOpen] = useState(false);
  //const [amount, setAmount] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const account = useCurrentAccount();

  useEffect(() => {
    const tick = () => {
      console.log("tick", new Date().toISOString());
      // 在这里放你的逻辑
    };

    tick();                         // ✅ 先执行一次
    const id = setInterval(tick, 5000); // ✅ 之后每 5 秒执行一次

    return () => clearInterval(id); // ✅ 卸载时清理 interval（避免泄漏/重复）
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card className="flex flex-col justify-between items-center text-center !bg-gray-800 sm:col-span-2">
        <CardHeader>My Account</CardHeader>
        <CardContent className="w-full flex justify-center">
          {account ? (
            <div className="break-all">{account.address}</div>
          ) : (
            <div>Wallet not connected</div>
          )}
        </CardContent>
      </Card>
      {items.map((item: Item) => (
        <Card
          key={item.id}
          className="flex flex-col justify-between items-center text-center h-64 !bg-gray-800 p-4"
        >
          <CardHeader>{item.id}</CardHeader>
          <CardContent className="w-full flex flex-col justify-center space-y-2">
            {/* 这里插入新的信息 */}
            <div>开奖倒计时: {item.countdown}</div>
            <div>Grannd Prize: {item.reward}</div>
            <div>≈ {item.coinType}</div>
            <div>SGC APY: {item.sgcApy}%</div>
            <div>TVL: {item.tvl} SUI</div>
          </CardContent>
          <CardContent className="w-full flex justify-center">
            {/* <Link to={`/${item.id}`}> */}
            <Button onClick={handleOpen} className="w-32">Deposit to Win</Button>
            {/* </Link> */}
          </CardContent>
        </Card>
      ))}
      {/* 标题栏*/}
      <Modal isOpen={open} onClose={handleClose}>
        {/* 标题栏 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Borrow Position</h2>
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-white text-2xl"
          >
            ╳
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-gray-200">
            Amount
            <input
              className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
              type="text"
              placeholder="0.00"
            // onChange etc.
            />
          </label>
          <div className="text-gray-400">
            Available: 5.83 haSUI
          </div>
        </div>

        <button
          className="mt-6 w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded"
        >
          Enter An Amount
        </button>
      </Modal>
    </div>
  );
}
