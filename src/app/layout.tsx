import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';

export const metadata: Metadata = {
  title: 'MindBridge AI',
  description: 'Universal Web Accessibility Intelligence Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased grid-radial-bg")}> 
        <div className="min-h-screen">
          <header className="sticky top-0 z-30">
            <div className="glass shadow-primary-glow">
              <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">MB</span>
                  <span className="font-semibold tracking-tight">MindBridge</span>
                </div>
                <div className="text-xs text-muted-foreground hidden sm:inline">Universal Web Accessibility Intelligence</div>
              </div>
            </div>
          </header>
          <AuroraBackground>
            <Suspense fallback={<div className="mx-auto max-w-7xl p-6">Loading...</div>}>
              {children}
            </Suspense>
          </AuroraBackground>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
