export const dynamic = 'force-dynamic';

import { blogs } from '@/utils/data/blogs';
import Link from 'next/link';
import { BsArrowLeft, BsClock, BsCalendar3, BsArrowRight } from 'react-icons/bs';

export const metadata = {
  title: 'Blog — Venkatraman Nagarajan',
  description: 'Technical articles on .NET Core, Azure, microservices, and enterprise software engineering.',
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#054bad] mb-8 transition-colors font-mono">
        <BsArrowLeft size={14} />
        Back to Portfolio
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <span className="bg-[#0f1117] w-fit text-white px-5 py-3 text-xl font-bold rounded-md tracking-wide font-mono">
          &gt; BLOG
        </span>
        <span className="flex-1 h-[2px] bg-gradient-to-r from-[#054bad]/50 to-transparent" />
      </div>

      <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-xl">
        Technical articles on .NET Core, Azure cloud architecture, microservices, and enterprise software engineering patterns — from real projects.
      </p>

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
            <article className="h-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {/* Gradient cover */}
              <div className={`h-36 bg-gradient-to-r ${blog.gradient} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl select-none">{blog.icon}</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-[#054bad] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#054bad] transition-colors duration-200">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1">
                      <BsCalendar3 size={10} />
                      {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <BsClock size={10} />
                      {blog.readTime}
                    </span>
                  </div>
                  <span className="text-[#054bad] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    Read <BsArrowRight size={11} />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
