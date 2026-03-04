interface Props {
    engineers: number
    salesStaff: number
  }
  
  const MAX_DESKS = 30
  
  export default function OfficeVisualization({ engineers, salesStaff }: Props) {
    const total = engineers + salesStaff
    const desks = Array.from({ length: MAX_DESKS }, (_, i) => {
      if (i < engineers) return 'engineer'
      if (i < total) return 'sales'
      return 'empty'
    })
  
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            🏢 Office
          </h2>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Engineers ({engineers})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-purple-500 inline-block" /> Sales ({salesStaff})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gray-700 inline-block" /> Empty
            </span>
          </div>
        </div>
  
        <div className="grid grid-cols-10 gap-2">
          {desks.map((type, i) => (
            <div
              key={i}
              title={type === 'empty' ? 'Empty desk' : type === 'engineer' ? 'Engineer' : 'Sales'}
              className={`
                aspect-square rounded-md flex items-center justify-center text-sm transition-all duration-300
                ${type === 'engineer' ? 'bg-blue-600 shadow-lg shadow-blue-900/50' : ''}
                ${type === 'sales' ? 'bg-purple-600 shadow-lg shadow-purple-900/50' : ''}
                ${type === 'empty' ? 'bg-gray-800 border border-gray-700 border-dashed' : ''}
              `}
            >
              {type === 'engineer' && '👨‍💻'}
              {type === 'sales' && '🤝'}
              {type === 'empty' && ''}
            </div>
          ))}
        </div>
  
        <p className="text-gray-600 text-xs mt-3 text-right">
          {total} / {MAX_DESKS} desks occupied
        </p>
      </div>
    )
  }
  