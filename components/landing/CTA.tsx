import BetaForm from "./BetaForm";

export default function CTA() {
  return (
    <section
      id="beta"
      className="py-32 px-6 text-center bg-black text-white"
    >
      <h2 className="text-4xl font-bold mb-6">
        Join the Closed Beta
      </h2>

      <p className="text-gray-300 mb-10 max-w-xl mx-auto">
        Be among the first organizers and drivers shaping the future of sim racing.
      </p>

      <BetaForm />
    </section>
  );
}
