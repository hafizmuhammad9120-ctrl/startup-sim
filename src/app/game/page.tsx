'use client'

import { useEffect, useState, useCallback } from 'react'
import Dashboard from '@/components/Dashboard'
import DecisionPanel from '@/components/DecisionPanel'
import OfficeVisualization from '@/components/OfficeVisualization'
import HistoryChart from '@/components/HistoryChart'
import GameOverModal from '@/components/GameOverModal'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function GamePage() {
  const [gameState, setGameState] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [advancing, setAdvancing] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const fetchState = useCallback(async () => {
    const res = await fetch('/api/game-state')
    if (res.status === 401) { router.push('/login'); return }
    const data = await res.json()
    setGameState(data.gameState)
    setHistory(data.history)
    setLoading(false)
  }, [router])

  useEffect(() => { fetchState() }, [fetchState])

  const handleAdvance = async (decisions: {
    price: number
    new_engineers: number
    new_sales: number
    salary_pct: number
  }) => {
    setAdvancing(true)
    const res = await fetch('/api/advance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decisions),
    })
    if (res.ok) await fetchState()
    setAdvancing(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleRestart = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    // Reset game state via direct Supabase call
    await fetch('/api/game-state', { method: 'DELETE' })
    await fetchState()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-gray-400 animate-pulse text-lg">Loading simulation...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h1 className="font-bold text-lg leading-none">StartupSim</h1>
            <p className="text-gray-500 text-xs">
              Year {gameState?.current_year} · Q{gameState?.current_quarter}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="text-gray-500 hover:text-gray-300 text-sm transition"
        >
          Sign out
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">
          <Dashboard gameState={gameState} />
          <HistoryChart history={history} />
          <OfficeVisualization
            engineers={gameState?.engineers ?? 0}
            salesStaff={gameState?.sales_staff ?? 0}
          />
        </div>

        {/* Right column */}
        <div>
          <DecisionPanel
            onAdvance={handleAdvance}
            advancing={advancing}
            gameStatus={gameState?.status}
          />
        </div>
      </main>

      {/* Game Over Modal */}
      {gameState?.status !== 'active' && (
        <GameOverModal
          status={gameState?.status}
          cumulativeProfit={gameState?.cumulative_profit}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
