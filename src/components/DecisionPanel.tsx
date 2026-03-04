'use client'

import { useState } from 'react'

interface Props {
  onAdvance: (d: { price: number; new_engineers: number; new_sales: number; salary_pct: number }) => void
  advancing: boolean
  gameStatus: string
}

export default function DecisionPanel({ onAdvance, advancing, gameStatus }: Props) {
  const [price, setPrice] = useState(500)
  const [newEngineers, setNewEngineers] = useState(0)
  const [newSales, setNewSales] = useState(0)
  const [salaryPct, setSalaryPct] = useState(100)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdvance({ price, new_engineers: newEngineers, new_sales: newSales, salary_pct: salaryPct })
  }

  const isDisabled = advancing || gameStatus !== 'active'

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sticky top-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">
        📋 Quarterly Decisions
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Unit Price ($)"
          value={price}
          onChange={setPrice}
          min={1}
          max={100000}
          hint="Higher price = more revenue per unit, but lower demand"
        />
        <Field
          label="Hire Engineers"
          value={newEngineers}
          onChange={setNewEngineers}
          min={0}
          max={20}
          hint="Improves product quality each quarter"
        />
        <Field
          label="Hire Sales Staff"
          value={newSales}
          onChange={setNewSales}
          min={0}
          max={20}
          hint="Directly multiplies units sold"
        />
        <Field
          label="Salary % of Industry Avg"
          value={salaryPct}
          onChange={setSalaryPct}
          min={50}
          max={200}
          hint="Industry avg = $30,000/quarter. Affects payroll cost."
        />

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition text-sm"
        >
          {advancing ? '⏳ Simulating...' : '⏩ Advance Quarter'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label, value, onChange, min, max, hint
}: {
  label: string; value: number; onChange: (v: number) => void
  min: number; max: number; hint: string
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        min={min}
        max={max}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition text-sm"
      />
      <p className="text-gray-600 text-xs mt-1">{hint}</p>
    </div>
  )
}
