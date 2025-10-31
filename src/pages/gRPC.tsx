// import { SuiGrpcClient } from "@mysten/sui/grpc";

// const client = new SuiGrpcClient({
//     network: "mainnet",
//     baseUrl: "https://fullnode.mainnet.sui.io:443",
// });

// export async function getBalance(adder: string, cointype: string) {
//     try {
//         const res = await client.stateService.getBalance({
//             owner: adder,
//             coinType: cointype,
//         });
//         const raw = res.response?.balance?.balance;
//         return raw ? BigInt(raw) : 0n;
//     } catch (e) {
//         console.error(`getBalance err:`, e);
//         return 0;
//     }
// }
import { bcs } from "@mysten/sui/bcs";
const endpoint = "https://graphql.mainnet.sui.io/graphql";

/** 工具：把 u64/address 编成给 dynamicField 用的 Base64（name.bcs） */
function u64ToB64(n: number | bigint | string) {
  // 建议传 bigint 或字符串，避免超过 JS 安全整数
  const ser = bcs.u64().serialize(n);
  // 如果你的 SerializedBcs 有 toBase64()，用这个更省事：
  return ser.toBase64
    ? ser.toBase64()
    : Buffer.from(ser.toBytes()).toString("base64");
}
function addrToB64(addr: string) {
  return bcs.Address.serialize(addr).toBase64();
}
export async function getBalances(owner: string, coinTypes: any) {
  const query = `
    query Balances($owner: SuiAddress!, $coinTypes: [String!]!) {
      address(address: $owner) {
        multiGetBalances(keys: $coinTypes) {
          coinType { repr }
          totalBalance
        }
      }
    }
  `;

  const variables = {
    owner,
    coinTypes,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors, null, 2));
  const rawList = data.address.multiGetBalances;
  const balancesOnly = rawList.map((b: any) => Number(b.totalBalance));
  return balancesOnly;
}
//......................................................................................................................


export async function getObjectDF(id: string) {
  const query = `
       query Obj($id: SuiAddress!) {
      object(address: $id) {
        asMoveObject {
          contents { json }  
        }
      }
    }
  `;
  const variables = { id };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
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
  const obj = json.data.object;
  if (!obj) return null;

  return obj?.asMoveObject?.contents?.json;
}


//......................................................................................................................
export async function getDFparentAdder(parent: string, userAddress: string) {
  const query = `
    query Q($parent: SuiAddress!, $nameType: String!, $nameBcs: Base64!) {
      address(address: $parent) {
        dynamicField(name: { type: $nameType, bcs: $nameBcs }) {
          value {
            ... on MoveValue {
              bcs
              json
              type { repr }
            }
          }
        }
      }
    }
  `;
  const variables = {
    parent,
    nameType: "address",
    nameBcs: addrToB64(userAddress),
  };
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  }).then((r) => r.json());

  // 只要 value（若不存在则为 null）
  const value = resp?.data?.address?.dynamicField?.value?.json ?? null;
  return value;
}

//......................................................................................................................
export async function getDFparentU64(parent: string, keyU64: number) {
  const query = `
    query Q($parent: SuiAddress!, $nameType: String!, $nameBcs: Base64!) {
      address(address: $parent) {
        dynamicField(name: { type: $nameType, bcs: $nameBcs }) {
          value { ... on MoveValue { bcs json type { repr } } }
        }
      }
    }
  `;
  const variables = { parent, nameType: "u64", nameBcs: u64ToB64(keyU64) };
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  }).then((r) => r.json());
  // 直接返回 value
  return resp?.data?.address?.dynamicField?.value?.json ?? null;
}

//......................................................................................................................


