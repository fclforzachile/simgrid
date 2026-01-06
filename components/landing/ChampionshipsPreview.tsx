import Button from "@/components/ui/Button";

export default function ChampionshipsPreview() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Active Championships
        </h2>

        <p className="text-gray-600 mb-10">
          Multi-brand and mono-brand series with fixed setups or open tuning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {["Forza GT Series", "GT Sprint Cup", "Mono-Brand MX-5"].map((name) => (
            <div
              key={name}
              className="rounded-xl border bg-white p-6"
            >
              <h3 className="font-semibold mb-2">{name}</h3>
              <p className="text-sm text-gray-500">
                Prize pool · Vehicle restrictions · Fixed rules
              </p>
            </div>
          ))}
        </div>

        <Button href="#beta">Join beta to compete</Button>
      </div>
    </section>
  );
}
