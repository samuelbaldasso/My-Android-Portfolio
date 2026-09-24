'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyEmailButton({
  email,
  labelCopy,
  labelCopied,
}: {
  email: string;
  labelCopy: string;
  labelCopied: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? labelCopied : labelCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-mono font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-400">{labelCopied}</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>{email}</span>
        </>
      )}
    </button>
  );
}
