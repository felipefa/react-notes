import { Divider } from './components/divider';
import { Logo } from './components/logo';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';

export function App() {
  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6">
      <Logo />

      <form className="w-full">
        <input
          className="bg-transparent font-semibold outline-none placeholder:text-slate-500 text-3xl tracking-tight w-full"
          placeholder="Search notes..."
          type="text"
        />
      </form>

      <Divider />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        <NoteCard
          note={{
            date: new Date(),
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, illo?        Laboriosam, culpa? Ipsum optio ab excepturi rem qui. Facilis maiores eius commodi vel totam ad error iure quaerat iste cupiditate!',
          }}
        />
      </div>
    </div>
  );
}
