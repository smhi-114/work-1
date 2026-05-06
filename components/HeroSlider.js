"use client"
import { useEffect, useState } from 'react'

const banners = [
  'https://placehold.co/1200x420?text=بنر+۱',
  'https://placehold.co/1200x420?text=بنر+۲',
  'https://placehold.co/1200x420?text=بنر+۳'
]

export default function HeroSlider(){
  const [i, setI] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setI(v => (v+1)%banners.length), 4000)
    return ()=> clearInterval(t)
  },[])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img src={banners[i]} className="w-full h-56 md:h-80 object-cover" />
      </div>
      <button aria-label="previous" onClick={()=> setI((i-1+banners.length)%banners.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">‹</button>
      <button aria-label="next" onClick={()=> setI((i+1)%banners.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">›</button>
      <div className="absolute left-4 bottom-4 flex items-center gap-2">
        {banners.map((_, idx) => (
          <button key={idx} onClick={()=> setI(idx)} className={`w-2 h-2 rounded-full ${idx===i ? 'bg-red-600' : 'bg-white/60'}`}></button>
        ))}
      </div>
    </div>
  )
}
