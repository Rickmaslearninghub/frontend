import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RMCodeLab Academy',
  description: 'Modern online learning platform for AI, coding, design, and business systems.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
