import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { getBalances } from "./gRPC.tsx"
// import { run } from "node:test";
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


let Global_items: Item[] = [dictlet, dictlet1, dictlet2, dictlet3];

async function getBalan(account: any, coniList: any) {
  if (account?.address) {
    const banl = await getBalances(account.address, coniList)
    return banl
  }
}

//const Global_games = ["SUI-30H", "DEEP-30H"]//必须修改constants里面的字典数据...................！！
// 3) 占位数据，避免首屏闪烁
const Global_coniList = [
  "0x2::sui::SUI",
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  "0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL",
  "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI"
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [balances, setBalances] = useState<number[]>([1, 1, 2]);
  //const [amount, setAmount] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const account = useCurrentAccount();



  // useEffect(() => {

  //   // 定义一个 async 函数
  //   const tick = () => {
  //     console.log(Global_games)
  //     // 在这里放你的逻辑
  //   };
  //   // 先立刻调用一次
  //   tick();
  //   // 每 5 秒执行一次
  //   const id = setInterval(() => {
  //     tick();
  //   }, 5000);

  //   // 卸载时清除
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  useEffect(() => {
    // 定义一个 async 函数
    const tick = async () => {
      if (account?.address) {
        const banl = await getBalan(account, Global_coniList);
        // 可以将 banl 放入 state 或者做其他处理
        //console.log(banl)
        if (banl) {
          setBalances(banl);
        }
      }
      // 在这里放你的逻辑
    };
    // 先立刻调用一次
    tick();
    // 每 5 秒执行一次
    const id = setInterval(() => {
      tick();
    }, 5000);

    // 卸载时清除
    return () => {
      clearInterval(id);
    };
  }, [account?.address]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card className="flex flex-col justify-between items-center text-center !bg-gray-800 sm:col-span-2">
        <CardHeader>My Account</CardHeader>
        <CardContent className="w-full flex justify-center">
          {account ? (
            <div className="break-all">{account.address}{balances}</div>
          ) : (
            <div>Wallet not connected</div>
          )}
        </CardContent>
      </Card>
      {Global_items.map((item: Item) => (
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
