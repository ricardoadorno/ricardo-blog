# Sistema de Layout, Grid e Ritmo Vertical

## 1. Sistema de Grid e Colunas

### Breakpoints do Tailwind (padrão)

| Nome | Min Width | Uso Típico |
|------|-----------|-----------|
| `sm` | 640px | Tablets portrait |
| `md` | 768px | Tablets landscape |
| `lg` | 1024px | Desktop pequeno |
| `xl` | 1280px | Desktop médio |
| `2xl` | 1536px | Desktop grande |

### Containers e Max-Width

| Contexto | Max Width | Classe Tailwind | Quando Usar |
|----------|-----------|-----------------|-------------|
| **Conteúdo de artigo** | 768px (48rem) | `max-w-3xl` | Body de post individual, leitura longform |
| **Layout principal** | 1152px (72rem) | `max-w-6xl` | Home, blog index, seções principais |
| **Layout wide** | 1280px (80rem) | `max-w-7xl` | Galerias, dashboards (uso futuro) |
| **Layout full-bleed** | 100% | `max-w-full` | Hero sections com backgrounds especiais |

**Regra de ouro**:
- **Artigos e leitura**: `max-w-3xl` (melhor para linhas de 65-75 caracteres)
- **Listagens e grids**: `max-w-6xl` (permite 3 colunas confortáveis)

---

## 2. Grid para Listagem de Posts

### Desktop (lg: 1024px+)

```tsx
// 3 colunas para posts regulares
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map(post => <BlogCard post={post} />)}
</div>
```

**Especificação:**
- **Colunas**: 3
- **Gap**: 24px (`gap-6`)
- **Largura de container**: `max-w-6xl` (1152px)
- **Largura de cada card**: ~360px

### Tablet (md: 768px - 1023px)

```tsx
// 2 colunas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Especificação:**
- **Colunas**: 2
- **Gap**: 24px (`gap-6`)
- **Largura de cada card**: ~340-380px

### Mobile (<768px)

```tsx
// 1 coluna
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Especificação:**
- **Colunas**: 1
- **Gap**: 24px (`gap-6`)
- **Padding lateral**: 16px (`px-4`)
- **Largura de card**: 100% - 32px (padding)

---

## 3. Grid para Post Featured

### Featured Post (Hero)

O primeiro post em destaque deve ocupar toda a largura disponível ou ter um layout horizontal diferenciado.

```tsx
// Layout horizontal (imagem + conteúdo lado a lado)
<article className="md:flex md:gap-6">
  <div className="md:w-1/2">
    {/* Imagem */}
  </div>
  <div className="md:w-1/2">
    {/* Conteúdo */}
  </div>
</article>
```

**Especificação Desktop (md+):**
- **Layout**: 2 colunas (50/50)
- **Gap**: 24px (`gap-6`)
- **Imagem**: aspect-ratio livre ou 16:10
- **Conteúdo**: alinhado verticalmente ao centro

**Especificação Mobile:**
- **Layout**: 1 coluna (stack vertical)
- **Imagem**: aspect-video (16:9)

---

## 4. Largura de Conteúdo de Artigo

### Página de Post Individual

```tsx
<main className="container mx-auto px-4 py-8">
  <div className="max-w-3xl mx-auto">
    <article className="prose lg:prose-xl">
      {/* Conteúdo do artigo */}
    </article>
  </div>
</main>
```

**Especificação:**
- **Container**: `max-w-3xl` (768px)
- **Padding lateral**: 16px (`px-4`)
- **Padding vertical**: 32px (`py-8`)
- **Largura efetiva de linha**: ~65-75 caracteres
- **Prose scale**: `prose-xl` em lg+ para melhor legibilidade

**Exceções (full-width dentro do artigo):**
- Imagens grandes podem usar `max-w-4xl` ou `max-w-5xl` com classes especiais
- Tabelas e code blocks podem ter scroll horizontal se necessário

---

## 5. Ritmo Vertical (Vertical Rhythm)

### Unidade Base: 4px

Todos os espaçamentos devem ser múltiplos de 4px para criar ritmo visual consistente.

| Token | Valor (rem) | Valor (px) | Uso |
|-------|-------------|-----------|-----|
| `space-xs` | 0.5rem | 8px | Espaço mínimo entre elementos pequenos |
| `space-sm` | 0.75rem | 12px | Entre label e input, ícone e texto |
| `space-md` | 1rem | 16px | Entre parágrafos, base padrão |
| `space-lg` | 1.5rem | 24px | Entre seções pequenas, cards |
| `space-xl` | 2rem | 32px | Entre seções médias |
| `space-2xl` | 3rem | 48px | Entre seções grandes |
| `space-3xl` | 4rem | 64px | Entre blocos principais de página |
| `space-4xl` | 6rem | 96px | Entre seções hero e conteúdo |

### Aplicação no Blog

#### Espaçamento entre Cards

```tsx
// Grid de posts - gap entre cards
<div className="grid grid-cols-3 gap-6"> {/* 24px */}
```

**Regra**: Use `gap-6` (24px) como padrão para grids de cards.

#### Espaçamento entre Seções de Página

```tsx
// Hero section
<section className="py-20"> {/* 80px top/bottom */}

// Content section
<section className="py-12"> {/* 48px top/bottom */}
```

**Regras:**
- **Hero sections**: `py-20` (80px) ou `py-16` (64px)
- **Content sections**: `py-12` (48px)
- **Small sections**: `py-8` (32px)

#### Espaçamento dentro de Cards

```tsx
<div className="p-6 space-y-4">
  <h3>Title</h3>      {/* space-y-4 = 16px abaixo */}
  <p>Meta</p>         {/* space-y-4 = 16px abaixo */}
  <p>Excerpt</p>      {/* space-y-4 = 16px abaixo */}
  <a>Read more</a>
</div>
```

**Regras:**
- **Padding do card**: `p-6` (24px)
- **Espaçamento entre elementos**: `space-y-4` (16px)
- **Para cards menores**: `p-4` + `space-y-3`

#### Espaçamento em Artigos

```tsx
// Header do artigo
<header className="mb-8"> {/* 32px */}
  <h1 className="mb-2">Title</h1> {/* 8px */}
  <div className="mb-4">Meta</div> {/* 16px */}
</header>

// Parágrafos (via prose plugin)
<p className="mb-4">...</p> {/* 16px */}

// Headings
<h2 className="mt-12 mb-4">...</h2> {/* 48px top, 16px bottom */}
<h3 className="mt-8 mb-3">...</h3>  {/* 32px top, 12px bottom */}
```

**Regras:**
- **H1 (título do post)**: `mb-2` (pequeno, pois vem logo antes dos metadados)
- **H2 dentro do conteúdo**: `mt-12 mb-4` (48px top para separar bem das seções anteriores)
- **H3 dentro do conteúdo**: `mt-8 mb-3` (32px top)
- **Parágrafos**: `mb-4` (16px)

---

## 6. Revisão de Valores "Estranhos"

### Valores a Evitar

❌ **NÃO use:**
- `mb-1` (4px - muito pequeno)
- `gap-5` (20px - não é múltiplo visualmente claro)
- `py-7` (28px - estranho)
- `px-5` (20px - prefira 16px ou 24px)

✅ **USE:**
- `mb-2` (8px)
- `gap-4` ou `gap-6` (16px ou 24px)
- `py-6` ou `py-8` (24px ou 32px)
- `px-4` ou `px-6` (16px ou 24px)

### Substituições Recomendadas

| Antigo | Novo | Razão |
|--------|------|-------|
| `gap-5` | `gap-6` | Múltiplo de 4 mais claro (24px vs 20px) |
| `py-7` | `py-8` | Múltiplo de 4 (32px vs 28px) |
| `mb-14` | `mb-12` ou `mb-16` | Valores mais previsíveis (48px ou 64px) |
| `px-5` | `px-4` ou `px-6` | Consistência (16px ou 24px) |

---

## 7. Layout Spec por Tipo de Página

### Home (/)

```tsx
<div className="relative">
  {/* Background */}
  <div className="fixed inset-0 -z-10 mesh-gradient"></div>

  {/* Hero Section */}
  <section className="min-h-[80vh] flex items-center">
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Hero content */}
      </div>
    </div>
  </section>

  {/* Featured Posts */}
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12"> {/* 48px */}
          <h2>Featured Posts</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cards */}
        </div>
      </div>
    </div>
  </section>
</div>
```

**Spec:**
- **Container**: `max-w-6xl` (1152px)
- **Padding lateral**: `px-4` (16px)
- **Padding vertical de seção**: `py-20` (80px)
- **Gap entre header e grid**: `mb-12` (48px)
- **Gap entre cards**: `gap-8` (32px) - mais generoso na home

**Breakpoints:**
- **Mobile**: 1 coluna
- **Tablet (md)**: 2 colunas
- **Desktop (lg+)**: 3 colunas

---

### Blog Index (/blog)

```tsx
<main className="container mx-auto px-4 py-8">
  <div className="max-w-6xl mx-auto">
    <header className="mb-12">
      <h1>Blog</h1>
      <p>Description</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <TagCloud />
      </aside>

      {/* Main content */}
      <div className="lg:col-span-3">
        <Search />
        <section className="mt-8">
          <BlogGrid />
        </section>
      </div>
    </div>
  </div>
</main>
```

**Spec:**
- **Container**: `max-w-6xl` (1152px)
- **Layout**: 4 colunas (1 sidebar + 3 content)
- **Gap entre sidebar e content**: `gap-10` (40px)
- **Padding da página**: `py-8` (32px)

**Breakpoints:**
- **Mobile/Tablet (<lg)**: Stack vertical (sidebar acima do content)
- **Desktop (lg+)**: Sidebar lateral (1/4 + 3/4)

---

### Post Individual (/blog/[slug])

```tsx
<main className="container mx-auto px-4 py-8">
  <div className="max-w-3xl mx-auto">
    <Breadcrumbs className="mb-6" />

    <article className="prose lg:prose-xl max-w-none">
      <header className="mb-8">
        <h1>Post Title</h1>
        <div className="flex gap-3">Meta</div>
        <OptimizedImage />
      </header>

      <TableOfContents />

      <div className="mdx-content">
        {content}
      </div>

      <footer className="mt-8">
        <Tags />
      </footer>
    </article>

    {/* Related Posts */}
    <div className="mt-12 pt-8 border-t">
      <h2 className="mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cards menores */}
      </div>
    </div>
  </div>
</main>
```

**Spec:**
- **Container**: `max-w-3xl` (768px)
- **Padding da página**: `py-8` (32px)
- **Gap breadcrumbs → header**: `mb-6` (24px)
- **Gap header → content**: `mb-8` (32px)
- **Gap content → footer**: `mt-8` (32px)
- **Gap footer → related**: `mt-12` + `pt-8` (48px + 32px)
- **Gap entre related posts**: `gap-6` (24px)

**Breakpoints (Related Posts):**
- **Mobile**: 1 coluna
- **Tablet/Desktop (md+)**: 3 colunas

---

## 8. Template de Código com Layout Especificado

### Template: Lista de Posts

```tsx
// src/app/blog/page.tsx (exemplo completo)
export default function BlogIndexPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Container principal: max-w-6xl */}
      <div className="max-w-6xl mx-auto">

        {/* Header da página */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore articles about web development
          </p>
        </header>

        {/* Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar - 1 coluna */}
          <aside className="lg:col-span-1">
            <TagCloud className="mb-8" />
          </aside>

          {/* Content - 3 colunas */}
          <div className="lg:col-span-3">
            <Search className="mb-8" />

            {/* Grid de posts: 3 colunas em lg */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                Latest Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 9. Checklist de Aplicação

Ao criar ou revisar um layout, verifique:

- [ ] Container usa `max-w-6xl` (listagens) ou `max-w-3xl` (artigos)?
- [ ] Padding lateral é `px-4` (16px)?
- [ ] Todos os espaçamentos são múltiplos de 4px?
- [ ] Grid de posts usa `gap-6` (24px)?
- [ ] Seções principais usam `py-12` ou `py-20`?
- [ ] Não há valores "estranhos" como `gap-5`, `py-7`, `px-5`?
- [ ] Layout é responsivo com breakpoints md e lg?
- [ ] Cards de posts: 3 colunas (lg), 2 colunas (md), 1 coluna (mobile)?

---

## 10. Próximos Passos

1. **Aplicar este sistema** aos componentes existentes (BlogGrid, BlogCard)
2. **Refinar paleta de cores** para complementar a hierarquia
3. **Definir padrões de componentes** com esses layouts
4. **Criar microinterações** que respeitem o ritmo vertical
5. **Documentar exceções** quando necessário sair do grid

---

## 11. Referências

- [Every Layout - Layout Primitives](https://every-layout.dev/)
- [Tailwind CSS - Grid System](https://tailwindcss.com/docs/grid-template-columns)
- [Refactoring UI - Layout & Spacing](https://www.refactoringui.com/)
- [The Elements of Typographic Style Applied to the Web](http://webtypography.net/2.2.2)
