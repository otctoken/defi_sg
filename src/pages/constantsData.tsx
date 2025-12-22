// src/constants/A.tsx
//.................................SG................................................................
export const SG_PACkages =
  "0xb85447e328ca363f4121459093958560b4df45cecb89d4804c8d01def4361eb2";
export const SG_Burn_SGC_fee =
  "0x4309f349754fdec2a28693b3116a1c1edf2c98bb16296dabbf48fdb8d7205977";
export const SG_minter =
  "0x3ded5db0c543aa305c9fc9c368927de19ddf3bebdc1eaf84735730146bacec29";
export const SGC_h_c =
  "0x1942a64dfee7c2794b0050a8557624289342b484a5f0ef7fa567baff7da82697";
export const SGCcoin_type =
  "0xb85447e328ca363f4121459093958560b4df45cecb89d4804c8d01def4361eb2::sgc::SGC";

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
  "0x97944a66a359f9350be5699654a485e9c17befa01d8d3b65673396e95418ca12";
export const upgrade =
  "0x851974ee26c82bae78be29e9d1cec398e0411869ba1cd2e5410d59484387f7b9";
export const SGC_AdminTolel =
  "0x39898991a1ea3eae4ec0ff64e6c869ee9f0ef4dd08df64f53cb64c220c33b91f"; //

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
  time_per_round: 60000, //108000000,
  navi_pool_number: 0,
  // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
  data: "0xcee7f7a481a4451ad57bc27af2ad66983789dd831e8a2b4842f28bb526e05070",
  get_sgc: "0x6fc41aa45d3623ffa8215f86b21b7969f0d152b855e0bf3719f92e3b30d2e48a",
  data_acp_owner:
    "0x9568a2beb38cf88a6ef98c8792ad8551e8618ab0aa113cb3f93c86774abc48c5",
  fun_type: "0x2::sui::SUI",
  navi_pool_adder:
    "0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5",
  decimals: 9,
  dynamic_field: {
    adder_node:
      "0x6fcb1354eef17b8fb875a9fc1edb333404e07f105fc509af5854d5ff3638420e",
    internal_node_data:
      "0xcf3e046e20dfdf72de83aa7fbbefa9fdcd473e9711df60938e9b4a72aadb5a85",
    leaf_node_data:
      "0x04795d28ee4e494119089ebb6e3111bc5d2257ddd550cf5d47e6e1c729800d68",
    node_adder:
      "0x035426465401e0cbbae624e910b664f714407bd91b37378ed4ff937c8f724ef0",
    Prize_pool_monthly:
      "0x9bdb9d52375919b2eff7e96844a515ad2a726f3677aa7baeba738508662904db",
    Prize_pool_weekly:
      "0x07499c8a4cac7c565e6c41f19cfd90187a8a406af24d4371ee077705d5cb4062",
    savings:
      "0x5542758ac6c7a2388cde1b9fd7a4b592d0306c1d06766f4f5e3287dd51af727d",
  },
};
export const DEEP_Navi = {
  id: "DEEP-NAVI",
  name: "DEEP",
  coin_balance_andeData_number: 1,
  time_per_round: 60000, //108000000,
  navi_pool_number: 15,
  // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
  data: "0x2f892a1f8521817ec18c8bbeebddb5c32972c3b9bb6da09fe9f1efe877101923",
  get_sgc: "0xdbf47b8f48924ddac25d8c0e4a134bf25c760dd353052fdc98b98ac5285e2ce4",
  data_acp_owner:
    "0xde424f0d2c776c2ae81902fc31808f5d6795ed61ed490c4e962f7821157b1aa9",
  fun_type:
    "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  navi_pool_adder:
    "0x08373c5efffd07f88eace1c76abe4777489d9ec044fd4cd567f982d9c169e946",
  decimals: 6,
  dynamic_field: {
    adder_node:
      "0x63d88607a83575590617bfdcbfa08677a636ed4e531139a6b873b8b07a777976",
    internal_node_data:
      "0x1a47c58e24e4f546a6785ad6f5823fba3eddec642cc337d31bc7c6a7eec60d22",
    leaf_node_data:
      "0x5456a7d930d4ed7b8f98c77b7e095fcb29c2bc6742ccedf25749270d0eb0e85d",
    node_adder:
      "0xf42a431bd17d3d9b2bdd2ac7496438c6eaaa54b27d8c6ac4dec0999c200f0b62",
    Prize_pool_monthly:
      "0xea0fe0dae34346ab6b9fcd5904c2d7963b757566be2b865f28f6954c639164f1",
    Prize_pool_weekly:
      "0x32cfdb8ee427261d6b4292ab0aba989117ab75a82d5f24bd14274cb0605afe81",
    savings:
      "0x7879a2a9ee774022cd400409de9e856dc0f0f40843384c83aed848a173df255c",
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
