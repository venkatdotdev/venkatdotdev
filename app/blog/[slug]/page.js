export const dynamic = 'force-dynamic';

import { blogs } from '@/utils/data/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/app/components/blog/share-buttons';
import { BsArrowLeft, BsClock, BsCalendar3 } from 'react-icons/bs';

export async function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return {};
  return { title: blog.title, description: blog.excerpt };
}

export default function BlogPost({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  const postUrl = `https://venkatdotdev.com/blog/${blog.slug}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#054bad] mb-8 transition-colors font-mono">
        <BsArrowLeft size={14} />
        Back to Blog
      </Link>

      {/* Cover gradient */}
      <div className={`w-full h-48 rounded-2xl bg-gradient-to-r ${blog.gradient} flex items-center justify-center mb-8 shadow-lg`}>
        <span className="text-6xl select-none">{blog.icon}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs text-[#054bad] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-5 text-sm text-gray-400 font-mono mb-6 pb-6 border-b border-gray-100">
        <span className="flex items-center gap-1.5">
          <BsCalendar3 size={12} />
          {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1.5">
          <BsClock size={12} />
          {blog.readTime} read
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500">Venkatraman Nagarajan</span>
      </div>

      {/* Share buttons */}
      <ShareButtons url={postUrl} title={blog.title} />

      {/* Content */}
      <article
        className="prose prose-gray max-w-none mt-8
          prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-3
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[15px]
          prose-pre:bg-[#0f1117] prose-pre:text-green-300 prose-pre:rounded-xl prose-pre:text-[13px] prose-pre:overflow-x-auto
          prose-code:font-mono prose-code:text-[#054bad] prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
          prose-pre:prose-code:text-green-300 prose-pre:prose-code:bg-transparent prose-pre:prose-code:px-0
          prose-ul:text-gray-600 prose-li:text-[15px]
          prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Bottom share */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-4">Found this useful? Share it:</p>
        <ShareButtons url={postUrl} title={blog.title} />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#054bad] transition-colors font-mono">
          <BsArrowLeft size={14} />
          All posts
        </Link>
      </div>
    </div>
  );
}
