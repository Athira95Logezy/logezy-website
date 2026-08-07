import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Clock, CalendarBlank, Tag, User,
  ListBullets, LinkedinLogo, FacebookLogo, XLogo, WhatsappLogo, LinkSimple, Check,
} from '@phosphor-icons/react';
import { blogs, BlogSection } from '../data/blogs';
import SEO, { BASE_URL } from '../components/SEO';

const EASE = [0.22, 1, 0.36, 1] as const;

const categoryColor: Record<string, { bg: string; text: string }> = {
  Healthcare:    { bg: '#FEF2F2', text: '#BE123C' },
  Technology:    { bg: '#EFF6FF', text: '#1D4ED8' },
  'Agency Tips': { bg: '#F0FDF4', text: '#15803D' },
  Workforce:     { bg: '#F0F9FF', text: '#0369A1' },
};

const allCategories = ['Healthcare', 'Technology', 'Agency Tips', 'Compliance', 'Timesheets', 'Workforce', 'Scheduling', 'Recruitment'];

/* ── Inline markdown-style links: [text](/internal) or [text](https://external) ── */
// Inline markdown: [text](/path) or [text](https://...) links, and **bold** spans.
const INLINE_RE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  INLINE_RE.lastIndex = 0;
  const linkStyle: React.CSSProperties = { color: '#2396C6', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'rgba(35,150,198,0.35)', textUnderlineOffset: 3 };
  while ((match = INLINE_RE.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, label, href, boldText] = match;
    if (boldText !== undefined) {
      nodes.push(<strong key={k++} style={{ color: '#183963', fontWeight: 700 }}>{boldText}</strong>);
    } else if (href.startsWith('http')) {
      nodes.push(<a key={k++} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{label}</a>);
    } else {
      nodes.push(<Link key={k++} to={href} style={linkStyle}>{label}</Link>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function slugToIso(dateStr: string): string | undefined {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/* ── Section renderer: heading (h2/h3), paragraphs, lists, tables ── */
function Section({ section, index }: { section: BlogSection; index: number }) {
  const HeadingTag = section.level === 3 ? 'h3' : 'h2';
  const headingStyle: React.CSSProperties = section.level === 3
    ? {
        fontSize: 'clamp(1rem,1.5vw,1.15rem)', fontWeight: 800, color: '#183963',
        margin: '28px 0 10px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em', lineHeight: 1.3,
        scrollMarginTop: 100,
      }
    : {
        fontSize: 'clamp(1.1rem,1.8vw,1.3rem)', fontWeight: 800, color: '#183963',
        margin: index === 0 ? '0 0 12px' : '36px 0 12px',
        fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em', lineHeight: 1.3,
        paddingLeft: 14, borderLeft: '3px solid #2396C6',
        scrollMarginTop: 100,
      };

  return (
    <div style={{ marginBottom: 12 }}>
      {section.heading && (
        <HeadingTag id={section.id} style={headingStyle}>{section.heading}</HeadingTag>
      )}
      {section.body && section.body.split('\n\n').map((para, j) => (
        <p key={j} style={{ fontSize: 15.5, color: '#334155', lineHeight: 1.82, margin: '0 0 18px', fontFamily: 'var(--font-body)' }}>
          {renderInline(para)}
        </p>
      ))}
      {section.list && (
        section.list.type === 'ol' ? (
          <ol style={{ margin: '0 0 20px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.list.items.map((item, j) => (
              <li key={j} style={{ fontSize: 15.5, color: '#334155', lineHeight: 1.7, fontFamily: 'var(--font-body)', paddingLeft: 4 }}>
                {renderInline(item)}
              </li>
            ))}
          </ol>
        ) : (
          <ul style={{ margin: '0 0 20px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 9, listStyleType: 'disc' }}>
            {section.list.items.map((item, j) => (
              <li key={j} style={{ fontSize: 15.5, color: '#334155', lineHeight: 1.7, fontFamily: 'var(--font-body)', paddingLeft: 4 }}>
                {renderInline(item)}
              </li>
            ))}
          </ul>
        )
      )}
      {section.table && (
        <div style={{ overflowX: 'auto', margin: '4px 0 24px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-body)', minWidth: 520 }}>
            {section.table.caption && (
              <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: '#94A3B8', padding: '10px 14px' }}>
                {section.table.caption}
              </caption>
            )}
            <thead>
              <tr>
                {section.table.headers.map((h, j) => (
                  <th key={j} scope="col" style={{ background: '#183963', color: '#fff', fontWeight: 700, textAlign: 'left', padding: '12px 16px', fontSize: 13, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, r) => (
                <tr key={r} style={{ background: r % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                  {row.map((cell, c) => (
                    <td key={c} style={{ padding: '11px 16px', color: c === 0 ? '#183963' : '#475569', fontWeight: c === 0 ? 700 : 400, borderTop: '1px solid #EDF2F7', lineHeight: 1.55 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const postIndex = blogs.findIndex(b => b.slug === slug);
  const post = postIndex >= 0 ? blogs[postIndex] : undefined;
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#183963' }}>Post not found</h1>
        <Link to="/resources/blog" style={{ color: '#2396C6', fontWeight: 700, textDecoration: 'none' }}>Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = blogs.filter(b => b.slug !== slug);
  const prevPost = postIndex > 0 ? blogs[postIndex - 1] : undefined;
  const nextPost = postIndex < blogs.length - 1 ? blogs[postIndex + 1] : undefined;

  const canonicalPath = `/resources/blog/${post.slug}`;
  const fullUrl = `${BASE_URL}${canonicalPath}`;
  const isoDate = slugToIso(post.date);
  const tocItems = post.sections.filter(s => s.id && s.heading);

  /* ── Structured data: Article (+ FAQPage when the post has FAQs) ── */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.coverImage}`,
    ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
    author: post.author
      ? { '@type': 'Organization', name: post.author === 'Logezy Team' ? 'Logezy' : post.author, url: BASE_URL }
      : { '@type': 'Organization', name: 'Logezy', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Logezy',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logezy_Logo.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
    url: fullUrl,
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
    articleSection: post.category,
    inLanguage: 'en-GB',
  };
  const faqSchema = post.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  /* ── Social share links ── */
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    { name: 'LinkedIn', Icon: LinkedinLogo, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: '#0A66C2' },
    { name: 'Facebook', Icon: FacebookLogo, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: '#1877F2' },
    { name: 'X', Icon: XLogo, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: '#0F172A' },
    { name: 'WhatsApp', Icon: WhatsappLogo, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, color: '#25D366' },
  ];

  function copyLink() {
    navigator.clipboard?.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function scrollToSection(e: React.MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <SEO
        title={`${post.seoTitle ?? post.title} | Logezy Blog`}
        description={post.seoDescription ?? (post.excerpt.length > 160 ? `${post.excerpt.slice(0, 157).trimEnd()}...` : post.excerpt)}
        keywords={post.tags?.length ? post.tags.join(', ') : `${post.category}, staffing blog, workforce management, Logezy`}
        canonical={canonicalPath}
        ogImage={post.coverImage}
        ogType="article"
        schema={faqSchema ? [articleSchema, faqSchema] : articleSchema}
        breadcrumbs={[
          { name: 'Resources', path: '/resources' },
          { name: 'Blog', path: '/resources/blog' },
          { name: post.title, path: canonicalPath },
        ]}
      />

      {/* ── Gradient hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 340 : 440, background: 'linear-gradient(135deg,#183963 0%,#1966AA 55%,#2396C6 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        {/* Animated floating circles */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -80, right: '8%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.16), rgba(255,255,255,0.03))', pointerEvents: 'none' }}
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 24, 0], x: [0, -18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ position: 'absolute', bottom: -110, right: '28%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(35,150,198,0.45), rgba(35,150,198,0.08))', pointerEvents: 'none' }}
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ position: 'absolute', top: '18%', left: '4%', width: 150, height: 150, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.22)', pointerEvents: 'none' }}
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 16, 0], x: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          style={{ position: 'absolute', top: '55%', left: '30%', width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, -14, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          style={{ position: 'absolute', top: '12%', right: '38%', width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 44 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <Link to="/resources/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.68)', textDecoration: 'none', marginBottom: 18 }}>
              <ArrowLeft weight="regular" style={{ width: 14, height: 14 }} /> Back to Blog
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                <Tag weight="fill" style={{ width: 10, height: 10 }} /> {post.category}
              </span>
              {post.author && (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.60)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <User weight="regular" style={{ width: 12, height: 12 }} />{post.author}
                </span>
              )}
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock weight="regular" style={{ width: 12, height: 12 }} />{post.readTime}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CalendarBlank weight="regular" style={{ width: 12, height: 12 }} />
                {isoDate ? <time dateTime={isoDate}>{post.date}</time> : post.date}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.14, margin: 0, fontFamily: 'var(--font-heading)', maxWidth: 860 }}>{post.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '48px 24px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: isMobile ? 24 : 32, alignItems: 'start' }}>

        {/* ── Main article ── */}
        <motion.article
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          style={{ background: '#fff', borderRadius: 20, padding: isMobile ? '24px 20px' : '44px 52px', boxShadow: '0 2px 24px rgba(24,57,99,0.07)', border: '1px solid rgba(35,150,198,0.08)', minWidth: 0 }}
        >
          {/* Excerpt lead */}
          <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.75, margin: '0 0 28px', fontFamily: 'var(--font-body)', fontWeight: 500, borderLeft: '4px solid #2396C6', paddingLeft: 18 }}>
            {post.excerpt}
          </p>

          {/* Table of contents */}
          {tocItems.length > 2 && (
            <nav aria-label="Table of contents" style={{ background: '#F8FAFC', borderRadius: 14, padding: '20px 24px', marginBottom: 32, border: '1px solid #E2E8F0' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 800, color: '#183963', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: 'var(--font-heading)' }}>
                <ListBullets weight="bold" style={{ width: 14, height: 14 }} /> Table of Contents
              </p>
              <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {tocItems.map(item => (
                  <li key={item.id} style={{ fontSize: 13.5, lineHeight: 1.5, marginLeft: item.level === 3 ? 16 : 0, listStyleType: item.level === 3 ? 'circle' : 'decimal', color: '#64748B' }}>
                    <a
                      href={`#${item.id}`}
                      onClick={e => scrollToSection(e, item.id!)}
                      style={{ color: '#2396C6', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {item.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {post.sections.map((section, i) => (
            <Section key={i} section={section} index={i} />
          ))}

          {/* FAQ section */}
          {post.faqs && post.faqs.length > 0 && (
            <section aria-label="Frequently asked questions" style={{ marginTop: 40 }}>
              <h2 style={{
                fontSize: 'clamp(1.1rem,1.8vw,1.3rem)', fontWeight: 800, color: '#183963',
                margin: '0 0 18px', fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em',
                paddingLeft: 14, borderLeft: '3px solid #2396C6',
              }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {post.faqs.map((faq, i) => (
                  <details key={i} style={{ background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <summary style={{ padding: '15px 20px', fontSize: 14.5, fontWeight: 700, color: '#183963', cursor: 'pointer', fontFamily: 'var(--font-heading)', lineHeight: 1.45, listStylePosition: 'inside' }}>
                      {faq.question}
                    </summary>
                    <p style={{ padding: '0 20px 16px 20px', margin: 0, fontSize: 14.5, color: '#475569', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <Tag weight="fill" style={{ width: 14, height: 14, color: '#94A3B8' }} />
              {post.tags.map(tag => (
                <span key={tag} style={{ padding: '4px 12px', borderRadius: 16, background: '#F1F5F9', color: '#475569', fontSize: 12, fontWeight: 600 }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Social sharing */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#183963', marginRight: 4 }}>Share this article:</span>
            {shareLinks.map(({ name, Icon, href, color }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${name}`}
                style={{ width: 36, height: 36, borderRadius: 10, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color, textDecoration: 'none' }}
              >
                <Icon weight="fill" style={{ width: 17, height: 17 }} />
              </a>
            ))}
            <button
              onClick={copyLink}
              aria-label="Copy link"
              style={{ width: 36, height: 36, borderRadius: 10, background: copied ? '#F0FDF4' : '#F8FAFC', border: `1px solid ${copied ? '#86EFAC' : '#E2E8F0'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: copied ? '#15803D' : '#475569', cursor: 'pointer' }}
            >
              {copied ? <Check weight="bold" style={{ width: 16, height: 16 }} /> : <LinkSimple weight="regular" style={{ width: 17, height: 17 }} />}
            </button>
          </div>

          {/* CTA block */}
          {post.cta && (
            <div style={{ marginTop: 36, background: 'linear-gradient(135deg,#EFF6FF 0%,#E8F5FB 100%)', borderRadius: 16, padding: '28px 32px', border: '1px solid rgba(35,150,198,0.15)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#183963', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>{post.cta.heading}</h3>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.70, margin: '0 0 20px', fontFamily: 'var(--font-body)' }}>{post.cta.body}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, background: 'linear-gradient(135deg,#183963,#2396C6)', color: '#fff', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 14px rgba(35,150,198,0.30)' }}>
                  Book a Free Demo <ArrowRight weight="regular" style={{ width: 14, height: 14 }} />
                </a>
                <Link to="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, background: '#fff', color: '#183963', fontSize: 14, fontWeight: 800, textDecoration: 'none', border: '1.5px solid rgba(35,150,198,0.35)' }}>
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {/* Previous / Next navigation */}
          {(prevPost || nextPost) && (
            <nav aria-label="Article navigation" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
              {prevPost ? (
                <Link to={`/resources/blog/${prevPost.slug}`} style={{ textDecoration: 'none', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '16px 20px', display: 'block' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    <ArrowLeft weight="bold" style={{ width: 11, height: 11 }} /> Previous Article
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#183963', lineHeight: 1.4, fontFamily: 'var(--font-heading)', display: 'block' }}>
                    {prevPost.title.length > 75 ? `${prevPost.title.slice(0, 75)}...` : prevPost.title}
                  </span>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link to={`/resources/blog/${nextPost.slug}`} style={{ textDecoration: 'none', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '16px 20px', display: 'block', textAlign: 'right' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5, fontSize: 11.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Next Article <ArrowRight weight="bold" style={{ width: 11, height: 11 }} />
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#183963', lineHeight: 1.4, fontFamily: 'var(--font-heading)', display: 'block' }}>
                    {nextPost.title.length > 75 ? `${nextPost.title.slice(0, 75)}...` : nextPost.title}
                  </span>
                </Link>
              ) : <div />}
            </nav>
          )}
        </motion.article>

        {/* ── Right sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20, position: isMobile ? 'static' : 'sticky', top: 24 }}
        >

          {/* Categories */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(24,57,99,0.06)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 16px', fontFamily: 'var(--font-heading)' }}>Categories</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {allCategories.map((cat, i) => (
                <span key={cat} style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'default',
                  background: cat === post.category ? '#183963' : i % 2 === 0 ? '#EFF6FF' : '#F0FDF4',
                  color: cat === post.category ? '#fff' : i % 2 === 0 ? '#1D4ED8' : '#15803D',
                  border: cat === post.category ? 'none' : '1.5px solid transparent',
                }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Other posts */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(24,57,99,0.06)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 18px', fontFamily: 'var(--font-heading)' }}>Related Articles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {relatedPosts.map((rel) => (
                <Link key={rel.slug} to={`/resources/blog/${rel.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: '10px', borderRadius: 12,
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    {/* Thumbnail */}
                    <div style={{ width: 72, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={rel.coverImage} alt={rel.coverImageAlt ?? rel.title} loading="lazy" decoding="async" width={72} height={64} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 10, marginBottom: 6,
                        fontSize: 10, fontWeight: 700,
                        background: categoryColor[rel.category]?.bg ?? '#F1F5F9',
                        color: categoryColor[rel.category]?.text ?? '#475569',
                      }}>
                        {rel.category}
                      </span>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', lineHeight: 1.35, margin: 0, fontFamily: 'var(--font-heading)' }}>
                        {rel.title.slice(0, 70)}{rel.title.length > 70 ? '...' : ''}
                      </p>
                      <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, display: 'block' }}>{rel.readTime} · {rel.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mini CTA */}
          <div style={{ background: 'linear-gradient(135deg,#183765 0%,#2396C6 100%)', borderRadius: 18, padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 8px', fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>See Logezy in action</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', margin: '0 0 16px', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>Free demo, no credit card needed.</p>
              <a href="https://booking.logezy.co/#/67044000000025008" target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, background: '#fff', color: '#183963', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
                Book Demo <ArrowRight weight="regular" style={{ width: 13, height: 13 }} />
              </a>
            </div>
          </div>

        </motion.aside>
      </div>
    </div>
  );
}
