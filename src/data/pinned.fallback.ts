import { PinnedRepositoriesList } from './pinned.types';

export const fallbackPinnedRepositories: PinnedRepositoriesList = [
  {
    name: 'Finance-Flow-App',
    slug: 'finance-flow-app',
    title: 'Finance Flow App',
    description:
      'Aplicativo financeiro moderno desenvolvido com Kotlin, Jetpack Compose, Clean Architecture, DDD, Room Offline-First e Dagger Hilt.',
    url: 'https://github.com/samuelbaldasso/Finance-Flow-App',
    homepageUrl: null,
    stargazerCount: 0,
    forkCount: 0,
    primaryLanguage: {
      name: 'Kotlin',
      color: '#A97BFF',
    },
    repositoryTopics: [
      'android',
      'kotlin',
      'jetpack-compose',
      'clean-architecture',
      'dagger-hilt',
      'room-database',
      'paging3',
      'material3',
      'biometrics',
      'offline-first',
    ],
    pushedAt: '2026-09-24T15:47:25Z',
    isAndroid: true,
    releasesUrl: 'https://github.com/samuelbaldasso/Finance-Flow-App/releases',
    screenshots: [
      '/screenshots/finance-flow/01_accounts_screen.png',
      '/screenshots/finance-flow/02_transactions_screen.png',
      '/screenshots/finance-flow/03_budgets_screen.png',
      '/screenshots/finance-flow/04_goals_screen.png',
      '/screenshots/finance-flow/05_cards_screen.png',
      '/screenshots/finance-flow/06_settings_screen.png',
      '/screenshots/finance-flow/07_create_account_dialog.png',
    ],
    architectureSummary: {
      pattern: 'Clean Architecture + DDD + UDF (MVI)',
      layers: [
        {
          name: 'Camada de UI (Compose)',
          description:
            'Stateless Composables, State Hoisting, Material 3, Navigation Compose 2.8+ Type-Safe e Paging 3.',
          tech: ['Jetpack Compose', 'Material 3', 'Navigation Type-Safe', 'Paging Compose'],
        },
        {
          name: 'Camada de Apresentação',
          description:
            'ViewModels reativos com StateFlow para UiState e Channels para UiEffect pontuais (one-off).',
          tech: ['@HiltViewModel', 'StateFlow', 'Channel', 'Coroutines'],
        },
        {
          name: 'Camada de Domínio',
          description:
            'UseCases puros com Single Responsibility, regras bancárias estritas, Value Class Money em centavos.',
          tech: ['UseCases', 'Domain Models', 'Value Class Money', 'Zero SO Dependencies'],
        },
        {
          name: 'Camada de Dados',
          description:
            'Repositórios Singleton com Room Database como Fonte Única da Verdade, Trilha de Auditoria imutável.',
          tech: ['Room Database', 'Preferences DataStore', 'Audit Logs', 'Offline-First'],
        },
      ],
    },
    tradeOffs: [
      {
        decision: 'Precisão Monetária com Value Class Money',
        chosen: '@JvmInline value class Money(val amountMinor: Long)',
        alternative: 'Double / Float ou BigDecimal',
        reason:
          'Elimina erros de ponto flutuante IEEE 754 sem incorrer no overhead de alocação de objetos em heap do BigDecimal em loops de renderização do Compose.',
      },
      {
        decision: 'Saldos Estritamente Derivados',
        chosen: 'Saldo = Saldo Inicial + Σ(Transações Efetivadas)',
        alternative: 'Coluna estática balance atualizada manualmente por triggers',
        reason:
          'Garante consistência matemática idempotente contra concorrência e falhas parciais de atualização de saldo.',
      },
      {
        decision: 'Type-Safe Navigation Compose 2.8+',
        chosen: 'Rotas baseadas em @Serializable objects/classes',
        alternative: 'Rotas baseadas em Strings com URLs manuais',
        reason:
          'Elimina erros de parsing em tempo de execução, garantindo validação de parâmetros de tela em tempo de compilação.',
      },
      {
        decision: 'Privacidade & Conformidade LGPD',
        chosen: 'AppLock com Biometria + PIN SHA-256 salgado, FLAG_SECURE e wipe atômico',
        alternative: 'Armazenamento desprotegido em SharedPreferences',
        reason:
          'Protege dados bancários confidenciais no alternador de apps e cumpre os requisitos de portabilidade e direito ao esquecimento.',
      },
    ],
    highlightCode: {
      title: 'CreateInstallmentPurchaseUseCase.kt',
      language: 'kotlin',
      code: `package com.samuelbaldasso.financeflow.domain.usecase.card

import com.samuelbaldasso.financeflow.core.model.account.Account
import com.samuelbaldasso.financeflow.core.model.account.AccountType
import com.samuelbaldasso.financeflow.core.model.money.Money
import com.samuelbaldasso.financeflow.core.model.transaction.Transaction
import com.samuelbaldasso.financeflow.domain.repository.TransactionRepository
import java.time.LocalDate
import java.util.UUID
import javax.inject.Inject

class CreateInstallmentPurchaseUseCase @Inject constructor(
    private val transactionRepository: TransactionRepository
) {
    suspend operator fun invoke(
        cardAccount: Account,
        totalAmount: Money,
        installmentsCount: Int,
        firstPurchaseDate: LocalDate,
        description: String,
        categoryId: UUID? = null
    ): List<Transaction> {
        require(cardAccount.type == AccountType.CREDIT_CARD) { "Account must be a credit card" }
        require(installmentsCount in 1..48) { "Installments must be between 1 and 48" }
        require(totalAmount.amountMinor > 0L) { "Amount must be strictly positive" }

        val totalMinor = totalAmount.amountMinor
        val baseInstallment = totalMinor / installmentsCount
        val remainder = totalMinor % installmentsCount

        val installmentGroupId = UUID.randomUUID()
        val createdTransactions = mutableListOf<Transaction>()

        // Distribui centavos residuais na primeira parcela para integridade centésima
        for (i in 1..installmentsCount) {
            val installmentAmount = if (i == 1) baseInstallment + remainder else baseInstallment
            val dueDate = cardAccount.calculateDueDate(firstPurchaseDate, installmentOffset = i - 1)
            
            val transaction = Transaction(
                id = UUID.randomUUID(),
                accountId = cardAccount.id,
                amount = Money(installmentAmount),
                dueDate = dueDate,
                installmentIndex = i,
                installmentsTotal = installmentsCount,
                installmentGroupId = installmentGroupId,
                description = "$description ($i/$installmentsCount)"
            )
            createdTransactions.add(transaction)
        }

        transactionRepository.insertTransactionsAtomic(createdTransactions)
        return createdTransactions
    }
}`,
    },
  },
  {
    name: 'Eat.me',
    slug: 'eat-me',
    title: 'Eat.me · Delivery Platform',
    description:
      'Clone conceitual e produção-grade do ecossistema de delivery (estilo iFood) para Android nativo em Kotlin e Jetpack Compose, concebido com arquitetura de alta escala, modularização e princípios rigorosos de Clean Architecture e UDF/MVI.',
    url: 'https://github.com/samuelbaldasso/Eat.me',
    homepageUrl: null,
    stargazerCount: 0,
    forkCount: 0,
    primaryLanguage: {
      name: 'Kotlin',
      color: '#A97BFF',
    },
    repositoryTopics: [
      'android',
      'kotlin',
      'jetpack-compose',
      'clean-architecture',
      'mvi',
      'multi-module',
      'dagger-hilt',
      'material3',
      'offline-first',
      'value-class',
    ],
    pushedAt: '2026-09-26T19:14:41Z',
    isAndroid: true,
    releasesUrl: 'https://github.com/samuelbaldasso/Eat.me/releases',
    screenshots: [
      '/screenshots/eat-me/01_home_screen.png',
      '/screenshots/eat-me/02_search_screen.png',
      '/screenshots/eat-me/03_restaurant_detail.png',
      '/screenshots/eat-me/04_dish_customization.png',
      '/screenshots/eat-me/05_cart_screen.png',
      '/screenshots/eat-me/06_checkout_screen.png',
      '/screenshots/eat-me/07_order_tracking.png',
      '/screenshots/eat-me/08_orders_history.png',
      '/screenshots/eat-me/09_profile_screen.png',
    ],
    architectureSummary: {
      pattern: 'Clean Architecture + MVI/UDF + Modularização Multi-Module',
      layers: [
        {
          name: 'Camada de UI & Apresentação (:app)',
          description:
            'Stateless Composables, State Hoisting, Material 3, Navigation Compose Type-Safe, SplashScreen API nativa com Edge-to-Edge e ViewModels MVI reativos.',
          tech: [
            'Jetpack Compose',
            'Material 3',
            '@HiltViewModel',
            'StateFlow (UDF)',
            'Navigation Compose',
            'SplashScreen API',
          ],
        },
        {
          name: 'Design System & Feedback (:core:designsystem)',
          description:
            'Design tokens com paleta roxa vibrante, tipografia escalável, componentes compartilhados e modificadores de Shimmer para skeletons de carregamento.',
          tech: [
            'Compose Design Tokens',
            'Shimmer Animations',
            'Reusable Components',
          ],
        },
        {
          name: 'Domínio Puro (:core:domain-shared)',
          description:
            'Módulo Kotlin JVM puro (zero acoplamento ao Android SDK ou frameworks), entidades (Restaurant, Dish, Cart, Order), Value Class Money (RN-PRICE-01) e AppResult / AppError.',
          tech: [
            'Kotlin JVM puro',
            'Value Classes (@JvmInline)',
            'AppResult & AppError',
            'Clean Architecture',
          ],
        },
        {
          name: 'Persistência & Dados (:core:database)',
          description:
            'Room SQLite como Single Source of Truth offline-first, entidades relacionais 1:N com cascata, DAOs reativos com Flow e seeder automático.',
          tech: [
            'Room Database',
            'SQLite 1:N Relations',
            'Reactive Flow',
            'Dagger Hilt',
          ],
        },
      ],
    },
    tradeOffs: [
      {
        decision: 'ADR-001: Value Class Money em Centavos vs BigDecimal ou Double',
        chosen: '@JvmInline value class Money(val cents: Long)',
        alternative: 'BigDecimal ou Double / Float',
        reason:
          'Elimina problemas de arredondamento e derivação do IEEE 754 de tipos flutuantes e evita a penalidade de alocação de objetos em heap do BigDecimal durante ciclos de recomposição rápida do Jetpack Compose.',
      },
      {
        decision: 'ADR-002: Backend Embutido e Persistência via Room SQLite',
        chosen: 'Room Database com Single Source of Truth offline-first e relações 1:N',
        alternative: 'Mocks voláteis em memória ou dependência direta de backend REST instável',
        reason:
          'Garante experiência offline fluida, consistência transacional atômica entre carrinho e pedidos, e capacidade de simulação determinística de todo o ciclo de compra.',
      },
      {
        decision: 'ADR-003: Padrão UDF (Unidirectional Data Flow) e MVI na Apresentação',
        chosen: 'UiState imutável, Intents atômicas do usuário e canais para UiEffect pontuais',
        alternative: 'Múltiplos LiveDatas/StateFlows independentes e mutações diretas',
        reason:
          'Elimina condições de corrida e estados intermediários inválidos na interface, tornando as transições visuais determinísticas e 100% testáveis com Turbine.',
      },
      {
        decision: 'ADR-004: SplashScreen API Nativa (Android 12+) e Edge-to-Edge',
        chosen: 'androidx.core:core-splashscreen com animação de saída e enableEdgeToEdge',
        alternative: 'Activity de Splash customizada legada com Handler.postDelayed',
        reason:
          'Elimina telas brancas ou saltos na inicialização a frio, respeita as diretrizes de design do Android 15 e estende o conteúdo sob as barras de sistema de forma imersiva.',
      },
      {
        decision: 'ADR-005: Feedback de Carregamento por Esqueletos Shimmer',
        chosen: 'Modifier customizado com InfiniteTransition e gradiente linear dinâmico',
        alternative: 'CircularProgressIndicator centralizado genérico',
        reason:
          'Reduz a percepção do tempo de espera pelo usuário, evita Cumulative Layout Shift (CLS) e espelha o padrão de excelência de UX dos principais apps de delivery.',
      },
    ],
    highlightCode: {
      title: 'Money.kt (:core:domain-shared)',
      language: 'kotlin',
      code: `package com.samuelbaldasso.ifoodclone.core.domain.model

import kotlinx.serialization.Serializable
import java.math.BigDecimal
import java.math.RoundingMode
import java.text.NumberFormat
import java.util.Locale

/**
 * Value class representing monetary values in Brazilian Real (BRL) stored in whole cents (Long).
 * Floating-point types (Double/Float) are strictly forbidden for currency per RN-PRICE-01.
 */
@Serializable
@JvmInline
value class Money(val cents: Long) : Comparable<Money> {

    val isZero: Boolean get() = cents == 0L
    val isPositive: Boolean get() = cents > 0L
    val isNegative: Boolean get() = cents < 0L

    operator fun plus(other: Money): Money = Money(Math.addExact(this.cents, other.cents))

    operator fun minus(other: Money): Money = Money(Math.subtractExact(this.cents, other.cents))

    operator fun times(multiplier: Int): Money = Money(Math.multiplyExact(this.cents, multiplier.toLong()))

    operator fun times(multiplier: Long): Money = Money(Math.multiplyExact(this.cents, multiplier))

    /**
     * Calculates percentage of money with strict HALF_UP rounding.
     * e.g., Money(1000).percentage(10) == Money(100)
     */
    fun percentage(percent: Int, roundingMode: RoundingMode = RoundingMode.HALF_UP): Money {
        require(percent in 0..100) { "Percentage must be between 0 and 100, got: $percent" }
        if (percent == 0 || isZero) return ZERO
        if (percent == 100) return this

        val calculatedCents = BigDecimal.valueOf(cents)
            .multiply(BigDecimal.valueOf(percent.toLong()))
            .divide(BigDecimal.valueOf(100L), 0, roundingMode)
            .longValueExact()

        return Money(calculatedCents)
    }

    fun coerceAtLeastZero(): Money = if (cents < 0L) ZERO else this

    override fun compareTo(other: Money): Int = this.cents.compareTo(other.cents)

    fun formatBrl(): String {
        val format = NumberFormat.getCurrencyInstance(Locale("pt", "BR"))
        return format.format(BigDecimal.valueOf(cents).divide(BigDecimal.valueOf(100L)))
    }

    companion object {
        val ZERO = Money(0L)
        fun fromDouble(amount: Double): Money =
            Money(BigDecimal.valueOf(amount).multiply(BigDecimal.valueOf(100L)).setScale(0, RoundingMode.HALF_UP).longValueExact())
    }
}`,
    },
  },
  {
    name: 'The-Movie-DB-App',
    slug: 'the-movie-db-app',
    title: 'The Movie Database (TMDB) App',
    description:
      'App Android de catálogo e descoberta de filmes utilizando Jetpack Compose, Clean Architecture, Hilt, Room, Retrofit e Coroutines/Flow.',
    url: 'https://github.com/samuelbaldasso/The-Movie-DB-App',
    homepageUrl: null,
    stargazerCount: 0,
    forkCount: 0,
    primaryLanguage: {
      name: 'Kotlin',
      color: '#A97BFF',
    },
    repositoryTopics: [
      'android',
      'kotlin',
      'jetpack-compose',
      'clean-architecture',
      'hilt',
      'retrofit',
      'room',
      'coroutines',
      'paging3',
      'coil',
    ],
    pushedAt: '2025-10-20T12:00:00Z',
    isAndroid: true,
    releasesUrl: 'https://github.com/samuelbaldasso/The-Movie-DB-App/releases',
    screenshots: [
      '/screenshots/movie-db/home.png',
      '/screenshots/movie-db/details.png',
      '/screenshots/movie-db/search.png',
    ],
    architectureSummary: {
      pattern: 'Clean Architecture + MVVM + RemoteMediator (Paging 3)',
      layers: [
        {
          name: 'Camada de UI',
          description:
            'Telas desacopladas com Jetpack Compose, renderização otimizada com LazyVerticalGrid e Coil para cache assíncrono.',
          tech: ['Jetpack Compose', 'Material 3', 'Coil Image Loader', 'StateFlow'],
        },
        {
          name: 'Camada de Domínio',
          description:
            'Modelos puros de dados e contratos de repositório isolados de dependências de framework externo.',
          tech: ['Movie Model', 'MovieRepository Interface', 'Coroutines Result'],
        },
        {
          name: 'Camada de Dados & Cache',
          description:
            'Estratégia de rede com fallback em banco local Room e paginação incremental através de MovieRemoteMediator.',
          tech: ['Room Database', 'Retrofit 2', 'OkHttp', 'Paging 3 RemoteMediator'],
        },
      ],
    },
    tradeOffs: [
      {
        decision: 'Estratégia de Cache Network-First com Fallback Local',
        chosen: 'Consumo do RemoteMediator com inserção no Room e observação contínua da base local',
        alternative: 'Consumo direto da API sem persistência offline',
        reason:
          'Permite navegação instantânea em conexões instáveis e reduz drasticamente o consumo de banda com requisições repetitivas.',
      },
      {
        decision: 'Paging 3 com RemoteMediator',
        chosen: 'Paginação coordenada entre API remota e cache Room',
        alternative: 'Paginação manual com scroll listeners e contadores em ViewModel',
        reason:
          'Gerencia automaticamente separadores, limites de pré-busca, estados de erro e retentativas nativamente no Compose.',
      },
      {
        decision: 'Dagger Hilt para Injeção de Dependências',
        chosen: 'Hilt com @HiltViewModel e escopo de ciclo de vida nativo',
        alternative: 'Service Locator manual ou Koin',
        reason:
          'Validação estática em tempo de compilação sem overhead de reflexão em tempo de execução no Android.',
      },
    ],
    highlightCode: {
      title: 'MovieRepositoryImpl.kt',
      language: 'kotlin',
      code: `package com.sbaldasso.tmdbapp.domain.repository

import androidx.paging.ExperimentalPagingApi
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.map
import com.sbaldasso.tmdbapp.data.local.AppDatabase
import com.sbaldasso.tmdbapp.data.local.dao.MovieDao
import com.sbaldasso.tmdbapp.data.local.mapper.toDomain
import com.sbaldasso.tmdbapp.data.local.mapper.toEntity
import com.sbaldasso.tmdbapp.data.paging.MovieRemoteMediator
import com.sbaldasso.tmdbapp.data.remote.api.TMDBApiService
import com.sbaldasso.tmdbapp.data.remote.mapper.toDomain
import com.sbaldasso.tmdbapp.domain.model.Movie
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class MovieRepositoryImpl @Inject constructor(
    private val apiService: TMDBApiService,
    private val movieDao: MovieDao,
    private val database: AppDatabase
) : MovieRepository {

    override suspend fun getMovieDetails(movieId: Int): Result<Movie> {
        return try {
            val movieDto = apiService.getMovieDetails(movieId)
            val movie = movieDto.toDomain()

            movieDao.insertMovie(movie.toEntity(page = 0))
            Result.success(movie)
        } catch (e: Exception) {
            val cachedMovie = movieDao.getMovieById(movieId)
            if (cachedMovie != null) {
                Result.success(cachedMovie.toDomain())
            } else {
                Result.failure(e)
            }
        }
    }

    @OptIn(ExperimentalPagingApi::class)
    override fun getPopularMovies(): Flow<PagingData<Movie>> {
        return Pager(
            config = PagingConfig(pageSize = 20, enablePlaceholders = false),
            remoteMediator = MovieRemoteMediator(apiService, database),
            pagingSourceFactory = { movieDao.getPagedMovies() }
        ).flow.map { pagingData ->
            pagingData.map { it.toDomain() }
        }
    }
}`,
    },
  },
  {
    name: 'Java-Banking-Core',
    slug: 'java-banking-core',
    title: 'Java Banking Core',
    description:
      'Motor bancário transacional resiliente implementado em Java, com Domain-Driven Design, partidas dobradas e trilha de auditoria imutável.',
    url: 'https://github.com/samuelbaldasso/Java-Banking-Core',
    homepageUrl: null,
    stargazerCount: 0,
    forkCount: 0,
    primaryLanguage: {
      name: 'Java',
      color: '#b07219',
    },
    repositoryTopics: [
      'java',
      'spring-boot',
      'clean-architecture',
      'banking-core',
      'domain-driven-design',
      'double-entry',
      'transactional-outbox',
    ],
    pushedAt: '2025-08-15T10:00:00Z',
    isAndroid: false,
    releasesUrl: 'https://github.com/samuelbaldasso/Java-Banking-Core/releases',
    architectureSummary: {
      pattern: 'Clean Architecture + DDD + Double-Entry Bookkeeping',
      layers: [
        {
          name: 'Camada de API',
          description: 'Controladores REST, autenticação OAuth2/JWT e DTOs com validação estrita.',
          tech: ['Spring Web', 'Spring Security', 'RFC 7807 Problem Details'],
        },
        {
          name: 'Camada de Domínio & Transação',
          description: 'Partidas dobradas (Σ débitos = Σ créditos), bloqueio pessimista e idempotência.',
          tech: ['Pessimistic Locking', 'Double-Entry Ledger', 'Idempotency Keys'],
        },
        {
          name: 'Camada de Eventos & Mensageria',
          description: 'Padrão Transactional Outbox para envio atômico de eventos ao Apache Kafka.',
          tech: ['Transactional Outbox', 'Apache Kafka', 'PostgreSQL'],
        },
      ],
    },
    tradeOffs: [
      {
        decision: 'Double-Entry Bookkeeping com Livro-Razão Imutável',
        chosen: 'Nenhuma exclusão ou mutação física: correções realizadas via lançamentos de estorno',
        alternative: 'UPDATE direto em colunas de saldo nas contas',
        reason:
          'Garante conformidade com auditoria financeira internacional e elimina riscos de concorrência em leitura suja.',
      },
      {
        decision: 'Transactional Outbox Pattern para Kafka',
        chosen: 'Gravação da intenção de mensagem na mesma transação ACID do banco relacional',
        alternative: 'Publicação síncrona direta ao Kafka durante o request HTTP',
        reason:
          'Previne perda de eventos ou inconsistência de duas fases caso a conexão com o broker oscile.',
      },
    ],
    highlightCode: {
      title: 'LedgerEntryService.java',
      language: 'java',
      code: `package com.samuelbaldasso.banking.domain.service;

import com.samuelbaldasso.banking.domain.model.Account;
import com.samuelbaldasso.banking.domain.model.LedgerEntry;
import com.samuelbaldasso.banking.domain.model.Money;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class LedgerEntryService {

    @Transactional
    public void executeTransfer(Account source, Account destination, Money amount, String idempotencyKey) {
        if (amount.isNegativeOrZero()) {
            throw new IllegalArgumentException("Transfer amount must be positive");
        }

        // Bloqueio pessimista e validação de saldo
        source.debit(amount);
        destination.credit(amount);

        // Registro de partidas dobradas (Σ Débitos = Σ Créditos)
        UUID transactionId = UUID.randomUUID();
        LedgerEntry debitEntry = LedgerEntry.createDebit(transactionId, source.getId(), amount, idempotencyKey);
        LedgerEntry creditEntry = LedgerEntry.createCredit(transactionId, destination.getId(), amount, idempotencyKey);

        // Persistência com Outbox para propagação segura de eventos
        saveAndPublishEvent(debitEntry, creditEntry);
    }
}`,
    },
  },
  {
    name: 'Java-Subscription-B2C-Service',
    slug: 'java-subscription-b2c-service',
    title: 'Java Subscription B2C Service',
    description:
      'Microsserviço de gestão de assinaturas recorrentes B2C projetado com alta disponibilidade, retry policies e consistência eventual.',
    url: 'https://github.com/samuelbaldasso/Java-Subscription-B2C-Service',
    homepageUrl: null,
    stargazerCount: 0,
    forkCount: 0,
    primaryLanguage: {
      name: 'Java',
      color: '#b07219',
    },
    repositoryTopics: [
      'java',
      'spring-boot-3',
      'microservices',
      'subscription-management',
      'resilience4j',
      'redis',
    ],
    pushedAt: '2025-07-10T09:00:00Z',
    isAndroid: false,
    releasesUrl: 'https://github.com/samuelbaldasso/Java-Subscription-B2C-Service/releases',
    architectureSummary: {
      pattern: 'Event-Driven Microservices + Resilience Patterns',
      layers: [
        {
          name: 'Camada de API & Faturamento',
          description: 'Gestão de planos, ciclo de vida da assinatura e cobrança recorrente automatizada.',
          tech: ['Spring Boot 3', 'REST API', 'Scheduled Billing Tasks'],
        },
        {
          name: 'Resiliência & Concorrência',
          description: 'Circuit breakers com Resilience4j, cache Redis e bloqueio otimista contra conflitos.',
          tech: ['Resilience4j', 'Redis Cache', 'Optimistic Locking'],
        },
      ],
    },
    tradeOffs: [
      {
        decision: 'Resilience4j Circuit Breaker no Gateway de Pagamento',
        chosen: 'Degradação graciosa e retentativas com backoff exponencial',
        alternative: 'Chamadas diretas com timeout padrão',
        reason:
          'Protege a thread pool do serviço contra esgotamento quando provedores de pagamento externos enfrentam latência elevada.',
      },
      {
        decision: 'Bloqueio Otimista (@Version) no Ciclo da Assinatura',
        chosen: 'Detecção de conflito na alteração de status simultânea',
        alternative: 'Lock de tabela ou bloqueio estático',
        reason:
          'Permite alto throughput de leitura de status mantendo segurança em renovações ou cancelamentos concorrentes.',
      },
    ],
    highlightCode: {
      title: 'SubscriptionLifecycleService.java',
      language: 'java',
      code: `package com.samuelbaldasso.subscription.domain.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SubscriptionLifecycleService {

    @CircuitBreaker(name = "paymentGateway", fallbackMethod = "handlePaymentFallback")
    @Retry(name = "paymentGateway")
    @Transactional
    public BillingResult processRecurringCharge(Subscription subscription) {
        // Cobrança automática com isolamento contra falhas de gateway terceiro
        return paymentClient.charge(subscription.getCustomerId(), subscription.getCurrentPlan().getPrice());
    }

    public BillingResult handlePaymentFallback(Subscription subscription, Throwable t) {
        // Enfileira para reprocessamento em fila de Dead Letter Queue (DLQ)
        return BillingResult.scheduledForRetry(subscription.getId(), t.getMessage());
    }
}`,
    },
  },
];
