interface Props {
    status: 'won' | 'lost'
    cumulativeProfit: number
    onRestart: () => void
  }
  
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  
  export default function GameOverModal({ status, cumulativeProfit, onRestart }: Props) {
    const won = status === 'won'
  
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
          <div className="text-6xl mb-4">{won ? '🏆' : '💸'}</div>
          <h2 className="text-2xl font-bold mb-2">
            {won ? 'You Made It!' : 'Bankrupt'}
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            {won
              ? `You reached Year 10 with a cumulative profit of ${fmt(cumulativeProfit)}.`
              : 'Your startup ran out of cash. Better luck next time!'}
          </p>
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }
  