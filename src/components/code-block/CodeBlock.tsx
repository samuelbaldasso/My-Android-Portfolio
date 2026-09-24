import { codeToHtml } from 'shiki';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: 'kotlin' | 'gradle' | 'xml' | 'java' | 'json';
  title?: string;
  className?: string;
}

export async function CodeBlock({
  code,
  language = 'kotlin',
  title,
  className = '',
}: CodeBlockProps) {
  const langKey = language === 'gradle' ? 'groovy' : language;

  let html = '';
  try {
    html = await codeToHtml(code, {
      lang: langKey,
      theme: 'github-dark-default',
    });
  } catch {
    // Fallback if language fails
    html = `<pre class="shiki"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[#0d1117] shadow-xl ${className}`}
    >
      {/* Header bar */}
      <div className="flex h-10 items-center justify-between border-b border-white/10 bg-white/[0.03] px-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {title && (
            <span className="ml-2 font-mono text-xs font-medium text-slate-400">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
            {language}
          </span>
          <CopyButton code={code} />
        </div>
      </div>

      {/* Code content */}
      <div
        className="overflow-x-auto p-4 text-xs font-mono leading-relaxed [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
