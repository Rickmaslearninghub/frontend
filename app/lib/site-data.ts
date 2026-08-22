export const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Professional'] as const;
export type LevelName = (typeof LEVELS)[number];

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  level: LevelName;
  isPublished: boolean;
  createdAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  pdfUrl?: string;
  createdAt: string;
};

export type UserAccount = {
  name: string;
  email: string;
  password: string;
};

export const CONTACT_EMAIL = 'fedrickmashili601@gmail.com';

const cookieKeys = {
  videos: 'rmcodelab_videos',
  news: 'rmcodelab_news',
  banner: 'rmcodelab_banner',
  auth: 'rmcodelab_auth',
  accounts: 'rmcodelab_accounts',
  redirect: 'rmcodelab_redirect',
  progress: 'rmcodelab_progress',
};

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.split('=').slice(1).join('=')) : null;
}

export function setCookie(name: string, value: string, maxAge = 60 * 60 * 24 * 365): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function readJsonCookie<T>(key: string, fallback: T): T {
  const raw = getCookie(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonCookie<T>(key: string, value: T): void {
  setCookie(key, JSON.stringify(value));
}

export function readStorageJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorageJSON<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getVideoLibrary(): VideoItem[] {
  return readJsonCookie<VideoItem[]>(cookieKeys.videos, []);
}

export function setVideoLibrary(videos: VideoItem[]): void {
  writeJsonCookie(cookieKeys.videos, videos);
}

export function getNewsItems(): NewsItem[] {
  return readJsonCookie<NewsItem[]>(cookieKeys.news, []);
}

export function setNewsItems(items: NewsItem[]): void {
  writeJsonCookie(cookieKeys.news, items);
}

export function getBannerText(): string {
  return readJsonCookie<string>(cookieKeys.banner, 'Learn with confidence. Build your future with RMCodeLab Academy.');
}

export function setBannerText(value: string): void {
  writeJsonCookie(cookieKeys.banner, value);
}

export function getAuthUser(): UserAccount | null {
  if (typeof window === 'undefined') return null;
  const current = window.localStorage.getItem(cookieKeys.auth);
  if (!current) return null;
  try {
    return JSON.parse(current) as UserAccount;
  } catch {
    return null;
  }
}

export function setAuthUser(user: UserAccount): void {
  writeStorageJSON(cookieKeys.auth, user);
}

export function clearAuthUser(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(cookieKeys.auth);
  }
}

export function getRegisteredAccounts(): UserAccount[] {
  return readStorageJSON<UserAccount[]>(cookieKeys.accounts, []);
}

export function setRegisteredAccounts(accounts: UserAccount[]): void {
  writeStorageJSON(cookieKeys.accounts, accounts);
}

export function getPendingRedirect(): string {
  if (typeof window === 'undefined') return '/curriculum';
  return window.localStorage.getItem(cookieKeys.redirect) || '/curriculum';
}

export function setPendingRedirect(path: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(cookieKeys.redirect, path);
  }
}

export function consumePendingRedirect(): string {
  const redirect = getPendingRedirect();
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(cookieKeys.redirect);
  }
  return redirect;
}

export function getProgressMap(): Record<string, boolean> {
  return readStorageJSON<Record<string, boolean>>(cookieKeys.progress, {});
}

export function setProgressMap(progress: Record<string, boolean>): void {
  writeStorageJSON(cookieKeys.progress, progress);
}

export function markVideoWatched(videoId: string): void {
  const next = getProgressMap();
  next[videoId] = true;
  setProgressMap(next);
}

export function getCompletionPercentage(level: string, videos: VideoItem[]): number {
  const matchingVideos = videos.filter((video) => video.level === level && video.isPublished);
  const progress = getProgressMap();
  const watched = matchingVideos.filter((video) => progress[video.id]).length;
  if (matchingVideos.length === 0) return 0;
  return Math.round((watched / matchingVideos.length) * 100);
}

export function normalizeLevel(value: string): LevelName {
  const lower = value.toLowerCase();
  const match = LEVELS.find((level) => level.toLowerCase() === lower);
  return match || 'Beginner';
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
