'use client';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NotePreview.module.css';
import Modal from '../../../../components/Modal/Modal';

const NotePreview = () => {
  const router = useRouter();
  const onClose = () => router.back();

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={onClose}>
      {note && (
        <div className={css.item}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.cont}>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.date}>{note.createdAt}</p>
            <button className={css.backBtn} onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Oops, something went wrong...{error.message}</p>}
    </Modal>
  );
};

export default NotePreview;
