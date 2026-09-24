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
      '/projects/finance-flow/01_accounts_screen.png',
      '/projects/finance-flow/02_transactions_screen.png',
      '/projects/finance-flow/03_budgets_screen.png',
      '/projects/finance-flow/04_goals_screen.png',
      '/projects/finance-flow/05_cards_screen.png',
      '/projects/finance-flow/06_settings_screen.png',
      '/projects/finance-flow/07_create_account_dialog.png',
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
      '/projects/movie-db/home.png',
      '/projects/movie-db/details.png',
      '/projects/movie-db/search.png',
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
