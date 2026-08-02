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
  {
    id: 4,
    slug: 'csharp-reflection-basics',
    title: 'C# Reflection Basics: Inspecting and Invoking Code at Runtime',
    excerpt: 'A practical primer on .NET reflection — inspecting types, invoking members dynamically, and where it actually earns its place in production code without killing performance.',
    publishedAt: '2026-08-02',
    readTime: '7 min',
    tags: ['C#', '.NET Core', 'Reflection', 'Advanced'],
    gradient: 'from-orange-600 via-orange-500 to-amber-400',
    icon: '🔥',
    content: `
<h2>What Reflection Actually Gives You</h2>
<p>Reflection lets your code inspect and interact with types, methods, and properties it didn't know about at compile time. It's how ASP.NET Core discovers your controllers, how JSON serializers map properties, and how test runners find your <code>[Fact]</code> methods. You rarely write it directly — but understanding it demystifies half the "magic" in the frameworks you use daily.</p>

<h2>Inspecting Types at Runtime</h2>
<pre><code>Type type = typeof(WarehouseItem);

Console.WriteLine(type.Name);               // WarehouseItem
Console.WriteLine(type.Namespace);          // MyApp.Domain

foreach (var prop in type.GetProperties())
{
    Console.WriteLine($"{prop.Name}: {prop.PropertyType.Name}");
}

foreach (var method in type.GetMethods(BindingFlags.Public | BindingFlags.Instance))
{
    Console.WriteLine(method.Name);
}</code></pre>

<h2>Invoking Members Dynamically</h2>
<pre><code>var item = new WarehouseItem { Sku = "SKU-1", Quantity = 10 };
PropertyInfo prop = typeof(WarehouseItem).GetProperty("Quantity");

int current = (int)prop.GetValue(item);
prop.SetValue(item, current + 5);

MethodInfo method = typeof(WarehouseItem).GetMethod("ReceiveStock");
method.Invoke(item, new object[] { 20 });</code></pre>

<h2>A Real Use Case: A Simple Generic Mapper</h2>
<p>One place reflection genuinely earns its keep is writing small utilities that map matching properties between two unrelated types — useful for quick DTO ↔ entity mapping when pulling in AutoMapper is overkill:</p>
<pre><code>public static TDestination MapTo&lt;TDestination&gt;(object source) where TDestination : new()
{
    var destination = new TDestination();
    var sourceProps = source.GetType().GetProperties();
    var destProps = typeof(TDestination).GetProperties();

    foreach (var sp in sourceProps)
    {
        var dp = destProps.FirstOrDefault(p =&gt; p.Name == sp.Name && p.PropertyType == sp.PropertyType);
        dp?.SetValue(destination, sp.GetValue(source));
    }

    return destination;
}</code></pre>

<h2>The Performance Cost — and How to Avoid Paying It Twice</h2>
<p><code>MethodInfo.Invoke</code> is roughly <strong>10–100x slower</strong> than a direct call because of the boxing, argument validation, and dynamic dispatch involved. If reflection runs once at startup (like DI container scanning), that's fine. If it runs per-request in a hot path, it isn't.</p>
<p>The fix is to reflect <em>once</em> and cache a compiled delegate for repeated use:</p>
<pre><code>private static readonly Func&lt;WarehouseItem, int&gt; GetQuantity =
    (Func&lt;WarehouseItem, int&gt;)Delegate.CreateDelegate(
        typeof(Func&lt;WarehouseItem, int&gt;),
        typeof(WarehouseItem).GetProperty("Quantity")!.GetGetMethod()!);

// Reused on every call — near-native speed after the first setup
int qty = GetQuantity(item);</code></pre>

<h2>When to Reach for It (and When Not To)</h2>
<ul>
  <li>Use it for startup-time work: DI container registration, plugin discovery, attribute-driven configuration.</li>
  <li>Cache <code>MethodInfo</code>/<code>PropertyInfo</code> lookups or compile them to delegates if they run more than once.</li>
  <li>Avoid raw reflection inside request-handling hot paths — profile first, but assume it's a bottleneck until proven otherwise.</li>
  <li>For new code, consider <strong>source generators</strong> (what <code>System.Text.Json</code> uses now) — they get you the same "framework magic" with zero runtime reflection cost.</li>
</ul>
    `,
  },
  {
    id: 5,
    slug: 'microservices-fundamentals-when-to-split',
    title: 'Microservices Fundamentals: What They Actually Are (and When to Use Them)',
    excerpt: 'Before reaching for Azure Service Bus and event sourcing, here\'s the foundational thinking on service boundaries, coupling, and when microservices solve a problem instead of creating five new ones.',
    publishedAt: '2026-08-02',
    readTime: '8 min',
    tags: ['Microservices', 'Architecture', '.NET Core', 'DDD'],
    gradient: 'from-rose-600 via-rose-500 to-pink-400',
    icon: '🚀',
    content: `
<h2>What a Microservice Actually Is</h2>
<p>A microservice is a component that can be <strong>deployed independently</strong> and <strong>owns its own data</strong>. Neither property is optional — a "service" that shares a database with three others, or that can't ship without redeploying the whole system, is really just a distributed monolith wearing a microservices costume.</p>

<h2>The Core Trade-off</h2>
<p>Splitting a system buys you independent scaling, independent deployment, and fault isolation. It costs you network latency, eventual consistency, distributed debugging, and a much bigger DevOps surface area. Every microservices decision is really this trade-off in disguise — teams that skip evaluating it end up paying the cost without collecting the benefit.</p>

<h2>Signs You're Ready to Split</h2>
<ul>
  <li>Different parts of the system have genuinely different scaling needs (e.g., an image-processing pipeline vs. a low-traffic admin panel).</li>
  <li>Separate teams keep blocking each other on deploys because they own different areas of one codebase.</li>
  <li>You can draw a clean <strong>bounded context</strong> (in DDD terms) around the piece you want to extract — it has its own vocabulary, its own rules, and doesn't reach into other domains' data.</li>
</ul>

<h2>Signs You're Not Ready</h2>
<ul>
  <li>You're splitting along technical layers (a "database service," a "validation service") instead of business capability.</li>
  <li>The new services will still share a single SQL database — that's the #1 antipattern and it negates almost every benefit of splitting.</li>
  <li>You don't yet have monitoring/tracing in place — debugging a request that crosses four services without distributed tracing is miserable.</li>
</ul>

<h2>Defining Service Boundaries</h2>
<p>The most reliable technique is Domain-Driven Design's <strong>bounded context</strong>: group code around a business capability, not a database table. In a warehouse system, "Inventory" and "Billing" are separate bounded contexts even though they both reference "orders" — each context should have its own model of what an order <em>means</em> to it.</p>
<pre><code>// Inventory's view of an order — only cares about SKUs and quantities
public record OrderForFulfillment(Guid OrderId, IReadOnlyList&lt;OrderLine&gt; Lines);

// Billing's view of the same order — only cares about amounts
public record OrderForInvoicing(Guid OrderId, decimal Total, string Currency);</code></pre>

<h2>Common Mistake: The Shared Database</h2>
<p>The fastest way to end up with all the operational pain of microservices and none of the benefits is letting two services read/write the same tables. It re-couples them at the schema level — one service can't change a column without coordinating a release with the other. If two "services" need the same data, that's usually a signal they should either be one service, or one should own the data and expose it through an API/event, not a shared table.</p>

<h2>Start Simpler Than You Think</h2>
<p>In practice, I default to a well-structured <a href="/blog/clean-architecture-dotnet-8">modular monolith</a> first — cleanly separated by bounded context internally, but deployed as one unit. It's far easier to later extract a module into its own service (once you've proven the boundary is real) than to un-split five prematurely separated services back together.</p>
    `,
  },
  {
    id: 6,
    slug: 'dependency-injection-dotnet-basics',
    title: 'Dependency Injection in .NET: The Basics Beyond AddScoped',
    excerpt: 'What DI actually solves, the three .NET lifetimes explained with real failure scenarios, and the constructor injection patterns I default to on every project.',
    publishedAt: '2026-08-02',
    readTime: '7 min',
    tags: ['.NET Core', 'C#', 'DI', 'Architecture'],
    gradient: 'from-indigo-600 via-indigo-500 to-violet-400',
    icon: '🏗',
    content: `
<h2>The Problem DI Actually Solves</h2>
<p>Without DI, a class that needs a database connection typically constructs it directly — <code>new SqlWarehouseRepository()</code> buried inside a service. That hardwires the class to one specific implementation, makes unit testing painful (you can't swap in a fake), and scatters configuration logic everywhere. Dependency Injection just means: a class declares what it needs, and something else provides it.</p>

<h2>Constructor Injection vs Service Locator</h2>
<p>.NET supports pulling dependencies from the container manually (<code>IServiceProvider.GetService</code>), but constructor injection should be the default. It makes dependencies explicit and impossible to forget — the class literally won't compile without them:</p>
<pre><code>public class OrderService
{
    private readonly IWarehouseRepository _repo;
    private readonly IEmailService _email;

    public OrderService(IWarehouseRepository repo, IEmailService email)
    {
        _repo = repo;
        _email = email;
    }
}</code></pre>
<p>A class with eight constructor parameters is itself useful feedback — it's telling you the class is doing too much.</p>

<h2>The Three Lifetimes</h2>
<pre><code>builder.Services.AddSingleton&lt;ICacheService, MemoryCacheService&gt;();   // one instance, forever
builder.Services.AddScoped&lt;IWarehouseRepository, WarehouseRepository&gt;(); // one per HTTP request
builder.Services.AddTransient&lt;IEmailTemplateBuilder, EmailTemplateBuilder&gt;(); // new instance every time</code></pre>
<ul>
  <li><strong>Singleton</strong> — created once, shared for the app's lifetime. Good for stateless services, caches, configuration.</li>
  <li><strong>Scoped</strong> — one instance per request. The right default for anything touching a <code>DbContext</code>, since EF Core's change tracker isn't thread-safe across requests.</li>
  <li><strong>Transient</strong> — a new instance every time it's resolved. Good for small, stateless, cheap-to-construct helpers.</li>
</ul>

<h2>The Captive Dependency Bug</h2>
<p>The most common DI mistake in .NET: injecting a <strong>Scoped</strong> service into a <strong>Singleton</strong>. The singleton is built once, so it captures that first request's scoped instance forever — every later request silently reuses stale, request-specific state (or a disposed <code>DbContext</code>, which throws).</p>
<pre><code>// BAD — singleton captures a scoped DbContext at startup and never lets go
public class ReportCache
{
    public ReportCache(AppDbContext db) { ... } // AppDbContext is Scoped
}
builder.Services.AddSingleton&lt;ReportCache&gt;();

// GOOD — resolve the scoped dependency fresh, per use
public class ReportCache
{
    private readonly IServiceScopeFactory _scopeFactory;
    public ReportCache(IServiceScopeFactory scopeFactory) =&gt; _scopeFactory = scopeFactory;

    public async Task&lt;Report&gt; BuildAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService&lt;AppDbContext&gt;();
        // ... use db, then it's disposed when the scope ends
    }
}</code></pre>
<p>.NET's built-in container actually throws at startup (<code>InvalidOperationException: Cannot consume scoped service...</code>) if it detects this in Development mode with scope validation on — leave that setting on, it catches the bug before it ships.</p>

<h2>Testing With DI</h2>
<p>The payoff shows up in tests — swap the real repository for an in-memory fake without touching <code>OrderService</code> at all:</p>
<pre><code>var fakeRepo = new FakeWarehouseRepository();
var service = new OrderService(fakeRepo, Mock.Of&lt;IEmailService&gt;());
</code></pre>
    `,
  },
  {
    id: 7,
    slug: 'csharp-tips-and-tricks',
    title: 'C# Basics: Tips and Tricks I Wish I Knew Earlier',
    excerpt: 'Small C# language features and idioms that consistently clean up code — pattern matching, records, null-conditional operators, and a few LINQ one-liners that replace loops.',
    publishedAt: '2026-08-02',
    readTime: '6 min',
    tags: ['C#', 'Tips', '.NET Core', 'Performance'],
    gradient: 'from-blue-600 via-blue-500 to-cyan-400',
    icon: '⚡',
    content: `
<h2>Pattern Matching Switch Expressions</h2>
<p>Replace verbose if/else chains with a switch expression — it's exhaustive, readable, and the compiler warns you about missed cases:</p>
<pre><code>string ShippingLabel(OrderStatus status) =&gt; status switch
{
    OrderStatus.Pending    =&gt; "Awaiting confirmation",
    OrderStatus.Shipped    =&gt; "On the way",
    OrderStatus.Delivered  =&gt; "Delivered",
    OrderStatus.Cancelled  =&gt; "Cancelled",
    _                      =&gt; throw new ArgumentOutOfRangeException(nameof(status)),
};</code></pre>

<h2>Records for Immutable Data</h2>
<p>For DTOs, events, and value objects, <code>record</code> gives you value-based equality, <code>ToString()</code>, and immutability for free — no more hand-writing <code>Equals</code>/<code>GetHashCode</code>:</p>
<pre><code>public record OrderPlacedEvent(Guid OrderId, decimal Total, DateTime PlacedAt);

var a = new OrderPlacedEvent(id, 99.99m, DateTime.UtcNow);
var b = a with { Total = 79.99m }; // non-destructive update — a is untouched</code></pre>

<h2>Null-Conditional and Null-Coalescing Operators</h2>
<pre><code>// Instead of nested null checks
string city = customer?.Address?.City ?? "Unknown";

// Null-conditional invocation
customer?.NotifyAsync();

// Null-coalescing assignment (C# 8+) — only assigns if null
_cache ??= new MemoryCache();</code></pre>

<h2>LINQ One-Liners That Replace Loops</h2>
<pre><code>// Instead of a foreach + if + manual list building
var lowStock = items.Where(i =&gt; i.Quantity &lt; 10).ToList();

// GroupBy for quick aggregation
var totalsByCategory = orders
    .GroupBy(o =&gt; o.Category)
    .Select(g =&gt; new { Category = g.Key, Total = g.Sum(o =&gt; o.Amount) });

// Prefer this over manual loops for existence checks — short-circuits immediately
bool hasOverdue = invoices.Any(i =&gt; i.DueDate &lt; DateTime.UtcNow);</code></pre>

<h2>using Declarations (C# 8+)</h2>
<p>Drop the nested braces — the resource disposes at the end of the enclosing scope, not an explicit block:</p>
<pre><code>// Old style
using (var conn = new SqlConnection(connStr))
{
    conn.Open();
    // ...
}

// C# 8+ — disposes when the method returns
using var conn = new SqlConnection(connStr);
conn.Open();</code></pre>

<h2>String Interpolation With Formatting</h2>
<pre><code>decimal price = 1299.5m;
Console.WriteLine($"{price:C2}");           // $1,299.50
Console.WriteLine($"{DateTime.UtcNow:yyyy-MM-dd}"); // 2026-08-02

// Alignment for console tables
Console.WriteLine($"{"SKU",-12}{"Qty",5}");</code></pre>
<p>Small habits like these don't just look cleaner — they remove entire classes of null-reference and off-by-one bugs before they happen.</p>
    `,
  },
];
