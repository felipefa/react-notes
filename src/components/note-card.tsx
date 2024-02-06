export function NoteCard() {
  return (
    <div className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative">
      <span className="text-sm font-medium text-slate-300">2 days ago</span>

      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, illo?
        Laboriosam, culpa? Ipsum optio ab excepturi rem qui. Facilis maiores
        eius commodi vel totam ad error iure quaerat iste cupiditate!
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none" />
    </div>
  );
}
