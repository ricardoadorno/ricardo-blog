# Tipografia Editorial para Conteúdo Longform

Este documento define a escala tipográfica e estilos de conteúdo específicos para artigos de blog, com foco em legibilidade e experiência de leitura confortável.

## Princípios de Tipografia Editorial

1. **Legibilidade acima de tudo** - Texto deve ser fácil de ler por longos períodos
2. **Hierarquia clara** - Headings devem criar estrutura visual óbvia
3. **Ritmo vertical** - Espaçamento consistente entre elementos
4. **Largura de linha otimizada** - 65-75 caracteres por linha (measure)
5. **Contraste adequado** - WCAG AA mínimo (AAA preferencial)

## Referências

- [Practical Typography by Matthew Butterick](https://practicaltypography.com/)
- [The Elements of Typographic Style Applied to the Web](http://webtypography.net/)
- [Material Design Typography](https://m3.material.io/styles/typography)
- [Medium's Typography](https://medium.design/typography-is-impossible-5872b0c7f891)

---

## Escala Tipográfica (Major Third - 1.250)

### Tamanhos de Fonte

| Nível | Token | Tamanho (min) | Tamanho (max) | Uso |
|-------|-------|---------------|---------------|-----|
| **Display** | `text-6xl` | 57px | 86px | Hero titles (não em artigos) |
| **H1** | `text-5xl` | 48px | 69px | Título do post (página individual) |
| **H2** | `text-4xl` | 40px | 55px | Seções principais do artigo |
| **H3** | `text-3xl` | 33px | 44px | Subseções |
| **H4** | `text-2xl` | 28px | 35px | Sub-subseções |
| **H5** | `text-xl` | 23px | 28px | Raramente usado |
| **H6** | `text-lg` | 19px | 23px | Raramente usado |
| **Body (Lead)** | `text-lg` | 19px | 23px | Primeiro parágrafo, destaque |
| **Body** | `text-base` | 16px | 18px | Corpo principal do texto |
| **Small** | `text-sm` | 13px | 15px | Captions, notas de rodapé |
| **Tiny** | `text-xs` | 11px | 12px | Metadados minúsculos |

### CSS Variables (já definidas no globals.css)

```css
:root {
  /* Fluid type scale usando clamp */
  --text-base: clamp(1rem, 0.93rem + 0.36vw, 1.13rem);       /* 16-18px */
  --text-lg: clamp(1.2rem, 1.11rem + 0.47vw, 1.41rem);       /* 19-23px */
  --text-xl: clamp(1.44rem, 1.32rem + 0.59vw, 1.76rem);      /* 23-28px */
  --text-2xl: clamp(1.73rem, 1.58rem + 0.73vw, 2.2rem);      /* 28-35px */
  --text-3xl: clamp(2.07rem, 1.89rem + 0.91vw, 2.75rem);     /* 33-44px */
  --text-4xl: clamp(2.49rem, 2.26rem + 1.12vw, 3.43rem);     /* 40-55px */
  --text-5xl: clamp(2.99rem, 2.71rem + 1.39vw, 4.3rem);      /* 48-69px */
}
```

---

## Line Heights (Leading)

### Regras

- **Títulos**: 1.25 (tight) - títulos precisam de menos espaço entre linhas
- **Corpo**: 1.625 (relaxed) - corpo precisa de mais espaço para conforto
- **Listas**: 1.625 (relaxed) - mesmo que corpo
- **Captions**: 1.5 (normal) - intermediário

### Aplicação

```css
/* globals.css - já implementado */
h1, h2, h3, h4, h5, h6 {
  line-height: var(--leading-tight); /* 1.25 */
}

p, li {
  line-height: var(--leading-relaxed); /* 1.625 */
}

small, figcaption {
  line-height: var(--leading-normal); /* 1.5 */
}
```

---

## Measure (Largura de Linha)

### Regras de Ouro

- **Artigos**: máximo 70ch (characters)
- **Ideal**: 65ch
- **Mínimo**: 45ch

### Implementação

```tsx
// Page de post individual
<main className="container mx-auto px-4 py-8">
  <div className="max-w-3xl mx-auto"> {/* 768px = ~65ch em 18px */}
    <article className="prose lg:prose-xl max-w-none">
      {content}
    </article>
  </div>
</main>
```

### Por que 65-75 caracteres?

- **Menos de 45ch**: Muito estreito, olho cansa ao pular linhas frequentemente
- **65-75ch**: Zona de conforto ideal para leitura
- **Mais de 85ch**: Muito largo, difícil encontrar início da próxima linha

---

## Spacing (Espaçamento Vertical)

### Entre Elementos de Artigo

| De → Para | Espaçamento | Classe | Razão |
|-----------|-------------|--------|-------|
| Título H1 → Meta | 8px | `mb-2` | Muito próximos, mesmo grupo visual |
| Meta → Cover Image | 16px | `mb-4` | Separação leve |
| Cover Image → Conteúdo | 32px | `mb-8` | Separação clara antes do conteúdo |
| H2 → H2 (próximo) | 48px top | `mt-12` | Seções principais precisam espaço |
| H2 → Parágrafo (abaixo) | 16px | `mb-4` | Heading e conteúdo relacionado |
| Parágrafo → Parágrafo | 16px | `mb-4` | Ritmo de leitura |
| Parágrafo → Lista | 16px | `mb-4` | Transição suave |
| Lista → Parágrafo | 24px | `mt-6` | Retorno ao texto principal |
| Blockquote → Parágrafo | 24px | `my-6` | Destaque visual |
| Code Block → Parágrafo | 24px | `my-6` | Elemento especial |
| Imagem → Caption | 8px | `mt-2` | Muito próximos |
| Caption → Parágrafo | 24px | `mb-6` | Retorno ao fluxo |

### CSS Implementation (MDX Content)

```css
/* globals.css */
.mdx-content h1 {
  font-size: var(--text-4xl);        /* 40-55px */
  font-weight: var(--font-bold);     /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  margin-top: var(--space-3xl);      /* 64px */
  margin-bottom: var(--space-lg);    /* 24px */
  scroll-margin-top: 5rem;           /* Para anchor links */
}

.mdx-content h2 {
  font-size: var(--text-3xl);        /* 33-44px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  margin-top: var(--space-3xl);      /* 64px - seção nova */
  margin-bottom: var(--space-lg);    /* 24px */
  scroll-margin-top: 5rem;
}

.mdx-content h3 {
  font-size: var(--text-2xl);        /* 28-35px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  margin-top: var(--space-2xl);      /* 48px */
  margin-bottom: var(--space-md);    /* 16px */
  scroll-margin-top: 5rem;
}

.mdx-content h4 {
  font-size: var(--text-xl);         /* 23-28px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-snug);  /* 1.375 */
  margin-top: var(--space-xl);       /* 32px */
  margin-bottom: var(--space-sm);    /* 12px */
}

.mdx-content p {
  font-size: var(--text-base);       /* 16-18px */
  line-height: var(--leading-relaxed); /* 1.625 */
  margin-bottom: var(--space-lg);    /* 24px */
  max-width: var(--measure);         /* 65ch */
  text-wrap: pretty;                 /* Evita linhas órfãs */
}

.mdx-content ul,
.mdx-content ol {
  margin-bottom: var(--space-lg);    /* 24px */
  padding-left: var(--space-lg);     /* 24px */
  max-width: var(--measure);
}

.mdx-content li {
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-xs);    /* 8px */
}

.mdx-content blockquote {
  margin: var(--space-xl) 0;         /* 32px top/bottom */
  padding-left: var(--space-lg);     /* 24px */
  border-left: 4px solid rgb(var(--primary));
  font-style: italic;
  color: rgb(var(--muted-foreground));
  max-width: var(--measure);
}

.mdx-content pre {
  margin: var(--space-xl) 0;         /* 32px */
  border-radius: var(--radius-lg);
}

.mdx-content img,
.mdx-content figure {
  margin: var(--space-xl) 0;         /* 32px */
}

.mdx-content figcaption {
  margin-top: var(--space-xs);       /* 8px */
  font-size: var(--text-sm);
  color: rgb(var(--muted-foreground));
  text-align: center;
}

.mdx-content hr {
  margin: var(--space-3xl) 0;        /* 64px */
  border: none;
  border-top: 1px solid rgb(var(--border));
}
```

---

## Estilos Específicos de Conteúdo

### 1. Lead Paragraph (Primeiro Parágrafo)

Primeiro parágrafo deve ser maior para introduzir o artigo.

```css
.mdx-content > p:first-of-type {
  font-size: var(--text-lg);         /* 19-23px */
  line-height: var(--leading-relaxed);
  color: rgb(var(--foreground));
  margin-bottom: var(--space-xl);    /* 32px - mais espaço */
}
```

Ou via componente MDX:

```tsx
// Componente Lead opcional
export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-relaxed mb-8 text-foreground">
      {children}
    </p>
  );
}
```

### 2. Drop Cap (Letra Capitular)

Opcional, para artigos muito longos ou especiais.

```css
.mdx-content .drop-cap::first-letter {
  float: left;
  font-size: 4em;
  line-height: 0.85;
  margin: 0.1em 0.1em 0 0;
  font-weight: 700;
  color: rgb(var(--primary));
}
```

### 3. Pull Quote (Citação Destacada)

Para destacar frases importantes do artigo.

```tsx
// src/components/mdx/PullQuote.tsx
export function PullQuote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <aside className="my-12 py-8 px-6 border-y border-border">
      <blockquote className="text-2xl font-semibold leading-tight text-center italic text-foreground mb-4">
        "{children}"
      </blockquote>
      {author && (
        <p className="text-sm text-center text-muted-foreground">
          — {author}
        </p>
      )}
    </aside>
  );
}
```

### 4. Aside/Sidenote (Nota Lateral)

Para informações complementares.

```tsx
// src/components/mdx/Aside.tsx
export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-6 p-4 rounded-lg bg-muted/30 border-l-4 border-muted-foreground/50 text-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
        Nota
      </p>
      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
```

### 5. Code Blocks

#### Inline Code

```css
.mdx-content :not(pre) > code {
  font-size: 0.9em;                  /* 90% do texto ao redor */
  padding: 0.125rem 0.375rem;        /* 2px 6px */
  border-radius: var(--radius-sm);
  background: rgb(var(--muted));
  color: rgb(var(--foreground));
  font-family: var(--font-mono);
  font-feature-settings: normal;     /* Desliga ligatures */
}
```

#### Block Code

```css
.mdx-content pre {
  overflow-x: auto;
  padding: var(--space-lg);          /* 24px */
  border-radius: var(--radius-lg);
  background-color: #1e1e1e;         /* VS Code Dark+ */
  margin: var(--space-xl) 0;
}

.dark .mdx-content pre {
  background-color: #0d1117;         /* GitHub Dark */
}

.mdx-content pre code {
  font-size: var(--text-sm);         /* 13-15px */
  line-height: var(--leading-relaxed);
  font-family: var(--font-mono);
  color: #d4d4d4;                    /* VS Code foreground */
}
```

### 6. Tables

```css
.mdx-content table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-xl) 0;
  font-size: var(--text-sm);
}

.mdx-content th {
  background: rgb(var(--muted));
  padding: var(--space-sm) var(--space-md); /* 12px 16px */
  text-align: left;
  font-weight: var(--font-semibold);
  border: 1px solid rgb(var(--border));
}

.mdx-content td {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid rgb(var(--border));
}

.mdx-content tr:hover {
  background: rgb(var(--muted) / 0.3);
}
```

### 7. Lists (Listas)

#### Unordered (bullet points)

```css
.mdx-content ul {
  list-style-type: disc;
  padding-left: var(--space-lg);     /* 24px */
}

.mdx-content ul li {
  margin-bottom: var(--space-xs);    /* 8px */
  line-height: var(--leading-relaxed);
}

/* Nested lists */
.mdx-content ul ul {
  margin-top: var(--space-xs);
  list-style-type: circle;
}
```

#### Ordered (numeradas)

```css
.mdx-content ol {
  list-style-type: decimal;
  padding-left: var(--space-lg);
}

.mdx-content ol li {
  margin-bottom: var(--space-xs);
  line-height: var(--leading-relaxed);
}
```

### 8. Links dentro do Texto

```css
.mdx-content a {
  color: rgb(var(--primary));
  text-decoration-color: rgb(var(--primary) / 0.3);
  text-decoration-thickness: 0.0625rem;    /* 1px */
  text-underline-offset: 0.125rem;         /* 2px */
  transition: all 0.2s ease;
}

.mdx-content a:hover {
  color: rgb(var(--accent));
  text-decoration-color: rgb(var(--accent));
  text-decoration-thickness: 0.125rem;     /* 2px mais grosso */
}

.mdx-content a:focus-visible {
  outline: 2px solid rgb(var(--ring));
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

---

## Tipografia Responsiva

### Desktop (lg: 1024px+)

- Usar `prose-xl` do Tailwind Typography
- Font-size: 18px base
- Line-height: 1.75 (extra comfortable)
- Measure: 65ch

```tsx
<article className="prose lg:prose-xl max-w-none">
```

### Tablet (md: 768px - 1023px)

- Usar `prose` padrão
- Font-size: 16px base
- Line-height: 1.625
- Measure: 65ch

### Mobile (<768px)

- Usar `prose` com ajustes
- Font-size: 16px base (não menor!)
- Line-height: 1.625
- Padding lateral: 16px (`px-4`)

**IMPORTANTE**: Nunca diminuir font-size abaixo de 16px em mobile para evitar zoom automático do iOS.

---

## Exemplo Completo de Artigo

```tsx
// src/app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Container com max-width otimizado para leitura */}
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6" />

        {/* Article com prose classes */}
        <article className="prose lg:prose-xl max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:text-balance">

          {/* Header - not-prose para controle total */}
          <header className="mb-8 not-prose">
            {/* Título - Nível 1 hierarquia */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance leading-tight">
              {postData.title}
            </h1>

            {/* Meta - Nível 9 hierarquia */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <time dateTime={postData.date}>
                {formatDate(postData.date)}
              </time>
              <span>•</span>
              <span>{postData.author}</span>
              <span>•</span>
              <ReadingTime minutes={readingTime} />
            </div>

            {/* Cover image */}
            {postData.coverImage && (
              <OptimizedImage
                src={postData.coverImage}
                alt={postData.title}
                className="rounded-lg mb-6"
                priority
              />
            )}
          </header>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <TableOfContents headings={headings} />
          )}

          {/* MDX Content - estilos aplicados via .mdx-content */}
          <div className="mdx-content">
            {postData.content}
          </div>

          {/* Tags */}
          {postData.tags && (
            <footer className="mt-8 pt-4 border-t not-prose">
              <div className="flex flex-wrap gap-2">
                {postData.tags.map((tag) => (
                  <MyLink
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary/10 transition-colors"
                  >
                    #{tag}
                  </MyLink>
                ))}
              </div>
            </footer>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
```

---

## Checklist de Tipografia Editorial

Ao revisar um artigo, verifique:

- [ ] Título usa `text-3xl md:text-4xl` (heading-section)
- [ ] Corpo usa `text-base` (16-18px)
- [ ] Line-height é `1.625` para parágrafos
- [ ] Largura de linha está entre 65-75 caracteres
- [ ] Headings H2 têm `mt-12` (espaço generoso)
- [ ] Contraste de cores atinge WCAG AA
- [ ] Links têm underline visível
- [ ] Code blocks têm syntax highlighting
- [ ] Imagens têm captions quando relevante
- [ ] Mobile não força zoom (font-size ≥ 16px)

---

## Próximos Passos

1. **Aplicar estilos** ao `.mdx-content` no globals.css
2. **Testar legibilidade** em diferentes devices
3. **Validar acessibilidade** (contraste, heading structure)
4. **Criar componentes MDX** (Lead, PullQuote, Aside)
5. **Otimizar performance** (font loading, CLS)

---

## Referências e Ferramentas

**Testadores de Legibilidade:**
- [Hemingway Editor](https://hemingwayapp.com/) - Complexidade de texto
- [Readable](https://readable.com/) - Scores de legibilidade

**Testadores de Tipografia:**
- [Type Scale](https://typescale.com/) - Visualizar escalas
- [Modular Scale](https://www.modularscale.com/) - Calcular escalas

**Testadores de Measure:**
- [Characters Per Line Calculator](https://www.sessions.edu/notes-on-design/what-is-the-ideal-length-of-a-line-of-text-for-easy-reading/)

**Inspiração:**
- [Medium](https://medium.com/)
- [Substack](https://substack.com/)
- [Ghost](https://ghost.org/docs/)
