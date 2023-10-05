export interface BoardPosts {
  ok: boolean;
  pages: number;
  boards: Boards[];
}

export interface Boards {
  id: number;
  createdAt?: string;
  title: string;
  content: string;
  secret?: boolean;
  complete: boolean;
  user: User;
}

interface User {
  email: string;
  nickname: string;
}
