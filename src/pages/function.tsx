import { SuiGrpcClient } from "@mysten/sui/grpc";
import { Transaction } from "@mysten/sui/transactions";
import {
  SG_PACkages, Navi_Storage, Navi_inshdg_V2, Navi_inshdg_V3, SG_minter, SGC_h_c, Navi_PriceOracle,
  Navi_update_single_price_pgk, Navi_OracleConfig, Navi_OracleHolder, SG_Amindcap_fee
} from "./constantsData.tsx"



const client = new SuiGrpcClient({
  network: "mainnet",
  baseUrl: "https://fullnode.mainnet.sui.io:443",
});
const client_endpoint = "https://graphql.mainnet.sui.io/graphql";


// --- 测试调用 ---
function addressToBase64(hexAddress: string) {
  // 去掉 0x 前缀
  const cleanHex = hexAddress.startsWith("0x")
    ? hexAddress.slice(2)
    : hexAddress;
  // 将 hex 转换为 byte array
  const match = cleanHex.match(/.{1,2}/g);
  if (!match) return "";
  const bytes = new Uint8Array(match.map((byte) => parseInt(byte, 16)));
  // 将 byte array 转换为 binary string
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // 转换为 Base64
  return btoa(binary);
}


export async function getCoins(owner: any, coinType = "0x2::sui::SUI") {
  // 1. 拼装完整的对象结构类型： 0x2::coin::Coin<你的币种>
  const fullType = `0x2::coin::Coin<${coinType}>`;

  const query = `
    query GetCoinObjects($owner: SuiAddress!, $type: String) {
      address(address: $owner) {
        objects(
          filter: { type: $type }
          first: 50
        ) {
          nodes {
            address       # Coin 的 ObjectID
            version       # 版本号
            digest        # 摘要
            contents {
              # 获取对象内容的 JSON 表示，里面包含 balance
              json 
              type {
                repr      # 对象的完整类型
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  const variables = {
    owner,
    type: fullType, // 传入拼装后的完整类型
  };

  const res = await fetch(client_endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors, null, 2));

  const rawList = data?.address?.objects?.nodes || [];

  // 2. 格式化返回结果
  return rawList.map((node: any) => {
    // 余额藏在 contents.json 里面
    const balance = node.contents?.json?.balance || "0";

    return {
      coinType: coinType, // 返回原始传入的 coinType (如 SUI)
      coinObjectId: node.address,
      balance: balance,
      version: node.version,
      digest: node.digest,
    };
  });
}

export function allKeys(obj: any) {
  const seen = new Set();
  let cur = obj;
  while (cur && cur !== Object.prototype) {
    for (const k of Reflect.ownKeys(cur)) seen.add(k);
    cur = Object.getPrototypeOf(cur);
  }
  return [...seen];
}

export async function getSavingsDynamicFieldObject(tableId: any, userAddress: any) {
  const GET_TABLE_VALUE_QUERY = `
    query GetTableValue($tableId: SuiAddress!, $bcsKey: Base64!) {
      address(address: $tableId) {
        dynamicField(name: { type: "address", bcs: $bcsKey }) {
          value {
            ... on MoveValue {
              json
            }
          }
        }
      }
    }
  `;

  // 将地址转为 Base64
  const bcsKey = addressToBase64(userAddress);

  const variables = {
    tableId: tableId,
    bcsKey: bcsKey,
  };

  const res = await fetch(client_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_TABLE_VALUE_QUERY,
      variables,
    }),
  });

  const { data, errors } = await res.json();

  if (errors) {
    console.error("GraphQL Error:", JSON.stringify(errors, null, 2));
    return 0;
  }

  const rawValue = data?.address?.dynamicField?.value?.json;
  return rawValue ? Number(rawValue) : 0;
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


//.................................................................heyuediayong................................................................
export async function deposit_all(account: any, num: any, cointype: string, savingsd: string, pool: string, get_sgc: string, signAndExecute: any,
  update_single_price4: any, update_single_price5: any
) {
  // ... 构建你的交易 ...
  try {
    const tx = new Transaction();
    tx.moveCall({
      target: `${Navi_update_single_price_pgk}::oracle_pro::update_single_price`,
      arguments: [
        tx.object("0x6"),
        tx.object(Navi_OracleConfig),
        tx.object(Navi_PriceOracle),
        tx.object(Navi_OracleHolder),
        tx.object(update_single_price4),
        tx.pure.address(update_single_price5)
      ],
    });
    if (cointype != "0x2::sui::SUI") {
      const coins = await getCoins(account?.address, cointype);
      const coinObjectId_coin = coins[0]["coinObjectId"];
      // 1) 构造一笔 PTB，像平时那样写 moveCall
      if (coins.length > 1) {
        for (let i = 1; i < coins.length; i++) {
          tx.mergeCoins(tx.object(coins[0]["coinObjectId"]), [
            tx.object(coins[i]["coinObjectId"]),
          ]);
        }
      }
      const [coin] = tx.splitCoins(coinObjectId_coin, [num]);
      // 2. 发送交易 (这里不要传 options)
      tx.moveCall({
        target: `${SG_PACkages}::vault::deposit`,
        typeArguments: [cointype],
        arguments: [
          tx.object(savingsd),
          coin,
          tx.object(Navi_Storage),
          tx.object(pool),
          tx.object(Navi_inshdg_V2),
          tx.object(Navi_inshdg_V3),
          tx.object(SG_minter),
          tx.object(SGC_h_c),
          tx.object(get_sgc),
          tx.object("0x6"),
        ],
      });
    } else {
      const [coinSui] = tx.splitCoins(tx.gas, [tx.pure.u64(num)]);
      tx.moveCall({
        target: `${SG_PACkages}::vault::deposit`,
        typeArguments: [cointype],
        arguments: [
          tx.object(savingsd),
          coinSui,
          tx.object(Navi_Storage),
          tx.object(pool),
          tx.object(Navi_inshdg_V2),
          tx.object(Navi_inshdg_V3),
          tx.object(SG_minter),
          tx.object(SGC_h_c),
          tx.object(get_sgc),
          tx.object("0x6"),
        ],
      });
    }
    const response1 = await signAndExecute({
      transaction: tx,
    });
    console.log(JSON.stringify(response1.digest, null, 2));
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects",
        ]
      }
    });
    const status = response.transaction?.effects?.status?.success;
    // console.log(JSON.stringify(status, (key, value) => {
    //   return typeof value === 'bigint' ? value.toString() : value;
    // }, 2));
    return status
  } catch (error) {
    console.error("error:", error);
    return false
  }
};

export async function withdraw(cointype: string, savingsd: string, pool: string, get_sgc: string, signAndExecute: any,
  update_single_price4: any, update_single_price5: any) {
  // ... 构建你的交易 ...
  try {
    const tx = new Transaction();
    tx.moveCall({
      target: `${Navi_update_single_price_pgk}::oracle_pro::update_single_price`,
      arguments: [
        tx.object("0x6"),
        tx.object(Navi_OracleConfig),
        tx.object(Navi_PriceOracle),
        tx.object(Navi_OracleHolder),
        tx.object(update_single_price4),
        tx.pure.address(update_single_price5)
      ],
    });

    tx.moveCall({
      target: `${SG_PACkages}::vault::withdraw`,
      typeArguments: [cointype],
      arguments: [
        tx.object(savingsd),
        tx.object(Navi_Storage),
        tx.object(pool),
        tx.object(Navi_inshdg_V2),
        tx.object(Navi_inshdg_V3),
        tx.object(Navi_PriceOracle),
        tx.object(SG_minter),
        tx.object(SGC_h_c),
        tx.object(get_sgc),
        tx.object("0x6"),
        tx.object("0x5"),
      ],
    });
    const response1 = await signAndExecute({
      transaction: tx,
    });
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects",      // 获取执行结果
        ]
      }
    });
    const status = response.transaction?.effects?.status?.success;
    return status
  } catch (error) {
    console.error("error:", error);
    return false
  }
};

export async function lottery(typeT: any, typeD: any, typeA: any,
  reward_fund_t: any, reward_fund_d: any, pool: any, savingsd: any, signAndExecute: any
) {
  // ... 构建你的交易 ...
  try {
    const tx = new Transaction();
    tx.setGasBudget(300000000); // 例如 0.01 SUI
    tx.moveCall({
      target: `${SG_PACkages}::vault::lottery`,
      typeArguments: [typeT, typeD, typeA],
      arguments: [
        tx.object(SG_Amindcap_fee),
        tx.object(reward_fund_t),
        tx.object(reward_fund_d),
        tx.object(Navi_PriceOracle),
        tx.object(Navi_inshdg_V3),
        tx.object(Navi_inshdg_V2),
        tx.object(Navi_Storage),
        tx.object(pool),
        tx.object(savingsd),
        tx.object("0x8"),
        tx.object("0x6"),
        tx.object("0x5"),
      ],
    });
    const response1 = await signAndExecute({
      transaction: tx,
    });
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects",      // 获取执行结果
        ]
      }
    });
    const status = response.transaction?.effects?.status?.success;
    return status
  } catch (error) {
    console.error("error:", error);
    return false
  }
};


export async function entry_get_sgc_coin(type: any, savingsd: any, get_sgc: any, signAndExecute: any) {
  // ... 构建你的交易 ...
  try {
    const tx = new Transaction();
    tx.moveCall({
      target: `${SG_PACkages}::vault::entry_get_sgc_coin`,
      typeArguments: [type],
      arguments: [
        tx.object(SG_minter),
        tx.object(SGC_h_c),
        tx.object(savingsd),
        tx.object(get_sgc),
        tx.object("0x6"),
      ],
    });
    const response1 = await signAndExecute({
      transaction: tx,
    });
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects",      // 获取执行结果
        ]
      }
    });
    const status = response.transaction?.effects?.status?.success;
    return status
  } catch (error) {
    console.error("error:", error);
    return false
  }
};
// 或 const util = require('node:util');
// console.log(
//   util.inspect(out, {
//     depth: null, // 无限制深度
//     colors: true, // 终端着色
//     maxArrayLength: null, // 展示完整数组
//     compact: true, // 更易读的多行输出
//   })
// );

