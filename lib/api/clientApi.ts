import { Credentials, User } from '@/types/user';
import { nextServer } from './api';
import { NewNote, Note } from '@/types/note';

export const register = async (credentials: Credentials) => {
  const response = await nextServer.post<User>('/auth/register', credentials);
  return response.data;
};

export const login = async (credentials: Credentials) => {
  const response = await nextServer.post<User>('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  await nextServer.post<User>('/auth/login');
};

interface SuccessSession {
  success: boolean;
}

export const sessionStatus = async () => {
  const response = await nextServer.get<SuccessSession>('/auth/session');
  return response.data.success;
};

export const getMe = async () => {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
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
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};
