import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

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

let items: Item[] = [dictlet, dictlet1, dictlet2, dictlet3];



// 3) 占位数据，避免首屏闪烁


export default function Home() {
  const account = useCurrentAccount();

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
            <Link to={`/${item.id}`}>
              <Button className="w-32">Deposit to Win</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
