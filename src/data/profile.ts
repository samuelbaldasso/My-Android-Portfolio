export interface LocalizedString {
  'pt-BR': string;
  en: string;
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: 'language' | 'ui' | 'architecture' | 'data' | 'quality' | 'performance' | 'delivery';
  label: LocalizedString;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: LocalizedString;
  company: string;
  location: LocalizedString;
  period: LocalizedString;
  isCurrent?: boolean;
  summary: LocalizedString;
  achievements: {
    'pt-BR': string[];
    en: string[];
  };
  technologies: string[];
}

export interface ProfileData {
  fullName: string;
  headline: LocalizedString;
  valueProposition: LocalizedString;
  shortBio: LocalizedString;
  location: LocalizedString;
  availability: LocalizedString;
  email: string;
  social: {
    github: string;
    linkedin: string;
    whatsapp?: string;
    playStoreDev?: string;
    mediumOrDevTo?: string;
  };
  resumes: {
    'pt-BR': string;
    en: string;
  };
  skills: SkillCategory[];
  experience: ExperienceItem[];
}

export const profile: ProfileData = {
  fullName: 'Samuel Baldasso',
  headline: {
    'pt-BR': 'Senior Android Engineer · Kotlin · Jetpack Compose',
    en: 'Senior Android Engineer · Kotlin · Jetpack Compose',
  },
  valueProposition: {
    'pt-BR':
      'Arquiteto aplicações nativas escaláveis com foco em Clean Architecture, UDF, performance e engenharia resiliente.',
    en: 'Architecting scalable native Android apps focused on Clean Architecture, UDF, performance, and resilient engineering.',
  },
  shortBio: {
    'pt-BR':
      'Engenheiro de Software sênior especializado no ecossistema Android nativo com Kotlin e Jetpack Compose. Experiência sólida em arquiteturas reativas offline-first, modularização de alta coesão e entrega de produtos de alto impacto.',
    en: 'Senior Software Engineer specializing in the native Android ecosystem with Kotlin and Jetpack Compose. Strong background in offline-first reactive architectures, high-cohesion modularization, and high-impact product delivery.',
  },
  location: {
    'pt-BR': 'Porto Alegre, RS, Brasil',
    en: 'Porto Alegre, RS, Brazil',
  },
  availability: {
    'pt-BR': 'Disponível para atuação remota ou híbrida',
    en: 'Available for remote or hybrid positions',
  },
  email: 'baldassosamuel93@gmail.com',
  social: {
    github: 'https://github.com/samuelbaldasso',
    linkedin: 'https://www.linkedin.com/in/samuel-baldasso',
    // Campos opcionais: serão omitidos automaticamente da UI caso não existam
    whatsapp: undefined,
    playStoreDev: undefined,
    mediumOrDevTo: undefined,
  },
  resumes: {
    'pt-BR': '/resume/resume-pt.pdf',
    en: '/resume/resume-en.pdf',
  },
  skills: [
    {
      id: 'language',
      label: {
        'pt-BR': 'Linguagem & Concorrência',
        en: 'Language & Concurrency',
      },
      skills: [
        { name: 'Kotlin', highlight: true },
        { name: 'Kotlin Coroutines', highlight: true },
        { name: 'StateFlow & SharedFlow', highlight: true },
        { name: 'Channels' },
        { name: 'Java' },
      ],
    },
    {
      id: 'ui',
      label: {
        'pt-BR': 'Interface & Design System',
        en: 'UI & Design System',
      },
      skills: [
        { name: 'Jetpack Compose', highlight: true },
        { name: 'Material 3', highlight: true },
        { name: 'Navigation Compose (Type-Safe)' },
        { name: 'Custom Animations' },
        { name: 'Canvas & Layout Subcompose' },
      ],
    },
    {
      id: 'architecture',
      label: {
        'pt-BR': 'Arquitetura & Padrões',
        en: 'Architecture & Patterns',
      },
      skills: [
        { name: 'Clean Architecture', highlight: true },
        { name: 'MVI / Unidirectional Data Flow (UDF)', highlight: true },
        { name: 'MVVM' },
        { name: 'Multi-module Architecture' },
        { name: 'Dagger Hilt', highlight: true },
        { name: 'Koin' },
      ],
    },
    {
      id: 'data',
      label: {
        'pt-BR': 'Persistência & Rede',
        en: 'Data & Networking',
      },
      skills: [
        { name: 'Room Database', highlight: true },
        { name: 'Offline-First Architecture', highlight: true },
        { name: 'Retrofit & OkHttp' },
        { name: 'Ktor Client' },
        { name: 'Preferences DataStore' },
        { name: 'Paging 3' },
      ],
    },
    {
      id: 'quality',
      label: {
        'pt-BR': 'Testes & Qualidade',
        en: 'Testing & Quality',
      },
      skills: [
        { name: 'JUnit 4 & 5', highlight: true },
        { name: 'MockK', highlight: true },
        { name: 'CashApp Turbine', highlight: true },
        { name: 'Compose UI Tests' },
        { name: 'Robolectric' },
        { name: 'Kotest' },
      ],
    },
    {
      id: 'performance',
      label: {
        'pt-BR': 'Performance & Otimização',
        en: 'Performance & Profiling',
      },
      skills: [
        { name: 'Baseline Profiles', highlight: true },
        { name: 'Macrobenchmark' },
        { name: 'Android Studio Profiler' },
        { name: 'R8 / ProGuard Shrinking' },
        { name: 'LeakCanary' },
      ],
    },
    {
      id: 'delivery',
      label: {
        'pt-BR': 'Build & Publicação',
        en: 'Build & Delivery',
      },
      skills: [
        { name: 'Gradle (Kotlin DSL / KTS)', highlight: true },
        { name: 'Version Catalogs (libs.versions.toml)', highlight: true },
        { name: 'CI/CD (GitHub Actions)' },
        { name: 'Google Play Console' },
      ],
    },
  ],
  experience: [
    {
      id: 'senior-android-engineer',
      role: {
        'pt-BR': 'Engenheiro Android Sênior',
        en: 'Senior Android Engineer',
      },
      company: 'Software Engineering & Mobile Development',
      location: {
        'pt-BR': 'Remoto / Brasil',
        en: 'Remote / Brazil',
      },
      period: {
        'pt-BR': '2021 — Presente',
        en: '2021 — Present',
      },
      isCurrent: true,
      summary: {
        'pt-BR':
          'Liderança técnica no desenvolvimento de aplicações Android nativas com foco em arquitetura reativa, alta taxa de retenção e confiabilidade em escala.',
        en: 'Technical leadership in native Android development focusing on reactive architecture, high retention, and reliability at scale.',
      },
      achievements: {
        'pt-BR': [
          'Arquitetura de soluções mobile offline-first com Room, sincronização em background e persistência reativa via Coroutines/Flow.',
          'Migração e concepção de UIs modernas 100% em Jetpack Compose com Material Design 3 e Type-Safe Navigation.',
          'Implementação de suítes de testes automatizados cobrindo fluxos críticos de negócio, ViewModels com Turbine e regras de domínio puras.',
          'Otimização de tempo de inicialização (Cold Start) e estabilidade de renderização através de Baseline Profiles e profiling contínuo.',
        ],
        en: [
          'Architected offline-first mobile applications with Room, background sync, and reactive persistence via Coroutines/Flow.',
          'Pioneered 100% Jetpack Compose UI migration using Material Design 3 and Type-Safe Navigation.',
          'Implemented comprehensive automated test suites covering critical business flows, ViewModels with Turbine, and pure domain rules.',
          'Optimized cold start times and rendering frame rates using Baseline Profiles and continuous profiling.',
        ],
      },
      technologies: [
        'Kotlin',
        'Jetpack Compose',
        'Clean Architecture',
        'Coroutines & Flow',
        'Dagger Hilt',
        'Room Database',
        'Paging 3',
        'Turbine',
      ],
    },
    {
      id: 'software-engineer',
      role: {
        'pt-BR': 'Engenheiro de Software (Android / Backend)',
        en: 'Software Engineer (Android / Backend)',
      },
      company: 'Digital Solutions & Enterprise Systems',
      location: {
        'pt-BR': 'Porto Alegre, RS',
        en: 'Porto Alegre, Brazil',
      },
      period: {
        'pt-BR': '2019 — 2021',
        en: '2019 — 2021',
      },
      isCurrent: false,
      summary: {
        'pt-BR':
          'Desenvolvimento de aplicações móveis e serviços transacionais com ênfase em integridade de dados, concorrência segura e arquitetura limpa.',
        en: 'Engineered mobile applications and transactional services with focus on data integrity, safe concurrency, and clean architecture.',
      },
      achievements: {
        'pt-BR': [
          'Desenvolvimento de módulos de pagamentos e conciliação financeira com alta garantia de precisão e auditoria.',
          'Integração de APIs REST com estratégias de cache resilientes contra oscilações de conectividade de rede móvel.',
          'Estabelecimento de padrões de CI/CD para automação de builds e testes regressivos.',
        ],
        en: [
          'Built payment and financial reconciliation modules with strict precision and audit trail guarantees.',
          'Integrated REST APIs with resilient caching strategies against mobile network instability.',
          'Established CI/CD pipelines for automated test execution and artifact generation.',
        ],
      },
      technologies: [
        'Kotlin',
        'Java',
        'Android SDK',
        'Retrofit',
        'SQLite / Room',
        'JUnit',
        'Git & CI/CD',
      ],
    },
  ],
};
