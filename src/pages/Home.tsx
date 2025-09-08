import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = ["AA", "BB", "CC", "DD"] as const;

type ItemID = (typeof items)[number];

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((id: ItemID) => (
        <Card
          key={id}
          className="flex flex-col justify-between items-center text-center h-64 !bg-green-500"
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
