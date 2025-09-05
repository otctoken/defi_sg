import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CC() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">CC 页面</h1>
      <p>这里是 CC 对应的业务内容。</p>
      <Link to="/" className="block w-full sm:inline-block sm:w-auto">
        <Button variant="outline" className="w-full sm:w-auto">
          返回首页
        </Button>
      </Link>
    </div>
  );
}
