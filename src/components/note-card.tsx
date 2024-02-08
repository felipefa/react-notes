import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { Trash, X } from 'lucide-react';
import { toast } from 'sonner';

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDeleted(id: string): void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  const dateFormatted = formatDistanceToNow(note.date, { addSuffix: true });

  function handleDeleteNote() {
    onNoteDeleted(note.id);

    toast.success('Note deleted');
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-4 rounded-md text-left bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none group">
        <span
          className="absolute hidden group-hover:block right-0 top-0 bg-slate-900 p-2 text-red-200 hover:text-red-400 rounded-bl-md"
          onClick={handleDeleteNote}
        >
          <Trash className="size-5" />
        </span>

        <span className="text-sm font-medium text-slate-300">
          {dateFormatted}
        </span>

        <p className="text-sm leading-6 text-slate-400 text-ellipsis overflow-hidden">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded-bl-md">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 overflow-hidden">
            <span className="text-sm font-medium p-5 pb-0 text-slate-300">
              {dateFormatted}
            </span>

            <p className="text-sm leading-6 text-slate-400 p-5 pt-0 overflow-auto">
              {note.content}
            </p>
          </div>

          <button
            className="w-full bg-slate-800 py-4 text-center text-sm text-red-400 font-medium transition-colors hover:bg-slate-900 focus-visible:underline"
            onClick={handleDeleteNote}
            type="button"
          >
            Delete note
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
