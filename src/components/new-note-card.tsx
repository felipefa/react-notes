import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated(content: string): void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [content, setContent] = React.useState('');

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value === '') {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (content === '') {
      toast.warning('A note cannot be empty');
      return;
    }

    onNoteCreated(content.trim());

    setContent('');

    setShouldShowOnboarding(true);

    toast.success('Note saved');
  }

  function handleStartRecording() {
    const isSpeechRecognitionSupported =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionSupported) {
      toast.error('Speech recognition is not supported in this browser');
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = 'en-UK';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event.error);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    setShouldShowOnboarding(true);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

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
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded-bl-md">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Add note
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Start{' '}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                    type="button"
                  >
                    recording an audio note
                  </button>{' '}
                  or just{' '}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                    type="button"
                  >
                    type in a new note
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none flex-1"
                  placeholder="Type your note here"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 font-medium hover:text-slate-100 focus-visible:underline transition-colors"
                onClick={handleStopRecording}
                type="button"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Recording! (Click to stop)
              </button>
            ) : (
              <button
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium hover:bg-lime-500 focus-visible:underline transition-colors"
                onClick={handleSaveNote}
                type="button"
              >
                Save note
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
