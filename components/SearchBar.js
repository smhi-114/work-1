"use client"
import { useState } from 'react'

export default function SearchBar(){
	const [q,setQ]=useState('')
	return (
		<div>
			<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="border rounded px-2 py-1" />
		</div>
	)
}
