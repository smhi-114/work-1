"use client"
const cats = [
  { id: 'c1', title: 'موبایل', icon: '📱' },
  { id: 'c2', title: 'لپ‌تاپ', icon: '💻' },
  { id: 'c3', title: 'خانه', icon: '🏠' },
  { id: 'c4', title: 'مد', icon: '👗' },
  { id: 'c5', title: 'کودک', icon: '🧸' }
]

export default function CategoryList(){
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex gap-3 px-2">
        {cats.map(c=> (
          <div key={c.id} className="flex-shrink-0 w-28 bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-lg transition transform hover:-translate-y-0.5">
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className="text-sm font-medium">{c.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
