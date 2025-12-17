import { useState, useEffect } from "react";

export function ItemTimer({ countdown }: { countdown: number }) {
  const [msLeft, setMsLeft] = useState(countdown);

  useEffect(() => {
    if (countdown > 0) {
      setMsLeft(countdown);
    }
    const intervalId = window.setInterval(() => {
      setMsLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  const seconds = Math.floor((msLeft / 1000) % 60);
  const minutes = Math.floor((msLeft / (1000 * 60)) % 60);
  const hours = Math.floor(msLeft / (1000 * 60 * 60));
  const display =
    (hours > 0 ? `${hours}h ` : "") +
    (minutes > 0 ? `${minutes}m ` : "") +
    `${seconds}s`;

  return <div>{display}</div>;
}
