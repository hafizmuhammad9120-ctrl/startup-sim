interface Props { gameState: any }

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function Dashboard({ gameState }: Props) {
  if (!gameState) return null

  const metrics = [
    { label: 'Cash on Hand', value: fmt(gameState.cash), color: 'text-green-400', icon: '💰' },
    { label: 'Engineers', value: gameState.engineers, color: 'text-blue-400', icon: '👨‍💻' },
    { label: 'Sales Staff', value: gameState.sales_staff, color: 'text-purple-400', icon: '🤝' },
    { label: 'Product Quality', value: `${gameState.product_quality.toFixed(1)} / 100`, color: 'text-yellow-400', icon: '⭐' },
  ]

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Company Overview — Y{gameState.current_year} Q{gameState.current_quarter}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-gray-800 rounded-xl p-4">
            <div className="text-xl mb-1">{m.icon}</div>
            <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-gray-500 text-xs mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
