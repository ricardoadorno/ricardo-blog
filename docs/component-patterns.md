# Guia de Padrões de Componentes do Blog

Este documento define padrões de componentes específicos para o blog, baseados nos princípios de hierarquia visual, layout, cores e microinterações já estabelecidos.

## Índice

1. [Card de Post (Regular)](#1-card-de-post-regular)
2. [Card de Post (Destaque/Featured)](#2-card-de-post-destaquefeatured)
3. [Lista Compacta de Posts](#3-lista-compacta-de-posts)
4. [Banner de Newsletter](#4-banner-de-newsletter)
5. [Callout (dentro do artigo)](#5-callout-dentro-do-artigo)
6. [Code Block com Copy Button](#6-code-block-com-copy-button)
7. [Table of Contents](#7-table-of-contents)
8. [Search Bar](#8-search-bar)
9. [Tag Cloud](#9-tag-cloud)
10. [Breadcrumbs](#10-breadcrumbs)

---

## 1. Card de Post (Regular)

### Quando usar
- Grid de posts na página `/blog`
- Posts relacionados no final de artigos
- Qualquer listagem de posts em grid

### Quando evitar
- Para o primeiro post em destaque (use Featured Card)
- Em sidebars estreitas (use Lista Compacta)

### Estrutura

```tsx
// src/components/blog/BlogCard.tsx
import { PostMeta } from '@/lib/mdx';
import { MyLink } from '@/components/ui/MyLink';
import { OptimizedImage } from './OptimizedImage';
import { Calendar, User, ArrowRight } from 'lucide-react';

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden bg-muted/30">
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {post.category && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-lg">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title - Nível 5: heading-card */}
          <h3 className="text-xl font-bold leading-tight">
            <MyLink
              href={`/blog/${post.slug}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {post.title}
            </MyLink>
          </h3>

          {/* Meta - Nível 9: meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date} className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
          </div>

          {/* Excerpt - Nível 8: body-sm */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <MyLink
                  key={tag}
                  href={`/tag/${tag}`}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                >
                  #{tag}
                </MyLink>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="pt-2">
            <MyLink
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all group/link"
            >
              <span>Read article</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </MyLink>
          </div>
        </div>
      </div>
    </article>
  );
}
```

### Variantes

#### Denso (Compact)
- Reduzir `p-6` para `p-4`
- Reduzir `space-y-4` para `space-y-3`
- Ocultar tags

#### Sem Imagem
- Remover bloco de imagem
- Adicionar background gradient sutil ao card

---

## 2. Card de Post (Destaque/Featured)

### Quando usar
- Primeiro post na home
- Primeiro post na página `/blog`
- Hero de categoria

### Quando evitar
- Em grids pequenos
- Em mobile (degradar para card regular)

### Estrutura

```tsx
export function BlogCardFeatured({ post }: { post: PostMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm md:flex md:gap-6 hover:border-primary/30 hover:shadow-xl transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image - 50% em desktop */}
      {post.coverImage && (
        <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden bg-muted/30">
          <OptimizedImage
            src={post.coverImage}
            alt={post.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content - 50% em desktop */}
      <div className="relative p-6 md:w-1/2 md:flex md:flex-col md:justify-center space-y-4">
        {/* Badge "Featured" */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          FEATURED POST
        </div>

        {/* Title - Nível 4: heading-card-lg */}
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          <MyLink
            href={`/blog/${post.slug}`}
            className="text-foreground hover:text-primary transition-colors"
          >
            {post.title}
          </MyLink>
        </h2>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time>{new Date(post.date).toLocaleDateString()}</time>
          {post.author && <span>• {post.author}</span>}
        </div>

        {/* Excerpt - mais generoso */}
        <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <MyLink
                key={tag}
                href={`/tag/${tag}`}
                className="px-2.5 py-1 text-xs rounded-md bg-muted/50 hover:bg-primary/10 transition-colors"
              >
                #{tag}
              </MyLink>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-2">
          <MyLink
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 hover:gap-3 transition-all"
          >
            Read full article
            <ArrowRight className="w-4 h-4" />
          </MyLink>
        </div>
      </div>
    </article>
  );
}
```

---

## 3. Lista Compacta de Posts

### Quando usar
- Sidebars
- "Recent posts" widget
- Footer
- Posts relacionados em formato compacto

### Estrutura

```tsx
export function PostListCompact({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.slug} className="group">
          <MyLink
            href={`/blog/${post.slug}`}
            className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {/* Thumbnail pequeno (opcional) */}
            {post.coverImage && (
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                <OptimizedImage
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <time className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
          </MyLink>
        </li>
      ))}
    </ul>
  );
}
```

### Variantes

#### Minimal (sem imagem)
- Remover thumbnail
- Aumentar text-sm para text-base no título

#### Com Categoria
- Adicionar badge de categoria antes do título

---

## 4. Banner de Newsletter

### Quando usar
- Final de artigos
- Sidebar da página de blog
- Modal após 30s de leitura (opcional)

### Quando evitar
- Em posts curtos (< 2 min read)
- Mais de uma vez por página

### Estrutura

```tsx
// src/components/blog/NewsletterBanner.tsx
'use client';

import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulação de submissão
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 via-accent/5 to-background p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Stay Updated
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Get the latest posts delivered right to your inbox. No spam, unsubscribe anytime.
        </p>

        {/* Form */}
        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 text-success">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <p className="font-medium">Thanks for subscribing!</p>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
```

---

## 5. Callout (dentro do artigo)

### Quando usar
- Destacar informações importantes
- Avisos, dicas, erros
- Notas laterais (sidenotes)

### Tipos
- **Info** (azul): Informação adicional
- **Warning** (amarelo): Avisos, cuidados
- **Error** (vermelho): Erros, problemas
- **Success** (verde): Confirmações, sucesso

### Estrutura

```tsx
// src/components/mdx/Callout.tsx
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'error' | 'success';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    container: 'bg-info/10 border-info/30 text-info',
    icon: Info,
  },
  warning: {
    container: 'bg-warning/10 border-warning/30 text-warning',
    icon: AlertTriangle,
  },
  error: {
    container: 'bg-destructive/10 border-destructive/30 text-destructive',
    icon: XCircle,
  },
  success: {
    container: 'bg-success/10 border-success/30 text-success',
    icon: CheckCircle,
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`my-6 p-4 rounded-lg border-l-4 ${style.container}`}>
      <div className="flex gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-bold mb-2 text-foreground">{title}</h4>
          )}
          <div className="text-sm leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Uso no MDX

```mdx
<Callout type="info" title="Did you know?">
This is an informational callout with additional context.
</Callout>

<Callout type="warning">
Be careful when using this approach in production!
</Callout>
```

---

## 6. Code Block com Copy Button

### Quando usar
- Qualquer bloco de código no artigo
- Automaticamente aplicado via rehype-pretty-code

### Estrutura

```tsx
// src/components/mdx/Pre.tsx
'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface PreProps {
  children: React.ReactNode;
  raw?: string;
}

export function Pre({ children, raw, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!raw) return;

    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="overflow-x-auto p-4 rounded-lg bg-muted/30 border border-border" {...props}>
        {children}
      </pre>

      {raw && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}
```

---

## 7. Table of Contents

### Quando usar
- Posts longos (> 5 min read)
- Posts com 3+ headings
- Posts técnicos/tutoriais

### Quando evitar
- Posts curtos
- Posts narrativos sem seções claras

### Estrutura

```tsx
// src/components/blog/TableOfContents.tsx
'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="not-prose mb-8 p-6 rounded-xl bg-muted/30 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-lg font-bold">Table of Contents</h2>
      </div>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 text-sm transition-colors ${
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 8. Search Bar

### Quando usar
- Página de blog index
- Archives page

### Estrutura

```tsx
// src/components/blog/Search.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { PostMeta } from '@/lib/mdx';
import { BlogCard } from './BlogCard';
import { useDebounce } from '@/hooks/use-debounce';

export function Search({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery) return posts;

    const lowerQuery = debouncedQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt?.toLowerCase().includes(lowerQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [posts, debouncedQuery]);

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Results */}
      {debouncedQuery && (
        <p className="text-sm text-muted-foreground mb-6">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        </p>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```

---

## 9. Tag Cloud

### Quando usar
- Sidebar da página de blog
- Footer
- Página de tags

### Estrutura

```tsx
// src/components/blog/TagCloud.tsx
import { MyLink } from '@/components/ui/MyLink';

interface TagCloudProps {
  tags: { tag: string; count: number }[];
  className?: string;
}

export function TagCloud({ tags, className }: TagCloudProps) {
  // Calcular tamanho baseado na contagem
  const maxCount = Math.max(...tags.map((t) => t.count));

  const getSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return 'text-base font-bold';
    if (ratio > 0.4) return 'text-sm font-semibold';
    return 'text-xs font-medium';
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <MyLink
            key={tag}
            href={`/tag/${tag}`}
            className={`px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all ${getSize(count)}`}
          >
            #{tag}
            <span className="ml-1 text-xs opacity-60">({count})</span>
          </MyLink>
        ))}
      </div>
    </div>
  );
}
```

---

## 10. Breadcrumbs

### Quando usar
- Página de post individual
- Páginas de categoria/tag
- Qualquer página com hierarquia

### Estrutura

```tsx
// src/components/blog/Breadcrumbs.tsx
import { MyLink } from '@/components/ui/MyLink';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items?: BreadcrumbItem[] }) {
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  const allItems = items ? [...defaultItems, ...items] : defaultItems;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {allItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {index === allItems.length - 1 ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <MyLink
                href={item.href}
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                {index === 0 && <Home className="w-4 h-4" />}
                {item.label}
              </MyLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

## Matriz de Decisão: Qual Componente Usar?

| Contexto | Componente Recomendado | Alternativa |
|----------|------------------------|-------------|
| Grid principal de posts | BlogCard (regular) | BlogCardFeatured para o primeiro |
| Primeiro post em destaque | BlogCardFeatured | - |
| Sidebar "recent posts" | PostListCompact | - |
| Final de artigo (engajamento) | NewsletterBanner | - |
| Informação importante no artigo | Callout (tipo apropriado) | Blockquote |
| Código no artigo | Pre (com copy button) | - |
| Artigo longo | TableOfContents | - |
| Busca de posts | Search | - |
| Explorar por tags | TagCloud | Lista simples de links |
| Navegação de página | Breadcrumbs | - |

---

## Checklist de Qualidade para Componentes

Ao criar ou revisar um componente, verifique:

- [ ] Usa tokens de hierarquia definidos no guideline?
- [ ] Espaçamentos são múltiplos de 4px?
- [ ] Cores têm contraste AA ou AAA?
- [ ] Microinterações são sutis e funcionais?
- [ ] Responsivo em mobile, tablet e desktop?
- [ ] Acessível (ARIA labels, keyboard navigation)?
- [ ] Performance otimizada (lazy load, memoization)?
- [ ] Documentado com comentários inline?

---

## Próximos Passos

1. **Implementar esses padrões** nos componentes atuais
2. **Testar em diferentes tamanhos de tela**
3. **Validar acessibilidade** com ferramentas automatizadas
4. **Documentar variantes** específicas de cada projeto
5. **Criar Storybook** (opcional) para demonstração visual

---

## Referências

- [Design System Checklist](https://www.designsystemchecklist.com/)
- [Component Gallery](https://component.gallery/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
