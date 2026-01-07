import { createClient } from "@supabase/supabase-js";

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("beta_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    props: {
      data: data ?? [],
    },
  };
}

export default function AdminPage({ data }: { data: any[] }) {
  return (
    <main style={{ padding: 40, background: "#000", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>SimGrid – Admin</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Email</th>
            <th align="left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.email}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
