"use client"
import { useState, useEffect } from 'react'

export default function ThemeToggle(){
	const [dark,setDark]=useState(false)
	useEffect(()=>{ if (localStorage.getItem('theme')==='dark') { setDark(true); document.documentElement.classList.add('dark') } },[])
	function toggle(){ setDark(d=>{ const v=!d; document.documentElement.classList.toggle('dark', v); localStorage.setItem('theme', v?'dark':'light'); return v }) }
	return <button onClick={toggle}>{dark? 'Light':'Dark'}</button>
}
