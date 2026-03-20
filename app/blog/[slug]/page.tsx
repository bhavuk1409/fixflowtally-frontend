import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, User } from "lucide-react";
import { blogPosts, formatBlogDate, getBlogPost } from "../data";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Fixflow Blog",
    };
  }
  return {
    title: `${post.title} | Fixflow Blog`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3);

  return (
    <main style={{ background: "#0a1a0f", minHeight: "100vh", color: "#e8f5e9" }}>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(10,26,15,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(74,222,128,0.12)",
        }}
      >
        <Link
          href="/blog"
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75"
          style={{ color: "#4ade80" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <Link
          href="/sign-up"
          className="rounded-full px-5 py-2 text-sm font-bold text-black transition hover:opacity-90"
          style={{ background: "#4ade80" }}
        >
          Start with Fixflow
        </Link>
      </nav>

      <div className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
        <header>
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            style={{
              color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.24)",
              background: "rgba(74,222,128,0.08)",
            }}
          >
            {post.tag}
          </span>

          <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#92b8a0" }}>
            {post.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs" style={{ color: "#88ae93" }}>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>
        </header>

        <article className="mt-10 space-y-8">
          {post.sections.map((section, index) => (
            <section
              key={`${section.title ?? "section"}-${index}`}
              className="rounded-2xl p-6"
              style={{
                border: "1px solid rgba(74,222,128,0.12)",
                background: "rgba(74,222,128,0.04)",
              }}
            >
              {section.title ? <h2 className="text-xl font-bold text-white">{section.title}</h2> : null}
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${post.slug}-paragraph-${paragraphIndex}`}
                    className="text-sm leading-relaxed"
                    style={{ color: "#9ac1a7" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm" style={{ color: "#8db79a" }}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <section className="mt-12">
          <h3 className="text-lg font-bold text-white">Related articles</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="rounded-xl p-4 transition hover:border-[rgba(74,222,128,0.26)]"
                style={{
                  border: "1px solid rgba(74,222,128,0.13)",
                  background: "rgba(74,222,128,0.03)",
                }}
              >
                <p className="text-xs" style={{ color: "#7ea98a" }}>
                  {relatedPost.tag}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-white">{relatedPost.title}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#4ade80" }}>
                  Read article
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
