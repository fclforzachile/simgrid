'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function OrganizerPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [game, setGame] = useState('Forza Motorsport')
  const [format, setFormat] = useState('monomarca')
  const [loading, setLoading] = useState(false)

  async function createChampionship() {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      setLoading(false)
      return
    }

    // Ensure organizer exists
    await supabase.from('organizers').upsert({
      id: user.id,
      name: user.email,
    })

    const { error } = await supabase.from('championships').insert({
      organizer_id: user.id,
      title,
      game,
      format,
      is_public: true,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Championship created')
      router.push('/championships')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Championship</h1>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <select value={game} onChange={e => setGame(e.target.value)}>
          <option>Forza Motorsport</option>
          <option>Gran Turismo</option>
          <option>Assetto Corsa</option>
          <option>iRacing</option>
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="monomarca">Monomarca</option>
          <option value="multimarca">Multimarca</option>
        </select>
      </div>

      <button onClick={createChampionship} disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </div>
  )
}
