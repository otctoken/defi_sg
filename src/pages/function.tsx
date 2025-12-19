import { SuiGrpcClient } from "@mysten/sui/grpc";
import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { bcs } from "@mysten/sui/bcs";
import {
  SG_PACkages,
  Navi_Storage,
  Navi_inshdg_V2,
  Navi_inshdg_V3,
  SG_minter,
  SGC_h_c,
  Navi_PriceOracle,
  Navi_update_single_price_pgk,
  Navi_OracleConfig,
  Navi_OracleHolder,
  SG_Burn_SGC_fee,
  burn_sgc,
  FolX_Contert,
  Navi_PACKAGE_ID,
  Navi_PACKAGE_MODULE,
  Navi_PACKAGE_FUN,
  Navi_reward_null_or_one,
  Navi_reward_data,
  Navi_update_single_price,
} from "./constantsData.tsx";

const client = new SuiGrpcClient({
  network: "mainnet",
  baseUrl: "https://fullnode.mainnet.sui.io:443",
});
const client_endpoint = "https://graphql.mainnet.sui.io/graphql";

const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
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

export async function getSavingsDynamicFieldObject(
  tableId: any,
  userAddress: any
) {
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
async function dev_get_admin_fee(COIN_TYPE_T: any) {
  // 1. 初始化 Client
  const client = new SuiClient({ url: "https://rpc-mainnet.suiscan.xyz:443" }); // 或 'testnet'

  const SENDER_ADDRESS =
    "0x82242fabebc3e6e331c3d5c6de3d34ff965671b75154ec1cb9e00aa437bbfa44"; // 模拟发送者的地址 (用于权限检查)

  const tx = new Transaction();
  tx.moveCall({
    target: `${SG_PACkages}::vault::withdraw_burning_sgc`,
    typeArguments: [COIN_TYPE_T], // 填入泛型 T
    arguments: [tx.object(SG_Burn_SGC_fee)],
  });

  try {
    // 4. 执行 devInspectTransactionBlock
    // 这不会消耗 Gas，也不会上链
    const result = await client.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: SENDER_ADDRESS,
    });

    // 5. 检查执行是否成功
    if (result.effects.status.status === "failure") {
      console.error("error:", result.effects.status.error);
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error("err:", e);
    return false;
  }
}
export async function devClaimableRewards(acp_owner: any) {
  const ClaimableReward = bcs.struct("ClaimableReward", {
    asset_coin_type: bcs.string(),
    reward_coin_type: bcs.string(),
    user_claimable_reward: bcs.u256(),
    user_claimed_reward: bcs.u256(),
    rule_ids: bcs.vector(bcs.Address),
  });

  const client = new SuiClient({ url: "https://rpc-mainnet.suiscan.xyz:443" });

  const SENDER_ADDRESS =
    "0x82242fabebc3e6e331c3d5c6de3d34ff965671b75154ec1cb9e00aa437bbfa44"; // 模拟发送者的地址 (用于权限检查)
  const tx = new Transaction();

  // 2. 构建 Move 调用
  // 函数签名: get_user_claimable_rewards(clock, storage, incentive, user_address)
  tx.moveCall({
    target: `${Navi_PACKAGE_ID}::${Navi_PACKAGE_MODULE}::${Navi_PACKAGE_FUN}`,
    arguments: [
      tx.object("0x6"), // Clock (固定 ID)
      tx.object(Navi_Storage), // Storage Object
      tx.object(Navi_inshdg_V3), // Incentive Object
      tx.pure.address(acp_owner), // User Address (注意这里是 pure.address)
    ],
  });

  try {
    // 3. 执行 Dev Inspect
    const result = await client.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: SENDER_ADDRESS,
    });

    if (result.effects.status.status === "failure") {
      console.error("err:", result.effects.status.error);
      return;
    }

    // 4. 解析返回值
    // 返回类型是 vector<ClaimableReward>
    const returnValues = result.results![0].returnValues;

    if (!returnValues || returnValues.length === 0) {
      console.log("err");
      return;
    }

    // returnValues[0] 是 tuple 的第一个元素 (这里只有一个返回值)
    const rawBytes = Uint8Array.from(returnValues[0][0]);

    // 使用我们定义的 BCS 结构解析 vector
    const data = bcs.vector(ClaimableReward).parse(rawBytes);
    //{asset_coin_type: 'deeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP',
    // reward_coin_type: 'deeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP',
    //  user_claimable_reward: '1575', user_claimed_reward: '2174',
    // rule_ids: Array(1)}
    return data;
  } catch (e) {
    console.error("err:", e);
  }
}

function get_type_reward_fund(reward_data: any) {
  //Navi_reward_null_or_one, Navi_reward_data
  let typeT;
  let typeD;
  let reward_fund_t;
  let reward_fund_d;
  if (reward_data?.length < 1) {
    typeT = Navi_reward_null_or_one[0];
    reward_fund_t = Navi_reward_null_or_one[1];
    typeD = Navi_reward_null_or_one[2];
    reward_fund_d = Navi_reward_null_or_one[3];
  } else if (reward_data?.length < 2) {
    typeT = `0x${reward_data[0].reward_coin_type}`;
    reward_fund_t = Navi_reward_data[typeT];
    if (typeT != Navi_reward_null_or_one[0]) {
      typeD = Navi_reward_null_or_one[0];
      reward_fund_d = Navi_reward_null_or_one[1];
    } else {
      typeD = Navi_reward_null_or_one[2];
      reward_fund_d = Navi_reward_null_or_one[3];
    }
  } else {
    typeT = `0x${reward_data[0].reward_coin_type}`;
    reward_fund_t = Navi_reward_data[typeT];
    typeD = `0x${reward_data[1].reward_coin_type}`;
    reward_fund_d = Navi_reward_data[typeD];
  }
  return [typeT, typeD, reward_fund_t, reward_fund_d];
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
export async function getObjects_multiple(ids: any) {
  // 这样可以在一次查询中请求多个独立的字段
  const queryFields = ids
    .map(
      (id: any, index: any) => `
    obj_${index}: object(address: "${id}") {
      address
      asMoveObject {
        contents { json }  
      }
    }
  `
    )
    .join("\n");

  const query = `
    query BatchGet {
      ${queryFields}
    }
  `;
  const res = await fetch(client_endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}\n${text}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(
      "GraphQL errors!:\n" + JSON.stringify(json.errors, null, 2)
    );
  }

  const data = json.data;
  if (!data) return [];
  // 按顺序还原数组
  const objects = ids.map((_: any, index: any) => data[`obj_${index}`]);
  return objects;
}

export async function get_single_price() {
  let obj_list = [];
  for (const ids of Object.values(Navi_update_single_price)) {
    // 这里的 ids 就是那个数组，没有 coinType 干扰了
    obj_list.push(ids[0]);
  }
  const obj_price_data = await getObjects_multiple(obj_list);
  let pricelit = [];
  for (const obj of obj_price_data) {
    const decimal =
      10 **
      Number(
        obj.asMoveObject.contents.json.price_info.price_feed.price.expo
          .magnitude
      );
    const price =
      Number(
        obj.asMoveObject.contents.json.price_info.price_feed.price.price
          .magnitude
      ) / decimal;
    pricelit.push(price);
  }
  let obj_price: Record<string, number> = {};
  Object.keys(Navi_update_single_price).forEach((coinType, index) => {
    obj_price[coinType] = pricelit[index];
  });
  return obj_price;
}

//.................................................................heyuediayong................................................................
export async function deposit_all(
  account: any,
  num: any,
  cointype: string,
  savingsd: string,
  pool: string,
  get_sgc: string,
  signAndExecute: any,
  fun_type: any
) {
  // ... 构建你的交易 ...
  try {
    const update_single_price4 = Navi_update_single_price[fun_type][0];
    const update_single_price5 = Navi_update_single_price[fun_type][1];
    const tx = new Transaction();
    tx.moveCall({
      target: `${Navi_update_single_price_pgk}::oracle_pro::update_single_price`,
      arguments: [
        tx.object("0x6"),
        tx.object(Navi_OracleConfig),
        tx.object(Navi_PriceOracle),
        tx.object(Navi_OracleHolder),
        tx.object(update_single_price4),
        tx.pure.address(update_single_price5),
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
    await wait(1500);
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: ["effects"],
      },
    });
    const status = response.transaction?.effects?.status?.success;
    // console.log(JSON.stringify(status, (key, value) => {
    //   return typeof value === 'bigint' ? value.toString() : value;
    // }, 2));
    return status;
  } catch (error) {
    console.error("error:", error);
    return false;
  }
}

export async function withdraw(
  cointype: string,
  savingsd: string,
  pool: string,
  get_sgc: string,
  signAndExecute: any,
  fun_type: any
) {
  // ... 构建你的交易 ...
  try {
    const update_single_price4 = Navi_update_single_price[fun_type][0];
    const update_single_price5 = Navi_update_single_price[fun_type][1];
    const tx = new Transaction();
    tx.moveCall({
      target: `${Navi_update_single_price_pgk}::oracle_pro::update_single_price`,
      arguments: [
        tx.object("0x6"),
        tx.object(Navi_OracleConfig),
        tx.object(Navi_PriceOracle),
        tx.object(Navi_OracleHolder),
        tx.object(update_single_price4),
        tx.pure.address(update_single_price5),
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
    await wait(1500);
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects", // 获取执行结果
        ],
      },
    });
    const status = response.transaction?.effects?.status?.success;
    return status;
  } catch (error) {
    console.error("error:", error);
    return false;
  }
}

export async function lottery(
  typeA: any,
  pool: any,
  savingsd: any,
  acp_owner: any,
  signAndExecute: any,
  name: any
) {
  try {
    const reward_data = await devClaimableRewards(acp_owner);
    const [typeT, typeD, reward_fund_t, reward_fund_d] =
      get_type_reward_fund(reward_data);
    console.log(name);
    const tx = new Transaction();
    tx.setGasBudget(300000000); // 例如 0.01 SUI
    tx.moveCall({
      target: `${SG_PACkages}::vault::lottery`,
      typeArguments: [typeT, typeD, typeA],
      arguments: [
        tx.object(SG_Burn_SGC_fee),
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
    await wait(1500);
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects", // 获取执行结果
        ],
      },
    });
    const status = response.transaction?.effects?.status?.success;
    return status;
  } catch (error) {
    console.error("error:", error);
    return false;
  }
}

export async function entry_get_sgc_coin(
  type: any,
  savingsd: any,
  get_sgc: any,
  signAndExecute: any
) {
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
    await wait(1500);
    const { response } = await client.ledgerService.getTransaction({
      digest: response1.digest,
      readMask: {
        paths: [
          "effects", // 获取执行结果
        ],
      },
    });
    const status = response.transaction?.effects?.status?.success;
    return status;
  } catch (error) {
    console.error("error:", error);
    return false;
  }
}

export async function burn_sgc_coin(signAndExecute: any) {
  // ... 构建你的交易 ... burn_sgc,FolX_Contert
  try {
    const suibool = await dev_get_admin_fee("0x2::sui::SUI");

    let coin_list = [];
    for (const type of burn_sgc) {
      const coin_ = await dev_get_admin_fee(type);
      if (coin_) {
        coin_list.push(type);
      }
    }
    if (suibool || coin_list.length > 0) {
      const tx = new Transaction();
      if (suibool) {
        tx.moveCall({
          target: `${SG_PACkages}::vault::burn_sgc_sui`,
          arguments: [
            tx.object(SG_minter),
            tx.object(SG_Burn_SGC_fee),
            tx.object(FolX_Contert),
          ],
        });
      }
      if (coin_list.length > 0) {
        for (const type of coin_list) {
          tx.moveCall({
            target: `${SG_PACkages}::vault::burn_sgc`,
            typeArguments: [type],
            arguments: [
              tx.object(SG_minter),
              tx.object(SG_Burn_SGC_fee),
              tx.object(FolX_Contert),
            ],
          });
        }
      }

      const response1 = await signAndExecute({
        transaction: tx,
      });
      await wait(1500);
      const { response } = await client.ledgerService.getTransaction({
        digest: response1.digest,
        readMask: {
          paths: [
            "effects", // 获取执行结果
          ],
        },
      });
      const status = response.transaction?.effects?.status?.success;
      return status;
    } else {
      alert("The SGC burn process has just completed. Please try again later.");
    }
  } catch (error) {
    console.error("error:", error);
    return false;
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
