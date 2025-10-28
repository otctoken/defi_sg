import { SuiGrpcClient } from "@mysten/sui/grpc";

const client = new SuiGrpcClient({
    network: "mainnet",
    baseUrl: "https://fullnode.mainnet.sui.io:443",
});

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


