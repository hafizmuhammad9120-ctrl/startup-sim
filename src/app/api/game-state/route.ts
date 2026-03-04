import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get or create game state
  let { data: gameState } = await supabase
    .from('game_states')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!gameState) {
    const { data: newState } = await supabase
      .from('game_states')
      .insert({ user_id: user.id })
      .select()
      .single()
    gameState = newState
  }

  // Get last 4 quarters of history
  const { data: history } = await supabase
    .from('quarter_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(4)

  return NextResponse.json({ gameState, history: history?.reverse() ?? [] })
}

export async function DELETE() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
    // Delete history
    await supabase.from('quarter_history').delete().eq('user_id', user.id)
  
    // Reset game state to initial values
    await supabase.from('game_states').upsert({
      user_id: user.id,
      cash: 1000000,
      engineers: 4,
      sales_staff: 2,
      product_quality: 50,
      competitors: 2,
      current_quarter: 1,
      current_year: 1,
      status: 'active',
      cumulative_profit: 0,
      updated_at: new Date().toISOString(),
    })
  
    return NextResponse.json({ success: true })
  }
  