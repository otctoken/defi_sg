// src/constants/A.tsx
//.................................SG................................................................
export const SG_PACkages =
  "0x6dd7807b2ad7e6dc4d48294df3b4dcaf9d736850c2100379fd5ec269b30703a7";
export const SG_Burn_SGC_fee =
  "0x15f81e1e6a3e5a015d3622b4a908fa836fcb89acbbca83e420bc7f02f0c1c5eb";
export const SG_minter =
  "0x03ee5726ac298a31be91ed5341bc2a67bfc063c58905fae99b56f1d2653b0647";
export const SGC_h_c =
  "0xc900b943c60aec23507a54999df29db76a7d04593abbe5801aa1b484be93748d";
export const SGCcoin_type =
  "0x6dd7807b2ad7e6dc4d48294df3b4dcaf9d736850c2100379fd5ec269b30703a7::sgc::SGC";

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
  "0x15b272b79500ac1a58eb56ea67acb70358ccd1899e92735e9dc75b52a4993895";
export const upgrade =
  "0x782fb39daeff7facef1d13e1cbcb911430435b0cf7e3cbe67ff9feb83699eb3b";
export const SGC_AdminTolel =
  "0x92119ac939979a3d284bf3c7014cd9bfc632bc12df3d5a712ed541a486396ea9"; //

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
  data: "0xb074ab44cf6b2153ca21c5679b269c77fdae5d7ff32804d611f951fadd03df5b",
  get_sgc: "0x54eb819d00167f9fc82392fe23864b229540ed3cf96d8527aa84cb3767a0f946",
  data_acp_owner:
    "0xb478f3a4e08e7c29aac1ae4a14afb870bde04014d5a07ab056010247ba2c8026",
  fun_type: "0x2::sui::SUI",
  navi_pool_adder:
    "0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5",
  decimals: 9,
  dynamic_field: {
    adder_node:
      "0xa4a1b669201c5790c6642a4950afc53950fa10a210549e3152d9940dfb73b10f",
    internal_node_data:
      "0x0a54c6382feeb80fcb388a4c683978c12bfbd478a1e4d9533f39722ed3d91e33",
    leaf_node_data:
      "0x459d1b2829bd5b465927a44a0421644e2a12d5c84c624871dce8e506a298233d",
    node_adder:
      "0xb87468897e735bf37ee75034973eb03a0d87f5e4a1c9f1586ef9c61e0d14674b",
    Prize_pool_monthly:
      "0x1a0f288f5da12be709d8d4236da1d8c2eddfc30388fcdda958aef86e636e042e",
    Prize_pool_weekly:
      "0x2fe87612543723ed95a7a258d0f42e16646bad61966ac1c69459fcea6f032edf",
    savings:
      "0x9ba3425bceef8c0d936fa721d4c1a4b9e8132534328ad9417cd06faf785d0d27",
  },
};
export const DEEP_Navi = {
  id: "DEEP-NAVI",
  name: "DEEP",
  coin_balance_andeData_number: 1,
  time_per_round: 180000, //108000000,
  navi_pool_number: 15,
  // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
  data: "0xd286a49a1cea68480b43f93d0ad43e9d9a5fea04156134a7efe154b962451eda",
  get_sgc: "0x95cbf31c4593e1387b46696a5648bc016ddaf8b1a376e506ac22c7a69344ee94",
  data_acp_owner:
    "0x1375d616b090e7f5a2db140af190735ea99ef340d8d18a3986579d617ab1b626",
  fun_type:
    "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
  navi_pool_adder:
    "0x08373c5efffd07f88eace1c76abe4777489d9ec044fd4cd567f982d9c169e946",
  decimals: 6,
  dynamic_field: {
    adder_node:
      "0xec566a58e7ff7537166a3e9c2df9f725f936dbc7144cbf99d1025676c76577aa",
    internal_node_data:
      "0x475d831e9543bd437f3dc9cb572bb79a5a6048c3c39bbe3fcccdb7ad9febd08e",
    leaf_node_data:
      "0x36af93e81a5fed4181555e054fc9938e99fa8717a733c71dcf7ef975f5e41042",
    node_adder:
      "0x3dc60e99ec02802846d3e989cca589d5ade590132472a1efc8e9735d55de34af",
    Prize_pool_monthly:
      "0x27b01d47f8af6a3f3bdf9f39ff5b4907b7fc07f1f921aa7988c8d239bd2c9df5",
    Prize_pool_weekly:
      "0xf7f346b131feeebed5430a7b429d11a2ab4dc6038fd2f696cd357df6d9936d91",
    savings:
      "0x47395c91984d67e86055ebf038ea3838ef7f982ed32a256c8acdacddbb5b7e85",
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
