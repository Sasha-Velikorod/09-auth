import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      tag,
    },
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const sessionStatus = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};
