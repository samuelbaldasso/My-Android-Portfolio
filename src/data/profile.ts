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
  education: {
    degree: LocalizedString;
    institution: string;
    certifications: string[];
    languages: string[];
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
      'Especialista em construir produtos Android nativos robustos com Kotlin, Jetpack Compose, Clean Architecture, UDF e engenharia offline-first.',
    en: 'Specializing in building robust native Android products with Kotlin, Jetpack Compose, Clean Architecture, UDF, and offline-first engineering.',
  },
  shortBio: {
    'pt-BR':
      'Engenheiro de Software com mais de 4 anos de experiência no ciclo completo de desenvolvimento, especialista no ecossistema Android nativo com Kotlin e Jetpack Compose. Histórico comprovado entregando soluções escaláveis e de alta confiabilidade para líderes globais como NTT DATA (Bees Force / AbInBev), IBM e CI&T.',
    en: 'Software Engineer with 4+ years of experience across the software lifecycle, specializing in native Android with Kotlin and Jetpack Compose. Proven track record delivering scalable, high-reliability mobile solutions for global leaders including NTT DATA (Bees Force / AbInBev), IBM, and CI&T.',
  },
  location: {
    'pt-BR': 'Brasil (Disponível para atuação remota)',
    en: 'Brazil (Remote-ready)',
  },
  availability: {
    'pt-BR': 'Disponível para contratação remota global',
    en: 'Available for global remote hire',
  },
  email: 'baldassosamuel93@gmail.com',
  social: {
    github: 'https://github.com/samuelbaldasso',
    linkedin: 'https://www.linkedin.com/in/samuel-baldasso',
    // Redes opcionais: somem do layout se indefinidas
    whatsapp: undefined,
    playStoreDev: undefined,
    mediumOrDevTo: undefined,
  },
  education: {
    degree: {
      'pt-BR': 'Bacharelado em Tecnologia da Informação / Sistemas de Informação',
      en: "Bachelor's Degree in Information Technology",
    },
    institution: 'FeMASS — Macaé, Brasil',
    certifications: ['AWS Certified Cloud Practitioner'],
    languages: [
      'Inglês (C1 - Full Professional Proficiency)',
      'Espanhol (B2 - Professional Working Proficiency)',
      'Português (Nativo)',
    ],
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
        { name: 'Channels', highlight: true },
        { name: 'Java Interoperability' },
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
        { name: 'Material Design 3', highlight: true },
        { name: 'Navigation Compose (Type-Safe)', highlight: true },
        { name: 'State Hoisting & Stateless Composables', highlight: true },
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
        { name: 'Multi-module Architecture', highlight: true },
        { name: 'Dagger Hilt', highlight: true },
        { name: 'MVVM' },
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
        { name: 'Room Database (Offline-First)', highlight: true },
        { name: 'Preferences DataStore', highlight: true },
        { name: 'Paging 3', highlight: true },
        { name: 'Retrofit & OkHttp' },
        { name: 'Ktor Client' },
        { name: 'Local Cache Strategies' },
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
        { name: 'Compose UI Tests', highlight: true },
        { name: 'Robolectric' },
        { name: 'Screenshot Testing' },
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
        { name: 'Android Studio Profiler (CPU/Memory)', highlight: true },
        { name: 'Macrobenchmark' },
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
        { name: 'CI/CD (GitHub Actions)', highlight: true },
        { name: 'Google Play Console' },
      ],
    },
  ],
  experience: [
    {
      id: 'ntt-data-mobile',
      role: {
        'pt-BR': 'Engenheiro de Software Mobile (Android Specialist)',
        en: 'Mobile Software Engineer (Android Specialist)',
      },
      company: 'NTT DATA',
      location: {
        'pt-BR': 'Remoto / Brasil',
        en: 'Remote / Brazil',
      },
      period: {
        'pt-BR': 'Abr 2022 — Out 2024',
        en: 'Apr 2022 — Oct 2024',
      },
      isCurrent: false,
      summary: {
        'pt-BR':
          'Desenvolvimento de aplicações móveis de grande porte e missão crítica, com destaque para a plataforma global Bees Force (AbInBev) em Android Nativo (Kotlin + Jetpack Compose) e app corporativo para Allianz.',
        en: 'Engineered large-scale, mission-critical mobile applications, highlighting the global Bees Force (AbInBev) native Android platform (Kotlin + Jetpack Compose) and the enterprise mobile application for Allianz.',
      },
      achievements: {
        'pt-BR': [
          'Bees Force (AbInBev): Engenharia e concepção de módulos da aplicação Android nativa utilizando Kotlin, Jetpack Compose e Clean Architecture, atendendo à operação de força de vendas B2B no ecossistema global da Ambev/AbInBev.',
          'Allianz Auto: Construção e entrega de funcionalidades mobile de alta disponibilidade e usabilidade para aplicativo corporativo com base de usuários em escala nacional.',
          'Evolução Acelerada: Início como Estagiário de Desenvolvimento Android e promoção acelerada para Engenheiro de Software em menos de 6 meses por alto senso de ownership técnico e consistência de entregas.',
          'Arquitetura Mobile: Implementação de padrões rigorosos de Clean Architecture, injeção de dependências (Hilt) e testes automatizados, elevando a manutenibilidade e a estabilidade do código.',
        ],
        en: [
          'Bees Force (AbInBev): Engineered native Android modules utilizing Kotlin, Jetpack Compose, and Clean Architecture for the enterprise B2B field platform powering the global AbInBev ecosystem.',
          'Allianz Auto: Built and shipped high-availability mobile features for an enterprise insurance application serving a nationwide customer base.',
          'Fast Career Progression: Started as an Android Development Intern and earned promotion to Software Engineer within 6 months through high technical ownership and delivery velocity.',
          'Mobile Architecture: Applied strict Clean Architecture principles, dependency injection (Hilt), and automated testing to enhance mobile code maintainability.',
        ],
      },
      technologies: [
        'Kotlin',
        'Jetpack Compose',
        'Android SDK',
        'Clean Architecture',
        'Coroutines & Flow',
        'Dagger Hilt',
        'Room Database',
        'Material 3',
        'CI/CD',
      ],
    },
    {
      id: 'ibm-enterprise',
      role: {
        'pt-BR': 'Engenheiro de Software · Integrações Mobile & Arquitetura Resiliente',
        en: 'Software Engineer · Mobile Integrations & Resilient Architecture',
      },
      company: 'IBM · Enterprise Consulting (Cliente Bradesco / E-AGRO)',
      location: {
        'pt-BR': 'Remoto / Brasil',
        en: 'Remote / Brazil',
      },
      period: {
        'pt-BR': 'Mai 2025 — Presente',
        en: 'May 2025 — Present',
      },
      isCurrent: true,
      summary: {
        'pt-BR':
          'Atuação em engenharia de sistemas corporativos de alta escala para o setor financeiro/agro, desenhando contratos de API resilientes, observabilidade e fluxos otimizados para consumo por aplicações cliente.',
        en: 'Engineering high-scale financial/agro enterprise platforms, designing resilient API contracts, cloud observability, and optimized data sync for client applications.',
      },
      achievements: {
        'pt-BR': [
          'Estruturação de contratos de integração e padrões de resiliência orientados a consumo seguro e performático por clientes mobile e web.',
          'Otimização de pipelines de dados e fluxos de alta demanda em ambientes de nuvem (AWS), assegurando baixa latência e tolerância a falhas.',
          'Alinhamento técnico multidisciplinar e revisão de design de sistemas para mitigar gargalos de sincronização e concorrência.',
        ],
        en: [
          'Structured resilient integration contracts and patterns optimized for performant, secure consumption by mobile and web clients.',
          'Optimized high-throughput cloud data pipelines on AWS, ensuring low latency, fault tolerance, and high availability.',
          'Collaborated across distributed teams in system design reviews to eliminate synchronization and concurrency bottlenecks.',
        ],
      },
      technologies: [
        'Clean Architecture',
        'API Design & Contracts',
        'Resilient Systems',
        'Cloud (AWS)',
        'CI/CD',
        'Observability',
      ],
    },
    {
      id: 'consulting-contracts',
      role: {
        'pt-BR': 'Consultor de Engenharia de Software (Arquitetura & Performance)',
        en: 'Software Engineering Consultant (Architecture & Performance)',
      },
      company: 'CI&T (Cliente Vivo), SBM Technology & Montreal Informática',
      location: {
        'pt-BR': 'Remoto / Brasil',
        en: 'Remote / Brazil',
      },
      period: {
        'pt-BR': 'Out 2024 — Abr 2025',
        en: 'Oct 2024 — Apr 2025',
      },
      isCurrent: false,
      summary: {
        'pt-BR':
          'Consultoria técnica focada em diagnóstico e eliminação de gargalos arquiteturais, aceleração de esteiras de CI/CD e padronização de qualidade para grandes clientes corporativos.',
        en: 'Technical consultancy focused on resolving architectural bottlenecks, accelerating automated CI/CD pipelines, and establishing quality benchmarks for major enterprise clients.',
      },
      achievements: {
        'pt-BR': [
          'CI&T (Cliente Vivo): Refatoração de fluxos críticos de arquitetura, eliminando gargalos de comunicação e acelerando deploys automatizados via CI/CD.',
          'Montreal Informática: Otimização de APIs de alta performance com foco estrito em redução de latência, escalabilidade e tolerância a falhas.',
          'SBM Technology: Desenvolvimento de soluções corporativas escaláveis com arquitetura limpa e testes automatizados de regressão.',
        ],
        en: [
          'CI&T (Vivo Client): Refactored critical architectural bottlenecks, boosting throughput and streamlining automated CI/CD deployment pipelines.',
          'Montreal Informática: Optimized high-performance APIs focusing strictly on latency reduction, horizontal scalability, and fault tolerance.',
          'SBM Technology: Built scalable enterprise workflows adhering to Clean Architecture and automated regression test suites.',
        ],
      },
      technologies: [
        'Clean Architecture',
        'Performance Tuning',
        'CI/CD Pipelines',
        'System Fault Tolerance',
        'Automated Testing',
      ],
    },
  ],
};
