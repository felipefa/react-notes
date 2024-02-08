import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export function NewNoteCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">Add note</span>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be automatically converted into text.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded-bl-md">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">Add note</span>

            <p className="text-sm leading-6 text-slate-400">
              Start{' '}
              <button className="font-medium text-lime-400 hover:underline">
                recording an audio note
              </button>{' '}
              or just{' '}
              <button className="font-medium text-lime-400 hover:underline">
                type in a new note
              </button>
              .
            </p>
          </div>

          <button
            className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium hover:bg-lime-500 focus-visible:underline transition-colors"
            type="button"
          >
            Save note
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
