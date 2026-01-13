'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ChampionshipDetail() {
  const { id } = useParams()
  const [championship, setChampionship] = useState<any>(null)
  const [cars, setCars] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: c } = await supabase
      .from('championships')
      .select('*')
      .eq('id', id)
      .single()

    const { data: cars } = await supabase
      .from('championship_cars')
      .select('*')
      .eq('championship_id', id)

    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('championship_id', id)

    setChampionship(c)
    setCars(cars || [])
    setCount(count || 0)
    setLoading(false)
  }

  async function register() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      return
    }

    const { error } = await supabase.from('registrations').insert({
      championship_id: id,
      user_id: user.id,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Registered')
      load()
    }
  }

  if (loading) return <div style={{ padding: 40 }}>Loading…</div>
  if (!championship) return <div>Not found</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>{championship.title}</h1>
      <p>{championship.description}</p>
      <p><strong>Game:</strong> {championship.game}</p>
      <p><strong>Format:</strong> {championship.format}</p>

      <button onClick={register}>
        Register
      </button>

      <p style={{ marginTop: 10 }}>
        <strong>Registered:</strong> {count}
      </p>

      <h3>Allowed Cars</h3>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.car_name} — {car.restrictions}
          </li>
        ))}
      </ul>
    </div>
  )
}
