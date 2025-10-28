import { SuiGrpcClient } from "@mysten/sui/grpc";

const client = new SuiGrpcClient({
  network: "mainnet",
  baseUrl: "https://fullnode.mainnet.sui.io:443",
});

export function allKeys(obj: any) {
  const seen = new Set();
  let cur = obj;
  while (cur && cur !== Object.prototype) {
    for (const k of Reflect.ownKeys(cur)) seen.add(k);
    cur = Object.getPrototypeOf(cur);
  }
  return [...seen];
}




export async function getBalance(adder: string, cointype: string) {
  try {
    const res = await client.stateService.getBalance({
      owner: adder,
      coinType: cointype,
    });
    const raw = res.response?.balance?.balance;
    return raw ? BigInt(raw) : 0n;
  } catch (e) {
    console.error(`getBalance err:`, e);
    return 0;
  }
}

// 或 const util = require('node:util');
// console.log(
//   util.inspect(out, {
//     depth: null, // 无限制深度
//     colors: true, // 终端着色
//     maxArrayLength: null, // 展示完整数组
//     compact: true, // 更易读的多行输出
//   })
// );

