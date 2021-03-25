import Route from 'components/route'
import Button from 'components/button'

const routes = [
  { name: 'Nyckelviken blåa 🔹', distance: 5.5, elevation: 247, difficulty: 5 },
  { name: 'Fannydal Hills', distance: 5.4, elevation: 450, difficulty: 3 },
  { name: 'Hellas Gröna 🟢', distance: 10, elevation: 120, difficulty: 2 },
  { name: 'Gula runt sjön', distance: 5, elevation: 160, difficulty: 4 },
  { name: 'Södra Djurgården', distance: 8, elevation: 102, difficulty: 1 },
  { name: 'Nyckelviken gula 🟡', distance: 5.1, elevation: 120, difficulty: 2 },
]

export default function Home() {
  return (
    <main className="bg-black h-screen w-screen overflow-hidden">
      <aside className="w-[430px] max-w-1/2 bg-white min-h-screen overflow-y-auto absolute top-0 bottom-0 p-5">
        <nav className="flex justify-end">
          <Button disabled>Add Route</Button>
        </nav>
        <header className="text-center py-16">
          <img src="/logo.svg" alt="Trail Router logotype" className="mx-auto mb-3" />
          <p>
            Sweden has tons of trails for hiking &amp; running, but how do you decide where to go? Trail Routes is a curation of the best
            ones!
          </p>
        </header>
        <section>
          <h1 className="font-bold text-2xl py-3 sticky -mx-5 px-5 -top-5 bg-blur">All routes</h1>
          <ol>{routes.map(Route)}</ol>
        </section>
      </aside>
      <div className="text-white ml-[430px] flex items-center justify-center h-screen">Map</div>
    </main>
  )
}
