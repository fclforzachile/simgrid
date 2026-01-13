import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  const { data: signups } = await supabase
    .from('beta_signups')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin</h1>
      <p>Total signups: {signups?.length ?? 0}</p>
      <ul>
        {signups?.map((s: any) => (
          <li key={s.id}>{s.email}</li>
        ))}
      </ul>
    </div>
  )
}
