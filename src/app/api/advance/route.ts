import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { runSimulation } from '@/lib/simulation'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { price, new_engineers, new_sales, salary_pct } = body

  // Validate inputs
  if (
    typeof price !== 'number' || price < 0 ||
    typeof new_engineers !== 'number' || new_engineers < 0 ||
    typeof new_sales !== 'number' || new_sales < 0 ||
    typeof salary_pct !== 'number' || salary_pct < 0
  ) {
    return NextResponse.json({ error: 'Invalid inputs' }, { status: 400 })
  }

  // Fetch current game state
  const { data: gameState, error: stateError } = await supabase
    .from('game_states')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (stateError || !gameState) {
    return NextResponse.json({ error: 'Game state not found' }, { status: 404 })
  }

  if (gameState.status !== 'active') {
    return NextResponse.json({ error: 'Game already ended' }, { status: 400 })
  }

  // Run simulation (server-side only)
  const result = runSimulation(gameState, { price, new_engineers, new_sales, salary_pct })

  // Persist new game state
  const { error: updateError } = await supabase
    .from('game_states')
    .update({
      ...result.new_state,
      status: result.status,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update state' }, { status: 500 })
  }

  // Record history
  await supabase.from('quarter_history').insert({
    user_id: user.id,
    year: gameState.current_year,
    quarter: gameState.current_quarter,
    price,
    engineers: result.new_state.engineers,
    sales_staff: result.new_state.sales_staff,
    salary_pct,
    units_sold: result.units_sold,
    revenue: result.revenue,
    total_payroll: result.total_payroll,
    net_income: result.net_income,
    cash_end: result.new_state.cash,
    product_quality: result.product_quality,
  })

  return NextResponse.json({ success: true, result })
}
