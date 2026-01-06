import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">
        SimGrid
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-xl">
        Race. Win. Rise.
      </p>

      <Button href="#beta">
        Join closed beta
      </Button>
    </section>
  );
}
