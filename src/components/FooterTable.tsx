interface Row {
  time: string;
  player: string;
  game: string;
  wager: string;
  multiplier: string;
  winnings: string;
  link: string;
}

const rows: Row[] = Array.from({ length: 30 }, () => ({
  time: "-",
  player: "-",
  game: "-",
  wager: "-",
  multiplier: "-",
  winnings: "-",
  link: "#",
}));

export default function FooterTable() {
  return (
    <footer className="border-t border-gray-700 p-4">
      <div className="container mx-auto overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-800 text-gray-400">
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2">Game</th>
              <th className="px-4 py-2">Wager</th>
              <th className="px-4 py-2">Multiplier</th>
              <th className="px-4 py-2">Winnings</th>
              <th className="px-4 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="odd:bg-gray-900 even:bg-gray-800">
                <td className="px-4 py-2">{row.time}</td>
                <td className="px-4 py-2">{row.player}</td>
                <td className="px-4 py-2">{row.game}</td>
                <td className="px-4 py-2">{row.wager}</td>
                <td className="px-4 py-2">{row.multiplier}</td>
                <td className="px-4 py-2">{row.winnings}</td>
                <td className="px-4 py-2">
                  <a href={row.link} className="text-blue-400 hover:underline">
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </footer>
  );
}
