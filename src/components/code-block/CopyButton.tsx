'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Código copiado!' : 'Copiar código'}
      className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
