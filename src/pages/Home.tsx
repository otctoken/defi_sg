import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemTimer } from "@/components/ui/ItemTimer";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { getBalances, getObjectDF } from "./gRPC.tsx"
import { SUI_30H, DEEP_30H } from "./constantsData.tsx"
// import { run } from "node:test";
// 1) ID 列表
interface Item {
  id: string;
  name: string;
  countdown: number; // 倒计时（例如 "00:06:00"）
  reward: string;    // 奖励（例如 "12 SGC"）
  coinType: string;    // 奖励（例如 "12 SGC"）
  sgcApy: number;    // SGC 年化（百分比）
  tvl: number;       // TVL（SUI）
  coin_balance_number: number;
  decimals: number;
}




async function getBalan(account: any, coniList: any) {
  if (account?.address) {
    const banl = await getBalances(account.address, coniList)
    return banl
  }
}


const Global_games = [SUI_30H, DEEP_30H]//必须修改constants里面的字典数据...................！！

async function getData(gamesList: any[]) {
  let ItemList: Item[] = [];
  for (const game of gamesList) {
    let item = {} as Item;
    const dfData = await getObjectDF(game.data)
    item.id = game.id
    const ms = Date.now();
    let icundown = Number(dfData.start_time) + Number(game.time_per_round) - ms
    if (icundown <= 0) {
      icundown = 0
    }
    item.countdown = icundown
    item.reward = "256USD"
    item.coinType = "12SUI-36VSUI-20DEEP"
    item.sgcApy = 5
    const tvl_ = parseInt(dfData.total_balance) / (10 ** game.decimals);
    item.tvl = parseFloat(tvl_.toFixed(2));
    item.coin_balance_number = game.coin_balance_number
    item.decimals = game.decimals
    item.name = game.name
    ItemList.push(item)
  }
  return ItemList
}

//const Global_games = ["SUI-30H", "DEEP-30H"]//必须修改constants里面的字典数据...................！！
// 3) 占位数据，避免首屏闪烁
const Global_coniList = [
  "0x2::sui::SUI",
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  "0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL",
  "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI"
];
//....................................................................................................................
export default function Home() {
  const [open, setOpen] = useState(false);
  const [balances, setBalances] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [usebalances, setUsebalances] = useState(0);
  const [usecointype, setUsecointype] = useState("");
  const [global_items, setGlobal_items] = useState<Item[]>([]);
  const [modalItemName, setModalItemName] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputDecimal, setInputDecimal] = useState(9);
  //const [amount, setAmount] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // 重置输入金额，避免下次打开带值
    setInputAmount("");   // <<< 修改
  };

  const account = useCurrentAccount();
  //...........................................................function..........
  function handleOpenAndGetbalance(num: number, decimals: number, name: string, to: string) {
    handleOpen()
    setInputDecimal(decimals)
    const decimal = 10 ** decimals
    setUsebalances(parseFloat((balances[num] / decimal).toFixed(2)))
    setUsecointype(name)
    setModalItemName(to)
  }

  const handleDepositClick = () => {
    const num_ = parseFloat(inputAmount);
    const decimal = 10 ** inputDecimal
    const num = num_ * decimal;
    if (isNaN(num_) || num_ <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (num_ > usebalances) {
      alert("Exceed available balance");
      return;
    }
    // 在这里执行你的「存款／提交」逻辑。 <<< 修改
    console.log("提交金额:", num, "币种:", usecointype, "对应项目:", modalItemName, inputDecimal);
    // 例如：调用合约、RPC、GraphQL…
    handleClose();
  };



  //...........................................................function..........

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
      const ItemList = await getData(Global_games)
      setGlobal_items(ItemList)
      if (account?.address) {
        const banl = await getBalan(account, Global_coniList);
        // 可以将 banl 放入 state 或者做其他处理
        //console.log(banl)
        if (banl) {
          setBalances(banl);
        }
      } else {
        //没链接钱包
        setBalances(Array(16).fill(0));
      }
      // 在这里放你的逻辑
    };
    // 先立刻调用一次
    tick();
    // 每 5 秒执行一次
    const id = setInterval(() => {
      tick();
    }, 7000);

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
      {global_items.length > 0 && global_items.map((item: Item) => (
        <Card
          key={item.id}
          className="flex flex-col justify-between items-center text-center !bg-gray-800 p-4 h-auto"
        >
          <CardHeader>{item.id}</CardHeader>
          <CardContent
            className={
              "w-full flex flex-col justify-center space-y-2 " +
              "[&>*:nth-child(odd)]:bg-gray-600 [&>*:nth-child(even)]:bg-gray-700 [&>*]:rounded-md p-2"
            }
          >
            <ItemTimer countdown={item.countdown} />
            <div>Grannd Prize: {item.reward}</div>
            <div>≈ {item.coinType}</div>
            <div>SGC APY: {item.sgcApy}%</div>
            <div>TVL: {item.tvl} {item.name}</div>
          </CardContent>
          <CardContent className="w-full flex justify-center space-x-4">
            <Button
              onClick={() => handleOpenAndGetbalance(item.coin_balance_number, item.decimals, item.name, item.id)}
              className="w-40 whitespace-nowrap"
            >
              Deposit to Win
            </Button>
            {Number(item.countdown) <= 0 && (
              <Button
                onClick={() => handleOpenAndGetbalance(item.coin_balance_number, item.decimals, item.name, item.id)}
                className="w-40 whitespace-nowrap bg-green-600 hover:bg-green-700"
              >
                Start Draw
              </Button>
            )}
          </CardContent>
        </Card>
      ))
      }
      {/* 标题栏*/}
      <Modal isOpen={open} onClose={handleClose} >
        {/* 标题栏 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Deposit to {modalItemName}</h2>
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
              value={inputAmount}                               // <<< 修改
              onChange={(e) => {
                const val = e.target.value;
                // 限制最多两位小数
                if (/^\d*\.?\d{0,2}$/.test(val)) {
                  setInputAmount(val);
                }
              }}
            />
          </label>
          <div className="text-gray-400">
            Available: {usebalances}{usecointype}
          </div>
        </div>

        <button
          className="mt-6 w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded"
          onClick={handleDepositClick}
        >

          Deposit
        </button>
      </Modal>
    </div >
  );
}
