'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

interface Props { history: any[] }

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}k`

export default function HistoryChart({ history }: Props) {
  if (!history.length) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          📈 Performance History
        </h2>
        <p className="text-gray-600 text-sm text-center py-8">
          Advance your first quarter to see history
        </p>
      </div>
    )
  }

  const data = history.map(h => ({
    name: `Y${h.year}Q${h.quarter}`,
    Revenue: h.revenue,
    Payroll: h.total_payroll,
    'Net Income': h.net_income,
    Cash: h.cash_end,
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        📈 Last {history.length} Quarter{history.length > 1 ? 's' : ''}
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={fmt} stroke="#6b7280" tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(v: number) => fmt(v)}
            contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Payroll" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Net Income" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Cash" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
