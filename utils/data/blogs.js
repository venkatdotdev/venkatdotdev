export const blogs = [
  {
    id: 1,
    slug: 'clean-architecture-dotnet-8',
    title: 'Clean Architecture in .NET 8: Layers, Dependencies & Real-World Patterns',
    excerpt: 'A practical guide to implementing Clean Architecture in .NET 8 — covering project structure, dependency inversion, use cases, and real patterns I\'ve used in enterprise healthcare and retail systems.',
    publishedAt: '2025-05-18',
    readTime: '9 min',
    tags: ['.NET Core', 'Architecture', 'C#', 'DDD'],
    gradient: 'from-blue-600 via-blue-500 to-cyan-400',
    icon: '⚡',
    content: `
<h2>Why Clean Architecture?</h2>
<p>After working on monolithic codebases that became impossible to test or extend, I adopted Clean Architecture as the standard starting point for every .NET project. The core idea is simple: dependencies always point inward. Business logic knows nothing about databases, HTTP, or UI frameworks.</p>

<h2>Project Structure</h2>
<pre><code>src/
├── Domain/           # Entities, value objects, domain events
├── Application/      # Use cases, interfaces, DTOs
├── Infrastructure/   # EF Core, email, external APIs
└── WebApi/           # Controllers, middleware, DI setup</code></pre>

<p>The <strong>Domain</strong> layer has zero dependencies. The <strong>Application</strong> layer defines interfaces — <code>IOrderRepository</code>, <code>IEmailService</code> — but never implements them. <strong>Infrastructure</strong> provides concrete implementations. <strong>WebApi</strong> wires everything together via dependency injection.</p>

<h2>Dependency Inversion in Practice</h2>
<pre><code>// Application layer — defines the contract
public interface IWarehouseRepository
{
    Task&lt;WarehouseItem&gt; GetByIdAsync(Guid id, CancellationToken ct);
    Task SaveAsync(WarehouseItem item, CancellationToken ct);
}

// Infrastructure layer — implements it
public class WarehouseRepository : IWarehouseRepository
{
    private readonly AppDbContext _db;
    public WarehouseRepository(AppDbContext db) => _db = db;

    public async Task&lt;WarehouseItem&gt; GetByIdAsync(Guid id, CancellationToken ct)
        => await _db.WarehouseItems.FindAsync(new object[] { id }, ct)
           ?? throw new NotFoundException(id);
}</code></pre>

<h2>Use Case Pattern (CQRS-lite)</h2>
<p>Rather than fat controllers, every operation becomes a <em>command</em> or <em>query</em> handled by a dedicated class. I use <strong>MediatR</strong> for this:</p>
<pre><code>// Command
public record ReceiveStockCommand(Guid ItemId, int Quantity) : IRequest&lt;Unit&gt;;

// Handler lives in Application layer
public class ReceiveStockHandler : IRequestHandler&lt;ReceiveStockCommand, Unit&gt;
{
    private readonly IWarehouseRepository _repo;
    public ReceiveStockHandler(IWarehouseRepository repo) => _repo = repo;

    public async Task&lt;Unit&gt; Handle(ReceiveStockCommand cmd, CancellationToken ct)
    {
        var item = await _repo.GetByIdAsync(cmd.ItemId, ct);
        item.ReceiveStock(cmd.Quantity); // domain method
        await _repo.SaveAsync(item, ct);
        return Unit.Value;
    }
}</code></pre>

<h2>Key Takeaways</h2>
<ul>
  <li>Your domain and application layers should compile and unit-test with no database installed.</li>
  <li>Controllers are thin — they translate HTTP into commands and return results.</li>
  <li>Never let EF Core entities leak into your domain — use mapping.</li>
  <li>Domain events are the clean way to trigger side effects without coupling layers.</li>
</ul>

<p>I've applied this pattern across WMS platforms at UPS Healthcare and financial APIs at LTIMindtree. The payoff is real: adding a new storage backend or changing email providers becomes a one-file change.</p>
    `,
  },
  {
    id: 2,
    slug: 'microservices-azure-service-bus-dotnet',
    title: 'Event-Driven Microservices with .NET Core & Azure Service Bus',
    excerpt: 'How I architect asynchronous microservices using Azure Service Bus topics, dead-letter queues, and the outbox pattern — with working .NET 8 code samples.',
    publishedAt: '2025-04-10',
    readTime: '11 min',
    tags: ['.NET Core', 'Microservices', 'Azure', 'Event-Driven'],
    gradient: 'from-violet-600 via-purple-500 to-pink-400',
    icon: '☁',
    content: `
<h2>The Problem with Synchronous Microservices</h2>
<p>Direct HTTP calls between services create tight coupling — if the inventory service is down, the order service fails too. Event-driven architecture breaks this dependency. Services publish events; subscribers react asynchronously in their own time.</p>

<h2>Azure Service Bus: Topics vs Queues</h2>
<p>Use <strong>Queues</strong> when only one consumer needs a message (e.g., send one email). Use <strong>Topics + Subscriptions</strong> when multiple services need the same event (e.g., <code>OrderPlaced</code> triggers both inventory deduction and billing).</p>

<h2>Publishing Events from .NET</h2>
<pre><code>// Register in Program.cs
builder.Services.AddSingleton&lt;ServiceBusClient&gt;(sp =>
    new ServiceBusClient(builder.Configuration["AzureServiceBus:ConnectionString"]));

// Publisher
public class OrderEventPublisher
{
    private readonly ServiceBusSender _sender;

    public OrderEventPublisher(ServiceBusClient client)
        => _sender = client.CreateSender("order-events");

    public async Task PublishOrderPlacedAsync(OrderPlacedEvent evt)
    {
        var body = JsonSerializer.Serialize(evt);
        var message = new ServiceBusMessage(body)
        {
            ContentType = "application/json",
            Subject = nameof(OrderPlacedEvent),
            MessageId = evt.OrderId.ToString(),
        };
        await _sender.SendMessageAsync(message);
    }
}</code></pre>

<h2>Consuming with Background Service</h2>
<pre><code>public class InventoryWorker : BackgroundService
{
    private readonly ServiceBusProcessor _processor;

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _processor.ProcessMessageAsync += HandleMessageAsync;
        _processor.ProcessErrorAsync  += HandleErrorAsync;
        await _processor.StartProcessingAsync(ct);
    }

    private async Task HandleMessageAsync(ProcessMessageEventArgs args)
    {
        var evt = JsonSerializer.Deserialize&lt;OrderPlacedEvent&gt;(args.Message.Body);
        // deduct stock...
        await args.CompleteMessageAsync(args.Message);
    }
}</code></pre>

<h2>The Outbox Pattern — Avoid Lost Events</h2>
<p>Never publish directly from within a database transaction — the DB commit might succeed but the publish might fail, leaving your system in an inconsistent state. Instead, write the event to an <em>outbox table</em> in the same transaction, then let a background job publish and delete it.</p>
<pre><code>// Same DbContext transaction
await using var tx = await _db.Database.BeginTransactionAsync();
_db.Orders.Add(order);
_db.OutboxMessages.Add(new OutboxMessage(new OrderPlacedEvent(order)));
await _db.SaveChangesAsync();
await tx.CommitAsync();
// Background worker picks up OutboxMessages and publishes to Service Bus</code></pre>

<h2>Dead-Letter Queue Monitoring</h2>
<p>Always subscribe to the dead-letter queue in staging. Messages land there after max delivery attempts. Set up an Azure Monitor alert on DLQ depth — it's your early warning for deserialization bugs or downstream service failures.</p>
    `,
  },
  {
    id: 3,
    slug: 'ef-core-performance-optimization',
    title: 'Entity Framework Core 8: Performance Optimization from N+1 to Production',
    excerpt: 'Practical EF Core performance techniques I\'ve applied on high-volume WMS and retail platforms — covering N+1 queries, AsNoTracking, compiled queries, and SQL profiling.',
    publishedAt: '2025-03-05',
    readTime: '10 min',
    tags: ['.NET Core', 'EF Core', 'SQL Server', 'Performance'],
    gradient: 'from-green-600 via-teal-500 to-cyan-400',
    icon: '📊',
    content: `
<h2>The N+1 Problem</h2>
<p>This is the most common EF Core performance killer. You load a list of orders, then for each order EF issues another query to load its items — 1 query becomes N+1.</p>
<pre><code>// BAD — N+1 queries
var orders = await _db.Orders.ToListAsync();
foreach (var order in orders)
{
    // triggers a new query per order!
    Console.WriteLine(order.Items.Count);
}

// GOOD — single join query
var orders = await _db.Orders
    .Include(o => o.Items)
    .ToListAsync();</code></pre>

<h2>AsNoTracking for Read Queries</h2>
<p>The EF change tracker adds significant overhead for queries that will never be updated. On read-heavy endpoints, <code>AsNoTracking()</code> delivers a 20–40% speed boost.</p>
<pre><code>// API endpoint returning warehouse inventory
var items = await _db.WarehouseItems
    .AsNoTracking()
    .Where(i => i.LocationCode == locationCode)
    .Select(i => new ItemDto(i.Id, i.Sku, i.Quantity))
    .ToListAsync();</code></pre>

<h2>Compiled Queries</h2>
<p>For hot paths that run thousands of times per minute, EF Core needs to translate LINQ to SQL each call. Compiled queries cache the translation:</p>
<pre><code>// Compiled once, reused on every call
private static readonly Func&lt;AppDbContext, string, Task&lt;WarehouseItem?&gt;&gt;
    GetItemBySku = EF.CompileAsyncQuery(
        (AppDbContext db, string sku) =>
            db.WarehouseItems.FirstOrDefault(i => i.Sku == sku));

// Usage — no LINQ translation overhead
var item = await GetItemBySku(_db, "SKU-12345");</code></pre>

<h2>Pagination — Never Skip Without a Keyset</h2>
<p>OFFSET/FETCH pagination gets slower as pages increase. With 1M rows, page 50,000 is painful. Switch to keyset pagination:</p>
<pre><code>// SLOW for large pages
var page = await _db.Orders
    .OrderBy(o => o.CreatedAt)
    .Skip(pageIndex * pageSize)
    .Take(pageSize)
    .ToListAsync();

// FAST — keyset cursor
var page = await _db.Orders
    .Where(o => o.CreatedAt > lastSeenDate)
    .OrderBy(o => o.CreatedAt)
    .Take(pageSize)
    .ToListAsync();</code></pre>

<h2>Profiling with EF Core Logging</h2>
<p>Always profile in staging before shipping. Enable SQL logging to see exactly what queries EF generates:</p>
<pre><code>// appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}</code></pre>
<p>Better yet, use <strong>MiniProfiler</strong> or <strong>Azure Application Insights</strong> to capture slow queries in production. A query taking &gt;100ms on a hot path is a bug, not a warning.</p>
    `,
  },
];
