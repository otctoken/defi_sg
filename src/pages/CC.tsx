import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CC() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">AA 页面</h1>
      <p>这里是 CC 对应的业务内容。</p>
      <Link to="/">
        <Button variant="outline">返回首页</Button>
      </Link>
    </div>
  );
}

// src/pages/BB.tsx
import AA from "./CC";
export default CC;
