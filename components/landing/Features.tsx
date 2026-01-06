export default function Features() {
  const items = [
    {
      title: "Global Championships",
      desc: "Create and join sim racing championships across multiple platforms.",
    },
    {
      title: "Secure Prize Pools",
      desc: "All payments are held safely and released automatically to winners.",
    },
    {
      title: "Driver & Organizer Reputation",
      desc: "Profiles with ratings, history and verified results.",
    },
    {
      title: "Multi-Platform Support",
      desc: "Forza Motorsport, Gran Turismo, Assetto Corsa and more.",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Built for Sim Racing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
