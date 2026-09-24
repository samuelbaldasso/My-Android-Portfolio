interface Layer {
  name: string;
  description: string;
  tech: string[];
}

interface ArchitectureDiagramProps {
  pattern: string;
  layers?: Layer[];
}

export function ArchitectureDiagram({ pattern, layers }: ArchitectureDiagramProps) {
  const defaultLayers: Layer[] = [
    {
      name: 'UI Layer (Jetpack Compose)',
      description: 'Stateless Composables, State Hoisting, Material 3, Type-Safe Navigation.',
      tech: ['Compose BOM', 'Material 3', 'Navigation 2.8+'],
    },
    {
      name: 'Presentation Layer',
      description: 'ViewModels anotadas com @HiltViewModel, StateFlow para UiState e Channel para UiEffect.',
      tech: ['@HiltViewModel', 'StateFlow', 'Channels', 'SavedStateHandle'],
    },
    {
      name: 'Domain Layer (Puro Kotlin)',
      description: 'Regras de negócio, UseCases com Single Responsibility, Value Classes e zero dependência de Android SDK.',
      tech: ['Pure Kotlin', 'Value Classes', 'UseCases', 'Domain Models'],
    },
    {
      name: 'Data Layer (Offline-First)',
      description: 'Room Database como Fonte Única da Verdade, Repositórios reativos e DataStore.',
      tech: ['Room DB', 'DAO', 'Preferences DataStore', 'Retrofit/OkHttp'],
    },
  ];

  const activeLayers = layers && layers.length > 0 ? layers : defaultLayers;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border)] pb-4">
        <div>
          <span className="font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
            Padrão Arquitetural
          </span>
          <h3 className="font-mono text-lg font-bold text-[var(--foreground)] mt-0.5">
            {pattern}
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
          <span>Unidirectional Data Flow (UDF)</span>
        </div>
      </div>

      {/* Layer stack diagram */}
      <div className="mt-8 flex flex-col gap-4">
        {activeLayers.map((layer, index) => (
          <div key={layer.name} className="relative flex flex-col">
            <div className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-container-low)] p-5 transition-all hover:border-[var(--primary)]/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary-container)] font-mono text-xs font-bold text-[var(--on-primary-container)]">
                    {index + 1}
                  </span>
                  <h4 className="font-mono text-sm font-bold text-[var(--foreground)]">
                    {layer.name}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[var(--surface)] px-2 py-0.5 text-[10px] font-mono text-[var(--on-surface-variant)] border border-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-2.5 text-xs text-[var(--on-surface-variant)] leading-relaxed">
                {layer.description}
              </p>
            </div>

            {/* Downward data flow connector */}
            {index < activeLayers.length - 1 && (
              <div className="my-1.5 flex items-center justify-center">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--on-surface-variant)]/70">
                  <span className="h-3 w-[2px] bg-[var(--primary)]/40" />
                  <span>dispara evento / solicita dados</span>
                  <span className="h-3 w-[2px] bg-[var(--primary)]/40" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
