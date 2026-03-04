export interface GameState {
    cash: number
    engineers: number
    sales_staff: number
    product_quality: number
    competitors: number
    current_quarter: number
    current_year: number
    cumulative_profit: number
  }
  
  export interface Decisions {
    price: number
    new_engineers: number
    new_sales: number
    salary_pct: number
  }
  
  export interface QuarterResult {
    new_state: GameState
    units_sold: number
    revenue: number
    total_payroll: number
    net_income: number
    hire_cost: number
    product_quality: number
    status: 'active' | 'won' | 'lost'
  }
  
  export function runSimulation(state: GameState, decisions: Decisions): QuarterResult {
    const { price, new_engineers, new_sales, salary_pct } = decisions
  
    // Update headcount
    const engineers = state.engineers + new_engineers
    const sales_staff = state.sales_staff + new_sales
  
    // Salary cost per person per quarter
    const salary_cost_per_person = (salary_pct / 100) * 30000
  
    // Product quality increases with engineers (capped at 100)
    const product_quality = Math.min(100, state.product_quality + engineers * 0.5)
  
    // Market demand
    const demand = Math.max(0, product_quality * 10 - price * 0.0001)
  
    // Units sold
    const units_sold = Math.floor(demand * sales_staff * 0.5)
  
    // Financials
    const revenue = price * units_sold
    const total_payroll = salary_cost_per_person * (engineers + sales_staff)
    const hire_cost = (new_engineers + new_sales) * 5000
    const net_income = revenue - total_payroll
    const cash_end = state.cash + net_income - hire_cost
  
    // Advance time
    let next_quarter = state.current_quarter + 1
    let next_year = state.current_year
    if (next_quarter > 4) {
      next_quarter = 1
      next_year += 1
    }
  
    const cumulative_profit = state.cumulative_profit + net_income
  
    // Win/lose check
    let status: 'active' | 'won' | 'lost' = 'active'
    if (cash_end <= 0) status = 'lost'
    else if (next_year > 10) status = 'won'
  
    const new_state: GameState = {
      cash: cash_end,
      engineers,
      sales_staff,
      product_quality,
      competitors: state.competitors,
      current_quarter: next_quarter,
      current_year: next_year,
      cumulative_profit,
    }
  
    return {
      new_state,
      units_sold,
      revenue,
      total_payroll,
      net_income,
      hire_cost,
      product_quality,
      status,
    }
  }
  