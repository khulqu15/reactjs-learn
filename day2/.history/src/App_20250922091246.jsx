import Button from './components/Button';
import Input from './components/Input';
import Badge from './components/Badge';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Komponen Sederhana</h1>
          <p className="text-gray-600">
            Contoh Button (solid/outline), Input, dan Badge untuk pembelajaran React + Tailwind.
          </p>
        </header>a

        {/* Buttons */}
        <section className="space-y-3">
          <h2 className="font-semibold">Button</h2>
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button tone="gray">Solid Gray</Button>
            <Button variant="outline" tone="gray">Outline Gray</Button>
            <Button size="lg">Large</Button>
            <Button size="sm" disabled>Disabled</Button>
            <Button full>Full width</Button>a
          </div>
        </section>

        {/* Input */}
        <section className="space-y-3">
          <h2 className="font-semibold">Input</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              id="name"
              label="Nama"
              placeholder="Tulis nama kamu"
              helper="Ini akan tampil di badge profil."
            />
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="nama@contoh.com"
              error="Email tidak valid."
            />
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-3">
          <h2 className="font-semibold">Badge</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge>Default</Badge>
            <Badge tone="blue">React</Badge>
            <Badge tone="green">Sukses</Badge>
            <Badge tone="red">Error</Badge>
            <Badge tone="yellow" size="md">Beta</Badge>
          </div>
        </section>
      </div>
    </div>
  );
}
