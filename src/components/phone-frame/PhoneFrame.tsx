import Image from 'next/image';

interface PhoneFrameProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({
  imageSrc = '/projects/finance-flow/01_accounts_screen.png',
  imageAlt = 'Android application screen preview',
  className = '',
  priority = false,
}: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-[280px] sm:max-w-[310px] flex-col items-center select-none ${className}`}
      aria-label="Smartphone Mockup"
    >
      {/* Phone chassis */}
      <div className="relative aspect-[9/19.5] w-full rounded-[44px] border-[10px] border-[#1e293b] bg-[#020617] p-2 shadow-2xl ring-1 ring-white/10">
        {/* Top speaker grill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 h-1 w-12 rounded-full bg-slate-700/80" />

        {/* Camera punch hole */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 h-3.5 w-3.5 rounded-full bg-black ring-1 ring-slate-800" />

        {/* Side physical buttons (simulated) */}
        <div className="absolute -left-[14px] top-24 h-12 w-1 rounded-l-md bg-slate-700" />
        <div className="absolute -right-[14px] top-20 h-10 w-1 rounded-r-md bg-slate-700" />
        <div className="absolute -right-[14px] top-36 h-16 w-1 rounded-r-md bg-slate-700" />

        {/* Phone screen container */}
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[#090d16]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 280px, 310px"
              priority={priority}
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-4 pt-10 text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-400">9:41</span>
                  <span className="font-mono text-[10px] text-slate-400">LTE 100%</span>
                </div>
                <div className="rounded-xl bg-slate-800 p-3">
                  <p className="text-[10px] text-slate-400">Saldo Disponível</p>
                  <p className="font-mono text-base font-bold text-white">R$ 14.850,00</p>
                </div>
              </div>
            </div>
          )}

          {/* Android Gesture Bar */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 z-20 h-1 w-28 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
