import { NewNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NoteStore = {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};
const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',

      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
