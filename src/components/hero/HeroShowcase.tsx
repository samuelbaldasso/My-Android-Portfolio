'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Smartphone, Code2 } from 'lucide-react';
import { PhoneFrame } from '@/components/phone-frame/PhoneFrame';

interface HeroShowcaseProps {
  codeSnippetNode: React.ReactNode;
  interactiveTabLabel: string;
  codeTabLabel: string;
}

export function HeroShowcase({
  codeSnippetNode,
  interactiveTabLabel,
  codeTabLabel,
}: HeroShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'phone' | 'code'>('phone');
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex w-full flex-col items-center">
      {/* Tab Switcher */}
      <div className="mb-6 flex rounded-full border border-[var(--border)] bg-[var(--surface-container-low)] p-1 shadow-inner">
        <button
          onClick={() => setActiveTab('phone')}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
            activeTab === 'phone'
              ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-sm'
              : 'text-[var(--on-surface-variant)] hover:text-[var(--foreground)]'
          }`}
          aria-label={interactiveTabLabel}
        >
          <Smartphone className="h-3.5 w-3.5" />
          <span>{interactiveTabLabel}</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
            activeTab === 'code'
              ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-sm'
              : 'text-[var(--on-surface-variant)] hover:text-[var(--foreground)]'
          }`}
          aria-label={codeTabLabel}
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>{codeTabLabel}</span>
        </button>
      </div>

      {/* Content Area with smooth fade */}
      <div className="relative w-full flex justify-center">
        {activeTab === 'phone' ? (
          <motion.div
            key="phone"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex justify-center w-full"
          >
            <PhoneFrame
              imageSrc="/projects/finance-flow/01_accounts_screen.png"
              imageAlt="Tela de Contas do Finance Flow App em Jetpack Compose"
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xl"
          >
            {codeSnippetNode}
          </motion.div>
        )}
      </div>
    </div>
  );
}
