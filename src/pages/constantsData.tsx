// src/constants/A.tsx
//.................................SG................................................................
export const SG_PACkages =
  "0x70cdf2b8aef20573bf7980da5b8b6d620cfb40d65ef724fff097c63de50adb8f";
export const SG_Burn_SGC_fee =
  "0xbaef4b2e61d57fc139114a0b9fa16b14282bb36d9ed316eb011d91bccb13229f";
export const SG_minter =
  "0xdfd42bd0f9acb2a01eec27342d74968306d89a1f2e085853644c305f84a165f9";
export const SGC_h_c =
  "0x38dd5406e12830176b2d38d14851ae652f34a1fdff223ab36ace75c18de0019b";
export const SGCcoin_type =
  "0x70cdf2b8aef20573bf7980da5b8b6d620cfb40d65ef724fff097c63de50adb8f::sgc::SGC";

//.................................NAVI................................................................
export const Navi_Storage =
  "0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe";
export const Navi_inshdg_V2 =
  "0xf87a8acb8b81d14307894d12595541a73f19933f88e1326d5be349c7a6f7559c";
export const Navi_inshdg_V3 =
  "0x62982dad27fb10bb314b3384d5de8d2ac2d72ab2dbeae5d801dbdb9efa816c80";
export const Navi_RewadFun_NAVI =
  "0x1a3f9fcfdfac10e92c99220203f7c4bb502558692f0be0f2cb5f788b4e12a6b5";
export const Navi_RewadFun_Vsui =
  "0x7093cf7549d5e5b35bfde2177223d1050f71655c7f676a5e610ee70eb4d93b5c";
export const Navi_PriceOracle =
  "0x1568865ed9a0b5ec414220e8f79b3d04c77acc82358f6e5ae4635687392ffbef";
export const Navi_update_single_price_pgk =
  "0xc2d49bf5e75d2258ee5563efa527feb6155de7ac6f6bf025a23ee88cd12d5a83";
export const Navi_OracleConfig =
  "0x1afe1cb83634f581606cc73c4487ddd8cc39a944b951283af23f7d69d5589478";
export const Navi_OracleHolder =
  "0xaa0315f0748c1f24ddb2b45f7939cff40f7a8104af5ccbc4a1d32f870c0b4105";
export const Navi_PACKAGE_ID =
  "0xee0041239b89564ce870a7dec5ddc5d114367ab94a1137e90aa0633cb76518e0";
export const Navi_PACKAGE_MODULE = "incentive_v3";
export const Navi_PACKAGE_FUN = "get_user_claimable_rewards";
//.................................FolX................................................................
export const FolX_Contert =
  "0xb65dcbf63fd3ad5d0ebfbf334780dc9f785eff38a4459e37ab08fa79576ee511";
export const FolX_Mingter =
  "0x2a30f1bfa9594e0e9ca37581268b3fee4b6965a70c38eb76e204334980619c24";
//..............................admin...................................................................

export const AdminCap =
  "0x37561559775b193e5528a1c8a22ae67eeffa1a32ce00567dc327d393ebe73a09";
export const upgrade =
  "0x33ded4285c4d17102f99bf0f34246af484d81414b941a2218fd800c33f8e2faf";
export const SGC_AdminTolel =
  "0x760949ea70b741efd912f622b8078e83bf8df8c3b53969c9c842856625c519bf"; //

//................................................记得添加.................................................................
export const Navi_reward_null_or_one = [
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  "0xc889d78b634f954979e80e622a2ae0fece824c0f6d9590044378a2563035f32f",
  "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
  "0x7093cf7549d5e5b35bfde2177223d1050f71655c7f676a5e610ee70eb4d93b5c",
];

export const burn_sgc = [
  "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
];
export const Navi_update_single_price: Record<string, string[]> = {
  //对上const SUI   DEEP 的name
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP":
    [
      "0x8c7f3a322b94cc69db2a2ac575cbd94bf5766113324c3a3eceac91e3e88a51ed",
      "0x4558092b08ad1b33b0eb536f91a4655693c2390ac568f06de6f6fad827888600",
    ],
  "0x2::sui::SUI": [
    "0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37",
    "0x2cab9b151ca1721624b09b421cc57d0bb26a1feb5da1f821492204b098ec35c9",
  ],
  "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT":
    [
      "0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37",
      "0x086bb5540047b3c77ae5e2f9b811c7ef085517a73510f776753c8ee83d19e62c",
    ],
};
export const Navi_reward_data: Record<string, string> = {
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP":
    "0xc889d78b634f954979e80e622a2ae0fece824c0f6d9590044378a2563035f32f",
  "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT":
    "0x7093cf7549d5e5b35bfde2177223d1050f71655c7f676a5e610ee70eb4d93b5c",
};

export const SUI_Navi = {
  id: "SUI-NAVI",
  name: "SUI",
  coin_balance_andeData_number: 0,
  time_per_round: 180000, //108000000,
  navi_pool_number: 0,
  // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
  data: "0xebfd85ebad070e0eb173a170e98176f863786b4292a081060c72d3cba3a39c70",
  get_sgc: "0x40cf71e5fade7a8cee026b8ffa0119c46e30d64dc79159bea63038ff38e577c9",
  data_acp_owner:
    "0x9c90fdb472b67ad4c7fdb34c02d60074164949d35adaca495314eac25d2d9a28",
  fun_type: "0x2::sui::SUI",
  navi_pool_adder:
    "0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5",
  decimals: 9,
  dynamic_field: {
    adder_node:
      "0xc0ade1abeddadb123edff325eaa66ab0836d84ddc996e9aea814b424aa9dd564",
    internal_node_data:
      "0xfeb142b0ab87c466f5ffa54aec33109ed5323dfbbab27131d63d22a8bbaacfe2",
    leaf_node_data:
      "0x4c3acbb94b00a86ee8723c75928254a5583d624b6ba9b41c9e6479d341cba4ed",
    node_adder:
      "0x830bfca62959a3e93274902ca5cf0f198f390c23b8b4c4ce1287305ad6e7bb15",
    Prize_pool_monthly:
      "0x4bd69c39b5c2353ccc20836c8c68f6138e4f7cf85a9e7bbd185ae96e4b91c7cf",
    Prize_pool_weekly:
      "0x690a4b9ab00db8abd3711706bf3145ff72c1e2a7cf41d314969c72451dd64e41",
    savings:
      "0x67b4c3b1b2106ce76853cc0d1522d1c4d62597c1972e38e4dfd0ec727c3c53cb",
  },
};
export const DEEP_Navi = {
  id: "DEEP-NAVI",
  name: "DEEP",
  coin_balance_andeData_number: 1,
  time_per_round: 180000, //108000000,
  navi_pool_number: 15,
  // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
  data: "0x6dfe8de3e6c18c4714c6d0ef1ed5ae596e267068f850b51775e476b76d8292cd",
  get_sgc: "0x1f9702e47e0a88884f8d854be5f66221e274aee61f51078ca48f55c73c1dc4c6",
  data_acp_owner:
    "0xd322f842668ac0bb8f1c28bf115e9879ef14ac1513d5b627f14f06c53dfd11e3",
  fun_type:
    "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  navi_pool_adder:
    "0x08373c5efffd07f88eace1c76abe4777489d9ec044fd4cd567f982d9c169e946",
  decimals: 6,
  dynamic_field: {
    adder_node:
      "0xe2c8d59c42f9916d08ffae117b9f85cac51db8759fa069a1e1743bb00fdcc191",
    internal_node_data:
      "0x0c41fac01f72fe32cfb9875cf6e795312e8870bc571d0838afc70b4208c94e9f",
    leaf_node_data:
      "0x48eef7fa5d203a8953d3a61abd305be04e15818cdaf4fdff14f02c98de8a8560",
    node_adder:
      "0x3b5fe520b535f1ef6cd2387af60d51cd6b264e4766e1addc1060c035655ea990",
    Prize_pool_monthly:
      "0x5c263152ca2162ff06debe9e96f5d2cb656a414286cb23056bd8bc48bd2d51e2",
    Prize_pool_weekly:
      "0xebca8a015a45d13033d7c14bdec5350eb0e3ca30d0fb001ad1f40bef74347e10",
    savings:
      "0x2f9abf247fad0a3d9e56702d69bc29f822f3a01e621c5200f7c565d65c0a0d33",
  },
};

// [33 items
// 0:string"0x2cab9b151ca1721624b09b421cc57d0bb26a1feb5da1f821492204b098ec35c9"
// 1:string"0x70a79226dda5c080378b639d1bb540ddea64761629aa4ad7355d79266d55af61"
// 2:string"0xf72d8933873bb4e5bfa1edbfa9ff6443ec5fac25c1d99ba2ef37f50a125826f3"
// 3:string"0x44d92366eba1f1652ec81f34585406726bef267565a2db1664ffd5ef18e21693"
// 4:string"0x5ac98fc1e6723af2a6d9a68a5d771654a6043f9c4d2b836b2d5fb4832a3be4f2"
// 5:string"0x086bb5540047b3c77ae5e2f9b811c7ef085517a73510f776753c8ee83d19e62c"
// 6:string"0xac934a2a2d406085e7f73b460221fe1b11935864605ba58cdbb8e21c15f12acd"
// 7:string"0x4324c797d2f19eff517c24adec8b92aa2d282e44f3a5cafb36d6c4b30d7f2dca"
// 8:string"0x1bf4727242a61d892feef6616d3e40a3bd24b64b5deb884054e86cb9360556c4"
// 9:string"0x9a0656e1e10a0cdf3f03dce9db9ad931f51dc6eac2e52ebfbf535dfbcf8100ef"
// 10:string"0xe120611435395f144b4bcc4466a00b6b26d7a27318f96e148648852a9dd6b31c"
// 11:string"0x9a6ffc707270286e98e8d0f654ce38f69efbc302ac98e2deb11fbad2211600f0"
// 12:string"0x11ddf2ac1868d493e2487deeb2a0c2791bb7ca69632c8c5fefe85e09390be093"
// 13:string"0xc771ec0ca245857f30195ce05197a7b3ab41c58c1e8abe0661919d90675ad63d"
// 14:string"0xdf9b254a7a64742e1edf8c48bd2a1f182b52f020de2ab070ae0e3f9228d05280"
// 15:string"0x4558092b08ad1b33b0eb536f91a4655693c2390ac568f06de6f6fad827888600"
// 16:string"0x843b39829166bd97d61843b8967405f13d443e066ce2f4fa0685f187974d34bd"
// 17:string"0xd8286c11df7e49496ee75622ae4132c56385c30b4bedb392e36c0699a52a1d52"
// 18:string"0x93c1b815f64ef7c4311d74ff7c0ca1e47739c3ac31fdee0068c30887633ba2fb"
// 19:string"0xdeba21105ff41300f8829aaeba45fdec25d1533a64d504ef0348ff005da3fbe5"
// 20:string"0xd7a8c920db9f8b5c3c300307d88fca53684fd15b760977dbf8f0adc6e55783bd"
// 21:string"0x4e4666c82c476f0b51b27c5ed8c77ab960aa5e4c3a48796e179d721b471e3b7e"
// 22:string"0x2611dff736233a6855e28ae95f8e5f62a6bf80653ddb118bf012fd783d530fa1"
// 23:string"0x8ee4d9d61d0bfa342cdb3ee8b7f047c91f0b586e0ff66fd6e8fc761e235e5409"
// 24:string"0x924bf9f715d857605f9f4146537fffc0414809c85845ce9d695f3645a22a5426"
// 25:string"0xe8a90eed4e6de66e114e6d00802852a9529054a33de0e8460ec37109f0d09d5e"
// 26:string"0xbe3a049bbbdc596cc6109fcff0bc2c968e7533bcc675e5718f7ecdf3c5dae506"
// 27:string"0xebe4e84fd1b1e28622274640c1bce7f4d79f43e95c6f54bec3880781b88a0d92"
// 28:string"0xc7f87ba22d24e8ce5764f05f775c10f87fc04e2a411c6ad7922fc936e8f7b8e3"
// 29:string"0x1d7e07f8fcc6a51d55d69f425cdc84c23807aeac6516dc5d909fe537d7c6eeb1"
// 30:string"0x9efc82d7786261800fa78fa347e1b39bf3d3808e4a3e192fb3677fa78a324928"
// 31:string"0x5fc8ae7618a0c1551d0e5f5879d144ae5862a070f6a87c6c21c18dae3cb0645b"
// 32:string"0xc0dddc22b53142a0b283682d9025e22c8beedf20dcac4023229d5219e8d35a43"
// ]
