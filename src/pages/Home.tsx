import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

const items = ["AA", "BB", "CC", "DD"] as const;

type ItemID = (typeof items)[number];

export default function Home() {
  const account = useCurrentAccount();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
<Card className="flex flex-col justify-between items-center text-center !bg-gray-800 sm:col-span-2">
  <CardHeader>My Account</CardHeader>
  <CardContent className="w-full flex justify-center">
    {account ? (
      <div className="break-all">{account.address}</div>
    ) : (
      <div>Wallet not connected</div>
    )}
  </CardContent>
</Card>
      {items.map((id: ItemID) => (
        <Card
          key={id}
          className="flex flex-col justify-between items-center text-center h-64 !bg-gray-800"
        >
          <CardHeader>{id}</CardHeader>
          <CardContent className="w-full flex justify-center">
            <Link to={`/${id}`}>
              <Button className="w-32">打开 {id}</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
