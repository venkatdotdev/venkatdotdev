"use client";

import { useState } from "react";
import { BsClipboard, BsCheckLg, BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

const GRADIENTS = [
  { label: "Blue → Cyan",         value: "from-blue-600 via-blue-500 to-cyan-400",        icon: "⚡" },
  { label: "Violet → Pink",       value: "from-violet-600 via-purple-500 to-pink-400",    icon: "☁" },
  { label: "Green → Teal",        value: "from-green-600 via-teal-500 to-cyan-400",       icon: "📊" },
  { label: "Orange → Amber",      value: "from-orange-600 via-orange-500 to-amber-400",   icon: "🔥" },
  { label: "Rose → Pink",         value: "from-rose-600 via-rose-500 to-pink-400",        icon: "🚀" },
  { label: "Indigo → Violet",     value: "from-indigo-600 via-indigo-500 to-violet-400",  icon: "🏗" },
];

const COMMON_TAGS = [
  ".NET Core", "C#", "Azure", "Microservices", "EF Core",
  "SQL Server", "React", "Docker", "CI/CD", "Architecture",
  "Performance", "Security", "API", "DDD", "Testing",
  "GitHub Copilot", "AI", "Cloud", "DevOps",
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminBlogPage() {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    publishedAt: new Date().toISOString().split("T")[0],
    readTime: "8 min",
    tags: [],
    gradient: GRADIENTS[0].value,
    icon: GRADIENTS[0].icon,
    content: "",
  });
  const [copied, setCopied] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const slug = slugify(form.title || "your-post-title");

  const generated = `  {
    id: Date.now(), // replace with next sequential number
    slug: '${slug}',
    title: '${form.title.replace(/'/g, "\\'")}',
    excerpt: '${form.excerpt.replace(/'/g, "\\'")}',
    publishedAt: '${form.publishedAt}',
    readTime: '${form.readTime}',
    tags: [${form.tags.map(t => `'${t}'`).join(", ")}],
    gradient: '${form.gradient}',
    icon: '${form.icon}',
    content: \`
${form.content}
    \`,
  },`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleTag = (tag) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  };

  const addCustomTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      if (!form.tags.includes(tagInput.trim())) {
        setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#054bad] mb-6 font-mono transition-colors">
          <BsArrowLeft size={13} /> Back to Blog
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <span className="bg-[#0f1117] text-white px-5 py-3 text-xl font-bold rounded-md font-mono">
            &gt; NEW POST
          </span>
          <span className="flex-1 h-[2px] bg-gradient-to-r from-[#054bad]/50 to-transparent" />
        </div>

        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Fill in the form → copy the generated JSON → paste it into{" "}
          <code className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-[#054bad] font-mono text-xs">
            utils/data/blogs.js
          </code>{" "}
          inside the <code className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded font-mono text-xs">blogs</code> array.
        </p>

        <div className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">Title *</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054bad]/30 bg-white"
              placeholder="EF Core Performance Optimization in .NET 8"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            <p className="mt-1 text-[11px] font-mono text-gray-400">slug: /{slug}</p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">Excerpt *</label>
            <textarea
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054bad]/30 bg-white resize-none"
              placeholder="Short summary shown on the blog listing page..."
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            />
          </div>

          {/* Date + Read time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">Publish Date</label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054bad]/30 bg-white font-mono"
                value={form.publishedAt}
                onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">Read Time</label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#054bad]/30 bg-white font-mono"
                placeholder="8 min"
                value={form.readTime}
                onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {COMMON_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all duration-150
                    ${form.tags.includes(tag)
                      ? "bg-[#054bad] text-white border-[#054bad]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#054bad]/50"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#054bad]/30 bg-white font-mono"
              placeholder="Type custom tag + press Enter"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={addCustomTag}
            />
          </div>

          {/* Cover gradient + icon */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Cover Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GRADIENTS.map(g => (
                <button
                  key={g.value}
                  onClick={() => setForm(f => ({ ...f, gradient: g.value, icon: g.icon }))}
                  className={`h-16 rounded-xl bg-gradient-to-r ${g.value} flex items-center justify-center text-2xl
                    ring-2 transition-all duration-150
                    ${form.gradient === g.value ? "ring-[#054bad] ring-offset-2" : "ring-transparent"}`}
                >
                  {g.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">
              Content <span className="text-gray-400 font-normal normal-case">(HTML — use &lt;h2&gt;, &lt;p&gt;, &lt;pre&gt;&lt;code&gt;, &lt;ul&gt;&lt;li&gt;)</span>
            </label>
            <textarea
              rows={14}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#054bad]/30 bg-white resize-y"
              placeholder={"<h2>Introduction</h2>\n<p>Your content here...</p>\n\n<h2>Code Example</h2>\n<pre><code>var x = new MyClass();\nx.DoSomething();</code></pre>"}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            />
          </div>

          {/* Generated JSON */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Generated JSON</label>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200
                  ${copied
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#054bad] hover:text-[#054bad]"}`}
              >
                {copied ? <BsCheckLg size={12} /> : <BsClipboard size={12} />}
                {copied ? "Copied!" : "Copy JSON"}
              </button>
            </div>
            <pre className="w-full bg-[#0a0e1a] text-green-300 text-[12px] font-mono rounded-2xl p-5 overflow-x-auto border border-[#1e2533] leading-relaxed whitespace-pre-wrap break-words">
              {generated}
            </pre>
            <p className="mt-2 text-xs text-gray-400 font-mono">
              → Paste inside the <span className="text-green-600">blogs</span> array in{" "}
              <span className="text-sky-500">utils/data/blogs.js</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
