import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = ["AA", "BB", "CC", "DD"] as const;

type ItemID = typeof items[number];

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {items.map((id: ItemID) => (
        <Card key={id} className="flex flex-col items-center text-center h-64">
          <CardHeader>{id}</CardHeader>
          <CardContent>
            <Link to={`/${id}`}>
              <Button className="w-56 h-20">打开 {id}</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
