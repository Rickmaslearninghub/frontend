export type Video = {
  id: string;
  title: string;
  description?: string | null;
  youtubeUrl: string;
  level: string;
  category?: string | null;
  isPublished: boolean;
  createdAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  type: string;
  published: boolean;
  createdAt: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  category: string;
  level: string;
  price: number;
  description: string;
  isPublished: boolean;
  createdAt: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.');
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || 'The request could not be completed.');
  }

  return data as T;
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    const id = host === 'youtu.be'
      ? parsed.pathname.split('/')[1]
      : parsed.searchParams.get('v') || parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
