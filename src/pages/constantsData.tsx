// src/constants/A.tsx
//.................................SG................................................................
export const SG_PACkages = "0x0fff11caf503156dadd897cbb3b5034d33cd46d788e7c205a5c114663a60e190"
export const SG_Amindcap_fee = "0xaaf22c3491bc4d6ac8be140e37a219f2cecdb3a2ce06376d3520f425ab6e3a81"
export const SG_minter = "0x4fe0fbe52b826fd926b72406479e2ce63c7a918d0ecbc796bb589c5aa9cd64a0"
export const SGC_h_c = "0x1e63571dbb1cbcb46ac0cc9e501f3c7b7ebcb75b4b29b74a1397b7e5bb577087"
export const SGCcoin_type = "0x0fff11caf503156dadd897cbb3b5034d33cd46d788e7c205a5c114663a60e190::sgc::SGC"

//.................................NAVI................................................................
export const Navi_Storage = "0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe"
export const Navi_inshdg_V2 = "0xf87a8acb8b81d14307894d12595541a73f19933f88e1326d5be349c7a6f7559c"
export const Navi_inshdg_V3 = "0x62982dad27fb10bb314b3384d5de8d2ac2d72ab2dbeae5d801dbdb9efa816c80"
export const Navi_RewadFun_NAVI = "0x1a3f9fcfdfac10e92c99220203f7c4bb502558692f0be0f2cb5f788b4e12a6b5"
export const Navi_RewadFun_Vsui = "0x7093cf7549d5e5b35bfde2177223d1050f71655c7f676a5e610ee70eb4d93b5c"
export const Navi_PriceOracle = "0x1568865ed9a0b5ec414220e8f79b3d04c77acc82358f6e5ae4635687392ffbef"
export const Navi_update_single_price_pgk = "0xc2d49bf5e75d2258ee5563efa527feb6155de7ac6f6bf025a23ee88cd12d5a83"
export const Navi_OracleConfig = "0x1afe1cb83634f581606cc73c4487ddd8cc39a944b951283af23f7d69d5589478"
export const Navi_OracleHolder = "0xaa0315f0748c1f24ddb2b45f7939cff40f7a8104af5ccbc4a1d32f870c0b4105"
//.................................FolX................................................................
export const FolX_Contert = "0xb65dcbf63fd3ad5d0ebfbf334780dc9f785eff38a4459e37ab08fa79576ee511"
export const FolX_Mingter = "0x2a30f1bfa9594e0e9ca37581268b3fee4b6965a70c38eb76e204334980619c24"
//..............................admin...................................................................
export const burn_sgc = ["0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
                         "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
                        ]
export const AdminCap = "0x12ca4a9c46234553b606a15f864ca957b2931238c0ebdd20f4230d4fbd6fa308"
export const upgrade = "0x9faefe8e4a0d337402cd5ceb27dfc44b326b63692748d1dfff90584feb44c004"
export const SGC_AdminTolel = "0xad852fb8d4806e24fb8f45d3dc5e110d7acbb438883ef9f099fc5a060bd46047"//

export const SUI_30H = {
    id: "SUI-30H",
    name: "SUI",
    // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
    data: "0x3dcaacbeb7c9b5202877e9f6f1a21e325c45c5244c4303834a74f86397f65da7",
    fun_type: "0x2::sui::SUI",
    typeT: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",//type reward_fund_没有填写两个任意，但不能一样
    reward_fund_T: "0xc889d78b634f954979e80e622a2ae0fece824c0f6d9590044378a2563035f32f",//type reward_fund_没有填写两个任意，但不能一样
    typeD: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",//type reward_fund_没有填写两个任意，但不能一样，有一类的必须写在T
    reward_fund_D: "0x7093cf7549d5e5b35bfde2177223d1050f71655c7f676a5e610ee70eb4d93b5c",//type reward_fund_没有填写两个任意，但不能一样，有一类的必须写在T
    get_sgc: "0xc540cbe21642abefe781f35b3163d871b39374f753b5e34f81ffeb1bbc660f92",
    coin_balance_andeData_number: 0,
    time_per_round: 108000000,
    navi_pool_number: 0,
    navi_pool_adder: "0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5",
    navi_update_single_price1: "0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37",
    navi_update_single_price2: "0x2cab9b151ca1721624b09b421cc57d0bb26a1feb5da1f821492204b098ec35c9",
    decimals: 9,
    dynamic_field: {
        adder_node: '0x0920a7ea19db6b0264f117610c76426c2ab22dcfe63c1b13a5a1fd35ebb89b6b',
        internal_node_data: '0xea0a17cee67563ba25d992bc0973e3d20ec6c1664e0c4ab80f47fac7505be9bb',
        leaf_node_data: '0x3c66a219314b0c3d94ff93c55432608c6a4032aba097373f75fda27f7e01abca',
        node_adder: '0xf669054eccb8d9602eab30eee5b918af2a52c71346a1a535070b2d6bfed27653',
        savings: '0xe09fa0596757ba64e1494b58e77500784f4c3ae99861ef5c6898f902394f4247'
    }
}
export const DEEP_30H = {
    id: "DEEP-30H",
    name: "DEEP",
    // tree_height total_balance time_per_round  start_time index internal_node  leaf_node
    data: "0xfb8fee21dabd4d70f3b68e9c2e1d0cdb0c7a1056a3a04b0a2539c495c2316bfb",
    fun_type: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
    typeT: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",//type reward_fund_没有填写两个任意，但不能一样
    reward_fund_T: "0xc889d78b634f954979e80e622a2ae0fece824c0f6d9590044378a2563035f32f",//type reward_fund_没有填写两个任意，但不能一样
    typeD: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",//type reward_fund_没有填写两个任意，但不能一样，有一类的必须写在T
    reward_fund_D: "0x7093cf7549d5e5b35bfde2177223d1050f71655c7f676a5e610ee70eb4d93b5c",//type reward_fund_没有填写两个任意，但不能一样，有一类的必须写在T
    get_sgc: "0xe02e2d7e9fbf9dad951e6bf5566c5fe7774e93b7d2635523a82abffd9b68a7ab",
    coin_balance_andeData_number: 1,
    time_per_round: 108000000,
    navi_pool_number: 15,
    navi_pool_adder: "0x08373c5efffd07f88eace1c76abe4777489d9ec044fd4cd567f982d9c169e946",
    navi_update_single_price1: "0x8c7f3a322b94cc69db2a2ac575cbd94bf5766113324c3a3eceac91e3e88a51ed",
    navi_update_single_price2: "0x4558092b08ad1b33b0eb536f91a4655693c2390ac568f06de6f6fad827888600",
    decimals: 6,
    dynamic_field: {
        adder_node: '0x3ecc9318b15d8df40fb9bbb912cdc57d55fbbeb6ace1cf1f777e3cd18de650fe',
        internal_node_data: '0x318be1bca9418f30c00b7b9934822c67d4aab8d47364e6f8b20123587ffa1224',
        leaf_node_data: '0x0edd3406f022374b53ee30958d51edf158a7f0a92c829724380f64cbe160d6b5',
        node_adder: '0x9c4cd198d8f11defa37e978054fe1b63503ec11a8c27e748680e9639a2780a4a',
        savings: '0x897e23df13e5eca8d536f32c23723d9db6deee46ff31afc225005ce5e2b4cf83'
    }
}




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
