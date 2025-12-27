import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ItemTimer } from "@/components/ui/ItemTimer";
import { Button } from "@/components/ui/button";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
//import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./Modal";
import { getBalances, getObjectDF } from "./gRPC.tsx";
import { SUI_Navi, DEEP_Navi } from "./constantsData.tsx";
import {
  getSavingsDynamicFieldObject,
  deposit_all,
  withdraw,
  lottery,
  lottery_week,
  lottery_moon,
  entry_get_sgc_coin,
  burn_sgc_coin,
  get_single_price,
} from "./function.tsx";
// import { run } from "node:test";
// 1) ID 列表
interface Item {
  id: string;
  name: string;
  countdown: number; // 倒计时（例如 "00:06:00"）
  reward: string; // 奖励（例如 "12 SGC"）
  coinType: string; // 奖励（例如 "12 SGC"）
  fun_type: string;
  sgcApy: number; // SGC 年化（百分比）
  tvl: number;
  tvlUSD: number; // TVL（SUI）
  coin_balance_andeData_number: number;
  decimals: number;
  week_r: boolean;
  moon_r: boolean;
  countdown_w: number;
  countdown_m: number;
}

interface Item_head {
  id: string;
  name: string;
  balance: number;
  coin_balance_andeData_number: number;
}

async function getBalan(account: any, coniList: any) {
  if (account?.address) {
    const banl = await getBalances(account.address, coniList);
    return banl;
  }
}

const Global_games = [SUI_Navi, DEEP_Navi]; //必须修改constants里面的字典数据..................顺序要对上.！！

//const Global_games = ["SUI-30H", "DEEP-30H"]//必须修改constants里面的字典数据...................！！
// 3) 占位数据，避免首屏闪烁
const Global_coniList = [
  //必须修改constants里面的字典数据..................顺序要对上.！！
  "0x2::sui::SUI",
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  "0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL",
  "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
];

async function getData(gamesList: any[], price: any) {
  let ItemList: Item[] = [];
  for (const game of gamesList) {
    let item = {} as Item;
    const dfData = await getObjectDF(game.data);
    item.id = game.id;
    const ms = Date.now();
    let icundown =
      Number(dfData.start_time_day) + Number(game.time_per_round) - ms;
    if (icundown <= 0) {
      icundown = 0;
    }
    item.week_r = dfData.lottery_draw_weekly;
    item.moon_r = dfData.lottery_draw_monthly;
    item.countdown = icundown;
    item.fun_type = game.fun_type;
    item.reward = "$256";
    item.coinType = "12SUI+36VSUI+20DEEP";
    item.sgcApy = 5;
    const tvl_ = parseInt(dfData.total_balance) / 10 ** game.decimals;
    item.tvl = parseFloat(tvl_.toFixed(2));
    const tvlUSD = item.tvl * price[game.fun_type];
    item.tvlUSD = parseFloat(tvlUSD.toFixed(2));
    item.coin_balance_andeData_number = game.coin_balance_andeData_number;
    item.decimals = game.decimals;
    item.name = game.name;
    item.countdown_w =
      Number(dfData.round_weekly) -
      (Number(dfData.number_of_draws) % Number(dfData.round_weekly));
    item.countdown_m =
      Number(dfData.round_monthly) -
      (Number(dfData.number_of_draws) % Number(dfData.round_monthly));
    ItemList.push(item);
  }
  return ItemList;
}

async function getData_haed(gamesList: any[], adder: string) {
  let ItemList: Item_head[] = [];
  for (const game of gamesList) {
    const bilan = await getSavingsDynamicFieldObject(
      game.dynamic_field.savings,
      adder
    );
    if (bilan > 0) {
      let item = {} as Item_head;
      item.id = game.id;
      item.name = game.id;
      item.coin_balance_andeData_number = game.coin_balance_andeData_number;
      const decimal = 10 ** game.decimals;
      const rawNum = bilan / decimal;
      const floorNum = Math.round(rawNum * 100) / 100; // 100
      item.balance = floorNum;
      ItemList.push(item);
    }
  }
  return ItemList;
}

//....................................................................................................................
export default function Home() {
  const [open, setOpen] = useState(false);
  const [isGlobalButton, setIsGlobalButton] = useState(true);
  const [balances, setBalances] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  //const [usebalances, setUsebalances] = useState(0);
  const [dataNumber, setDataNumber] = useState(0);
  const [usecointype, setUsecointype] = useState("");
  const [global_items, setGlobal_items] = useState<Item[]>([]);
  const [global_items_head, setGlobal_items_head] = useState<Item_head[]>([]);
  const [modalItemName, setModalItemName] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputDecimal, setInputDecimal] = useState(9);
  //const [amount, setAmount] = useState<string>("");

  const currentRawBalance = balances[dataNumber] || 0;
  const currentDecimalPower = 10 ** inputDecimal;
  // 核心计算逻辑移到这里
  const dynamicAvailableBalance =
    Math.floor((currentRawBalance / currentDecimalPower) * 100) / 100;

  const priceRef = useRef({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // 重置输入金额，避免下次打开带值
    setInputAmount(""); // <<< 修改
  };

  const account = useCurrentAccount();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  //...........................................................function..........
  function handleOpenAndGetbalance(
    num: number,
    decimals: number,
    name: string,
    to: string
  ) {
    handleOpen();
    setInputDecimal(decimals);
    // const decimal = 10 ** decimals;
    // const rawNum = balances[num] / decimal;
    // const floorNum = Math.floor(rawNum * 100) / 100; // 核心逻辑：乘100 -> 取整 -> 除100
    // setUsebalances(floorNum);
    setUsecointype(name);
    setModalItemName(to);
    setDataNumber(num);
  }

  const handleDepositClick = async () => {
    if (!isGlobalButton) {
      return;
    } else {
      setIsGlobalButton(false);
    }
    const num_ = parseFloat(inputAmount);
    const decimal = 10 ** inputDecimal;
    const num = num_ * decimal;
    if (isNaN(num_) || num_ <= 0) {
      alert("Please enter a valid amount");
      setIsGlobalButton(true);
      return;
    }
    if (num_ > dynamicAvailableBalance) {
      alert("Exceed available balance");
      setIsGlobalButton(true);
      return;
    }
    try {
      // 在这里执行你的「存款／提交」逻辑。 <<< 修改
      const data = Global_games[dataNumber];
      const bol = await deposit_all(
        account,
        num,
        data.fun_type,
        data.data,
        data.navi_pool_adder,
        data.get_sgc,
        signAndExecute,
        data.fun_type
      );
      console.log(bol);
      if (bol) {
        // 2秒后消失
        toast.success("OK! Deposit successfully", {
          duration: 2000,
        });
      } else {
        toast.error("error!", {
          duration: 2000,
        });
      }
    } catch (error) {
      // Code to handle the error
      console.log(error); // Outputs: ReferenceError
    }
    // 例如：调用合约、RPC、GraphQL…
    handleClose();
    setIsGlobalButton(true);
  };

  async function withdraw_all(
    fun_type: any,
    data: any,
    navi_pool_adder: any,
    get_sgc: any,
    signAndExecute: any,
    name: any
  ) {
    if (!isGlobalButton) {
      return;
    } else {
      setIsGlobalButton(false);
    }
    const bol = await withdraw(
      fun_type,
      data,
      navi_pool_adder,
      get_sgc,
      signAndExecute,
      name
    );
    console.log(bol);
    if (bol) {
      // 2秒后消失
      toast.success("OK! Withdraw successfully", {
        duration: 3000,
      });
    } else {
      toast.error("Withdraw fail! Please try again later!", {
        duration: 3000,
      });
    }
    setIsGlobalButton(true);
  }

  async function lottery_home(
    data_Number: any,
    signAndExecute: any,
    countdown: any,
    weekR: any,
    moonR: any
  ) {
    if (!isGlobalButton) {
      return;
    } else {
      setIsGlobalButton(false);
    }
    if (!account?.address) {
      alert("Please connect your wallet!");
      setIsGlobalButton(true);
      return;
    }
    const data = Global_games[data_Number];
    if (weekR) {
      const bol = await lottery_week(
        data.fun_type,
        data.navi_pool_adder,
        data.data,
        data.data_acp_owner,
        signAndExecute,
        data.fun_type
      );
      console.log(bol);
      if (bol) {
        // 2秒后消失
        toast.success("OK! lottery successfully", {
          duration: 2000,
        });
      } else {
        toast.error("fail!", {
          duration: 2000,
        });
      }
    } else if (moonR) {
      const bol = await lottery_moon(
        data.fun_type,
        data.navi_pool_adder,
        data.data,
        data.data_acp_owner,
        signAndExecute,
        data.fun_type
      );
      console.log(bol);
      if (bol) {
        // 2秒后消失
        toast.success("OK! lottery successfully", {
          duration: 2000,
        });
      } else {
        toast.error("fail!", {
          duration: 2000,
        });
      }
    } else if (countdown <= 0) {
      const bol = await lottery(
        data.fun_type,
        data.navi_pool_adder,
        data.data,
        data.data_acp_owner,
        signAndExecute,
        data.fun_type
      );
      console.log(bol);
      if (bol) {
        // 2秒后消失
        toast.success("OK! lottery successfully", {
          duration: 2000,
        });
      } else {
        toast.error("fail!", {
          duration: 2000,
        });
      }
    }
    setIsGlobalButton(true);
  }

  async function entry_get_sgc_coin_home(
    data_Number: any,
    signAndExecute: any
  ) {
    if (!isGlobalButton) {
      return;
    } else {
      setIsGlobalButton(false);
    }
    // 在这里执行你的「存款／提交」逻辑。 <<< 修改
    const data = Global_games[data_Number];
    const bol = await entry_get_sgc_coin(
      data.fun_type,
      data.data,
      data.get_sgc,
      signAndExecute
    );
    console.log(bol);
    if (bol) {
      // 2秒后消失
      toast.success("OK! get sgc successfully", {
        duration: 2000,
      });
    } else {
      toast.error("fail!", {
        duration: 2000,
      });
    }
    setIsGlobalButton(true);
  }

  async function burn_sgc_coin_home(signAndExecute: any) {
    if (!isGlobalButton) {
      return;
    } else {
      setIsGlobalButton(false);
    }
    if (!account?.address) {
      alert("Please connect your wallet!");
      setIsGlobalButton(true);
      return;
    }
    toast.success("Preparing to burn down SGC...", {
      duration: 4500,
    });
    const bol = await burn_sgc_coin(signAndExecute);
    console.log(bol);
    if (bol) {
      // 2秒后消失
      toast.success("OK! Deposit successfully", {
        duration: 2000,
      });
    } else {
      toast.error("fail!", {
        duration: 2000,
      });
    }
    setIsGlobalButton(true);
  }

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
    //低频逻辑
    const tickSlow = async () => {
      const price_obj = await get_single_price();
      priceRef.current = price_obj;
    };
    // 高频逻辑
    const tick = async () => {
      const ItemList = await getData(Global_games, priceRef.current);

      setGlobal_items(ItemList);
      if (account?.address) {
        const data_haed = await getData_haed(Global_games, account.address);
        if (data_haed.length > 0) {
          setGlobal_items_head(data_haed);
        } else {
          setGlobal_items_head([]);
        }
        const banl = await getBalan(account, Global_coniList);
        // 可以将 banl 放入 state 或者做其他处理
        //console.log(banl)
        if (banl) {
          setBalances(banl);
        }
      } else {
        //没链接钱包
        setBalances(Array(16).fill(0));
        setGlobal_items_head([]);
      }

      // 在这里放你的逻辑
    };

    // 3. 定义一个初始化函数来控制“先后顺序”
    const init = async () => {
      await tickSlow(); // 关键点：使用 await 等待 tickSlow 完全执行完毕
      await tick(); // 只有上面那行执行完，才会执行这一行
    };

    // 4. 立即触发初始化序列
    init();
    // 每 5 秒执行一次
    // 5. 设置定时器 (定时器相互独立，按各自频率运行)
    const id5s = setInterval(tick, 5000);
    const id1min = setInterval(tickSlow, 60000);

    // 6. 清除定时器
    return () => {
      clearInterval(id5s);
      clearInterval(id1min);
    };
  }, [account?.address]);
  //......................................................................以上为定期运行................................
  useEffect(() => {
    if (!isGlobalButton) {
      toast.success("pending......", {
        duration: 2000,
      });
    }
  }, [isGlobalButton]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <Toaster
        position="top-center"
        reverseOrder={false}
        // 添加 containerStyle
        containerStyle={{
          zIndex: 99999, // 确保比 Modal 高
        }}
      />
      <div className="col-span-1 sm:col-span-2 flex flex-row justify-center gap-5 items-center w-full">
        {/* 移除了 pb-4 */}

        <div className="flex flex-row items-center gap-2 justify-center">
          {/* 添加 leading-none: 让行高=字体大小 */}
          <span className="text-gray-400 text-xs leading-none">Total TVL:</span>
          <span className="text-sm font-bold text-green-400 leading-none">
            $5,000,000
          </span>
        </div>

        <div className="flex flex-row items-center gap-2 justify-center">
          <span className="text-gray-400 text-xs  leading-none">
            Total Prize:
          </span>
          <span className="text-sm font-bold text-yellow-500 leading-none">
            $50,000
          </span>
        </div>
      </div>
      <Card className="flex flex-col items-center text-center !bg-gray-800 sm:col-span-2 shadow-lg border border-gray-700 h-fit">
        {account && (
          <CardHeader className="flex flex-row items-center justify-center text-base font-bold text-white tracking-wider border-b border-gray-700 w-full pb-1 mb-1">
            <div className="flex items-center gap-4 text-xs font-normal">
              <span className="text-gray-400">
                SGC Bal: <span className="text-white font-bold">10k</span>
              </span>

              {/* 记得这里我也帮你保留了之前修改的 <a> 标签跳转功能 */}
              <a
                href="https://abc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 border border-green-400 px-2 py-0.2 rounded cursor-pointer hover:bg-green-400 hover:text-black transition-colors"
              >
                BUY SGC
              </a>
              <span className="text-gray-400">
                SUI Bal: <span className="text-white font-bold">100k</span>
              </span>
            </div>
          </CardHeader>
        )}
        <CardContent className="w-full px-1 pb-1">
          {account ? (
            <div className="w-full flex flex-col">
              {/* 1. 表头 (Header) - 只在宽屏(sm)显示，手机端隐藏 */}
              <div className="hidden sm:grid sm:grid-cols-5 text-xs text-gray-400 uppercase bg-gray-900 border-b border-gray-700 py-1 px-1 font-semibold">
                <div>Game</div>
                <div>Balance</div>
                <div>Win Prob</div>
                <div>SGC rewards</div>
                <div className="text-right"></div>
              </div>

              {/* 2. 数据列表 (Body) */}
              <div className="flex flex-col">
                {global_items_head.length > 0 ? (
                  global_items_head.map((item: Item_head) => (
                    // 每一行容器：手机是 flex-col(竖排)，电脑是 grid-cols-5(横排)
                    <div
                      key={item.id}
                      className="flex flex-col sm:grid sm:grid-cols-5 border-b border-gray-700 hover:bg-gray-700/30 transition-colors py-1 px-4 gap-2 sm:gap-0"
                    >
                      {/* Game Name */}
                      <div className="flex justify-between items-center sm:block">
                        {/* 手机端显示的标签 */}
                        <span className="sm:hidden text-gray-500 text-sm">
                          Game
                        </span>
                        <span className="font-medium text-white break-all">
                          {item.name}
                        </span>
                      </div>

                      {/* Balance */}
                      <div className="flex justify-between items-center sm:block">
                        <span className="sm:hidden text-gray-500 text-sm">
                          Balance
                        </span>
                        <span className="font-medium text-white break-all">
                          {item.balance}
                        </span>
                      </div>

                      {/* Win Prob */}
                      <div className="flex justify-between items-center sm:block">
                        <span className="sm:hidden text-gray-500 text-sm">
                          Win Prob
                        </span>
                        <span className="font-medium text-white break-all">
                          -
                        </span>
                      </div>

                      {/* Rewards */}
                      <div className="flex justify-between items-center sm:block">
                        <span className="sm:hidden text-gray-500 text-sm">
                          Rewards
                        </span>
                        <span className="font-medium text-white break-all">
                          -
                        </span>
                      </div>

                      {/* Actions (按钮) */}
                      <div className="flex gap-2 mt-2 sm:mt-0 justify-end items-center">
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-black font-bold h-8 px-3 text-xs w-full sm:w-auto"
                          onClick={() =>
                            entry_get_sgc_coin_home(
                              item.coin_balance_andeData_number,
                              signAndExecute
                            )
                          }
                        >
                          Claim SGC
                        </Button>
                        <Button
                          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-8 px-3 text-xs w-full sm:w-auto"
                          onClick={() =>
                            withdraw_all(
                              Global_games[item.coin_balance_andeData_number]
                                .fun_type,
                              Global_games[item.coin_balance_andeData_number]
                                .data,
                              Global_games[item.coin_balance_andeData_number]
                                .navi_pool_adder,
                              Global_games[item.coin_balance_andeData_number]
                                .get_sgc,
                              signAndExecute,
                              Global_games[item.coin_balance_andeData_number]
                                .fun_type
                            )
                          }
                        >
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  // 空状态 (No Data)
                  <div className="py-0 text-center text-gray-500 flex flex-col justify-center items-center border-t border-gray-700/50">
                    <span className="text-sm">(No Records)</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // 未连接钱包
            <div className="py-0 text-center text-gray-500 flex flex-col justify-center items-center border-t border-gray-700/50">
              <div>Wallet not connected</div>
            </div>
          )}
        </CardContent>
      </Card>
      {global_items.length > 0 &&
        global_items.map((item: Item) => (
          <Card
            key={item.id}
            className="flex flex-col items-center justify-between !bg-gray-800 p-0 w-full gap-0 border border-gray-700 shadow-md"
          >
            <div className="flex flex-row items-center min-w-[60px] w-full justify-center bg-gray-900 py-2">
              {/* 直接用 div，纯净无干扰 */}
              <div className="text-xl font-bold text-yellow-600 leading-none">
                {item.id}
              </div>
            </div>

            <CardContent className="grid grid-cols-2 gap-y-3 gap-x-2 w-full p-0 text-center items-start">
              {/* 1. TVL */}
              <div className="flex flex-col">
                {/* 标签: text-sm (14px) */}
                <span className="text-gray-400 text-sm font-medium uppercase">
                  TVL
                </span>
                {/* 数值: text-xl (20px) 甚至可以用 text-2xl */}
                <div className="font-bold text-white text-xl">
                  ${item.tvlUSD}
                </div>
                {/* 辅助文字: text-xs -> text-sm */}
                <div className="text-sm text-gray-500 truncate">
                  ≈ {item.tvl}
                </div>
              </div>

              {/* 2. SGC APY */}
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-medium uppercase">
                  SGC APY
                </span>
                {/* 绿色大数字 */}
                <div className="font-bold text-green-400 text-xl">
                  {/* 根据公式计算即可 */}
                  {item.sgcApy}%
                </div>
                <div className="text-sm text-gray-500 truncate">
                  rewards coin
                </div>
              </div>
              {/* 5. 1d 倒计时 */}
              <div className="col-span-2 grid grid-cols-2 gap-x-2 bg-white/5 rounded-lg -mx-2 px-2">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm  font-medium">
                    1d Next draw
                  </span>
                  {/* 如果倒计时组件内部字体受限，可以用 scale-110 强行放大 */}
                  <div className="text-white-500 font-bold text-xl">
                    {Number(item.countdown) <= 0 ? (
                      <span className="text-green-500">Ready to Draw</span>
                    ) : (
                      <ItemTimer countdown={item.countdown} />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">奖池权重每日50%</div>
                </div>

                {/* 4. 1d Prize */}
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">
                    1d Prize
                  </span>
                  {/* 金色大数字 */}
                  <div className="text-yellow-500 font-bold text-xl">
                    {item.reward}
                  </div>
                  <div className="text-sm text-gray-500">{item.coinType}</div>
                </div>
              </div>
              {/* 5. 7d 倒计时 */}
              <div className="col-span-2 grid grid-cols-2 gap-x-2 bg-white/5 rounded-lg -mx-2 px-2">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">
                    7d Next draw
                  </span>
                  <div className="text-white-500 font-bold text-xl">
                    {item.countdown_w > 1 && !item.week_r ? (
                      <span>{item.countdown_w} Day</span>
                    ) : Number(item.countdown) <= 0 || item.week_r ? (
                      <span className="text-green-500">Ready to Draw</span>
                    ) : (
                      <ItemTimer countdown={item.countdown} />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">奖池权重每日30%</div>
                </div>

                {/* 6. 7d Prize */}
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">
                    7d Prize
                  </span>
                  <div className="text-yellow-500 font-bold text-xl">
                    {item.reward}
                  </div>
                  <div className="text-sm text-gray-500">{item.coinType}</div>
                </div>
              </div>

              {/* 5. 28d 倒计时 */}
              <div className="col-span-2 grid grid-cols-2 gap-x-2 bg-white/5 rounded-lg -mx-2 px-2">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">
                    28d Next draw
                  </span>
                  <div className="text-white-500 font-bold text-xl">
                    {item.countdown_m > 1 && !item.moon_r ? (
                      <span>{item.countdown_m} Day</span>
                    ) : Number(item.countdown) <= 0 || item.moon_r ? (
                      <span className="text-green-500">Ready to Draw</span>
                    ) : (
                      <ItemTimer countdown={item.countdown} />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">奖池权重每日20%</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">
                    28d Prize
                  </span>
                  <div className="text-yellow-500 font-bold text-xl">
                    {item.reward}
                  </div>
                  <div className="text-sm text-gray-500">{item.coinType}</div>
                </div>
              </div>
            </CardContent>

            {/* 4. 按钮区域：只保留 flex-row (横向排列) 和 w-full */}
            <CardContent className="flex flex-row gap-2 p-0 w-full justify-center mt-2">
              <Button
                onClick={() =>
                  handleOpenAndGetbalance(
                    item.coin_balance_andeData_number,
                    item.decimals,
                    item.name,
                    item.id
                  )
                }
                className="w-40 whitespace-nowrap"
              >
                Deposit to Win
              </Button>

              {(Number(item.countdown) <= 0 || item.week_r || item.moon_r) && (
                <div className="relative inline-block group">
                  <span className="absolute -top-2 -right-8 z-10 flex h-5 items-center justify-center rounded-full bg-yellow-500 px-1.5 text-[11px] font-bold text-black shadow-sm ring-1 ring-white">
                    +10K SGC💰
                  </span>
                  <Button
                    onClick={() =>
                      lottery_home(
                        item.coin_balance_andeData_number,
                        signAndExecute,
                        item.countdown,
                        item.week_r,
                        item.moon_r
                      )
                    }
                    className="w-40 whitespace-nowrap bg-green-600 hover:bg-green-700"
                  >
                    Start Draw
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      {/* 标题栏*/}
      <Modal isOpen={open} onClose={handleClose}>
        {/* 标题栏 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Deposit to {modalItemName}
          </h2>
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
            {/* 1. 添加一个 relative 容器，用于定位内部的 MAX 按钮 */}
            <div className="relative mt-1">
              <input
                // 2. 添加 pr-14 (padding-right)，给右边的按钮留出空间，防止文字重叠
                className="w-full p-2 pr-14 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                type="text"
                placeholder="0.00"
                value={inputAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  // 限制最多两位小数
                  if (/^\d*\.?\d{0,2}$/.test(val)) {
                    setInputAmount(val);
                  }
                }}
              />

              {/* 3. 添加 MAX 按钮 */}
              <button
                type="button" // 防止误触发 Form 提交
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-yellow-500 bg-gray-800 hover:bg-gray-600 border border-gray-600 px-2 py-1 rounded"
                onClick={() => {
                  // 点击时将 inputAmount 设置为 usebalances (转为字符串)
                  setInputAmount(String(dynamicAvailableBalance));
                }}
              >
                MAX
              </button>
            </div>
          </label>

          <div className="text-gray-400">
            Available: {dynamicAvailableBalance}
            {usecointype}
          </div>
        </div>

        <button
          className="mt-6 w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded"
          onClick={handleDepositClick}
        >
          Deposit
        </button>
      </Modal>
      <Card className="flex flex-col items-center text-center !bg-gray-800 sm:col-span-2 shadow-lg border border-gray-700 h-fit">
        <CardHeader className="text-base font-bold text-white tracking-wider border-b border-gray-700 w-full pb-1 mb-1">
          Protocol Revenue Burn SGC
        </CardHeader>
        <CardContent className="w-full px-1 pb-1">
          <div className="w-full flex flex-col">
            <div className="hidden sm:grid sm:grid-cols-5 text-xs text-gray-400 uppercase bg-gray-900 border-b border-gray-700 py-1 px-1 font-semibold">
              <div>Max Supply</div>
              <div>Total Supply</div>
              <div>Burned</div>
              <div>SGC Price</div>
              <div className="text-right"></div>
            </div>

            {/* 2. 数据列表 (Body) */}
            <div className="flex flex-col">
              <div
                key={2}
                className="flex flex-col sm:grid sm:grid-cols-5 border-b border-gray-700 hover:bg-gray-700/30 transition-colors py-1 px-2 gap-2 sm:gap-0"
              >
                {/* Game Name */}
                <div className="flex justify-between items-center sm:block">
                  {/* 手机端显示的标签 */}
                  <span className="sm:hidden text-gray-500 text-sm">
                    Max Supply
                  </span>
                  <span className="font-medium text-white break-all">100B</span>
                </div>

                {/* Balance */}
                <div className="flex justify-between items-center sm:block">
                  <span className="sm:hidden text-gray-500 text-sm">
                    Total Supply
                  </span>
                  <span className="font-medium text-white break-all">
                    {3333665}
                  </span>
                </div>

                {/* Win Prob */}
                <div className="flex justify-between items-center sm:block">
                  <span className="sm:hidden text-gray-500 text-sm">
                    Burned
                  </span>
                  <span className="font-medium text-white break-all">
                    {231}
                  </span>
                </div>

                {/* Rewards */}
                <div className="flex justify-between items-center sm:block">
                  <span className="sm:hidden text-gray-500 text-sm">Price</span>
                  <span className="font-medium text-white break-all">
                    $0.0000000321
                  </span>
                </div>

                {/* Actions (按钮) */}
                <div className="flex gap-2 mt-2 sm:mt-0 justify-end items-center">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-8 px-3 text-xs w-full sm:w-auto"
                    onClick={() => burn_sgc_coin_home(signAndExecute)}
                  >
                    Burn SGC
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
