# Guideline de Hierarquia Visual do Blog

## 1. Mapeamento de Tipos de Página

### Tipos de Página Identificados

| Tipo de Página | Rota | Blocos Principais | Elemento de Maior Destaque |
|----------------|------|-------------------|----------------------------|
| **Home** | `/` | Hero, Featured Posts, Skills, CTA | Nome do autor (hero title) |
| **Blog Index** | `/blog` | Header, Search, Tag Cloud, Blog Grid | Título da página "Blog" |
| **Post Individual** | `/blog/[slug]` | Breadcrumbs, Header, TOC, Content, Tags, Related Posts | Título do post |
| **Tag Filter** | `/tag/[tag]` | Header, Filtered Blog Grid | Tag name |
| **About** | `/about` | Profile info, Bio, Skills | Título da página |

### Hierarquia de Atenção por Tipo de Página

#### Home (/)
1. **Maior destaque**: Nome do autor no hero (`text-5xl md:text-7xl`)
2. **Segundo nível**: Subtítulo e descrição (`text-xl md:text-2xl`)
3. **Terceiro nível**: CTAs principais (buttons gradient)
4. **Quarto nível**: Títulos de seção (`text-4xl md:text-5xl`)
5. **Quinto nível**: Títulos de cards de posts (`text-xl`)
6. **Sexto nível**: Metadados (data, autor)

#### Blog Index (/blog)
1. **Maior destaque**: Título principal "Blog" (`text-3xl md:text-4xl`)
2. **Segundo nível**: Featured post title (se houver) (`text-2xl md:text-3xl`)
3. **Terceiro nível**: Títulos de posts regulares (`text-xl`)
4. **Quarto nível**: Excerpts e descrições
5. **Quinto nível**: Metadados (data, autor, tags)

#### Post Individual (/blog/[slug])
1. **Maior destaque**: Título do post (`text-3xl md:text-4xl`)
2. **Segundo nível**: Headings H2 dentro do conteúdo (`text-3xl`)
3. **Terceiro nível**: Headings H3 dentro do conteúdo (`text-2xl`)
4. **Quarto nível**: Corpo do texto (`text-base`)
5. **Quinto nível**: Metadados (data, autor, tempo de leitura)
6. **Sexto nível**: Tags e related posts

---

## 2. Sistema de Tokens de Hierarquia

### Níveis de Importância Visual

| Nível | Nome do Token | Uso Típico | Tipografia | Cor | Exemplo |
|-------|---------------|-----------|------------|-----|---------|
| **1** | `display-hero` | Hero principal, landing page | `text-5xl md:text-7xl` (48-86px) | `foreground` ou gradient | "Hi, I'm Ricardo" |
| **2** | `heading-page` | Título de página principal | `text-4xl md:text-5xl` (40-69px) | `foreground` | "Featured Posts", "Blog" |
| **3** | `heading-section` | Título de seção, post title | `text-3xl md:text-4xl` (33-55px) | `foreground` | Título do post individual |
| **4** | `heading-card-lg` | Título de card featured | `text-2xl md:text-3xl` (28-44px) | `foreground` | Featured post card |
| **5** | `heading-card` | Título de card regular | `text-xl` (23-28px) | `foreground` | Post card regular |
| **6** | `body-lg` | Subtítulos, lead paragraphs | `text-lg` (19-23px) | `foreground` | Hero subtitle |
| **7** | `body` | Corpo de texto principal | `text-base` (16-18px) | `foreground` | Parágrafos de artigo |
| **8** | `body-sm` | Excerpts, descriptions | `text-sm` (13-15px) | `foreground` | Excerpt de card |
| **9** | `meta` | Metadados, timestamps | `text-sm` (13-15px) | `muted-foreground` | Data, autor, tempo de leitura |
| **10** | `label` | Labels, tags, badges | `text-xs` (11-12px) | `muted-foreground` | Tags, categorias |

### Pesos de Fonte por Nível

| Nível | Font Weight | Uso |
|-------|-------------|-----|
| **Display/Headings** | `font-bold` (700) | Todos os títulos principais |
| **Body** | `font-normal` (400) | Texto corrido |
| **Meta/Labels** | `font-medium` (500) | Metadados, labels |
| **Emphasis** | `font-semibold` (600) | CTAs, links importantes |

---

## 3. Boas Práticas de Hierarquia Visual

### Regras de Ouro

1. **Máximo de 3-4 níveis de hierarquia visível por tela**
   - Evita confusão visual
   - Mantém foco claro

2. **Contraste de tamanho mínimo de 1.25x entre níveis**
   - Já implementado com Major Third Scale (1.25)
   - Garante diferenciação clara

3. **Use cor para reforçar, não para definir hierarquia**
   - Primário: `foreground` para conteúdo importante
   - Secundário: `muted-foreground` para metadados
   - Accent: gradientes apenas para CTAs e destaques especiais

4. **Espaçamento define hierarquia tanto quanto tipografia**
   - Mais espaço ao redor = mais importância
   - Elementos relacionados devem ter espaçamento consistente

5. **Limite uso de gradientes e efeitos especiais**
   - Hero principal: OK usar gradient no nome
   - Títulos de seção: OK usar gradient ocasionalmente
   - Corpo de texto: NUNCA usar gradients
   - CTAs: OK usar buttons com gradient

---

## 4. Exemplos Antes/Depois

### Exemplo 1: Card de Post (Regular)

#### ANTES (Inconsistente)
```tsx
<article className="border rounded-lg p-4">
  <h3 className="text-2xl mb-2">{post.title}</h3>
  <p className="text-gray-600 mb-2">{post.excerpt}</p>
  <div className="flex gap-2 text-sm">
    <span>{post.date}</span>
    <span>{post.author}</span>
  </div>
  <a href={`/blog/${post.slug}`} className="text-blue-500">Read more</a>
</article>
```

Problemas:
- Título muito grande para um card regular (text-2xl)
- Falta diferenciação clara entre excerpt e metadados
- Espaçamentos inconsistentes (mb-2 everywhere)
- Link "Read more" sem hierarquia clara

#### DEPOIS (Com tokens de hierarquia)
```tsx
<article className="border rounded-lg p-6 space-y-4">
  {/* Nível 5: heading-card */}
  <h3 className="text-xl font-bold leading-tight">
    {post.title}
  </h3>

  {/* Nível 9: meta */}
  <div className="flex gap-4 text-sm text-muted-foreground">
    <time>{post.date}</time>
    <span>{post.author}</span>
  </div>

  {/* Nível 8: body-sm */}
  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
    {post.excerpt}
  </p>

  {/* CTA com destaque visual */}
  <a
    href={`/blog/${post.slug}`}
    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
  >
    Read article
    <ArrowRight className="w-4 h-4" />
  </a>
</article>
```

Melhorias:
- Título em `text-xl` (nível 5: heading-card)
- Metadados em `text-sm` com `muted-foreground` (nível 9)
- Excerpt em `text-sm` com espaçamento adequado (nível 8)
- CTA com ícone e cor de destaque
- Espaçamento harmônico (`space-y-4`)

---

### Exemplo 2: Página de Artigo

#### ANTES (Hierarquia confusa)
```tsx
<article>
  <h1 className="text-3xl mb-4">{post.title}</h1>
  <div className="text-sm mb-4">
    <span>{post.date}</span> | <span>{post.author}</span>
  </div>
  <div className="prose">
    {post.content}
  </div>
</article>
```

Problemas:
- Título muito pequeno para página principal (text-3xl)
- Metadados sem hierarquia visual clara
- Sem distinção entre título e conteúdo
- Espaçamento muito compacto

#### DEPOIS (Hierarquia clara)
```tsx
<article className="prose lg:prose-xl max-w-none">
  <header className="mb-8 not-prose">
    {/* Nível 3: heading-section */}
    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
      {post.title}
    </h1>

    {/* Nível 9: meta - agrupados e espaçados */}
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <time dateTime={post.date}>{formattedDate}</time>
      {post.author && (
        <>
          <span className="hidden sm:inline">•</span>
          <span>{post.author}</span>
        </>
      )}
      <span className="hidden sm:inline">•</span>
      <ReadingTime minutes={readingTime} />
    </div>
  </header>

  {/* Nível 7: body - dentro do conteúdo MDX */}
  <div className="mdx-content">
    {post.content}
  </div>
</article>
```

Melhorias:
- Título em `text-3xl md:text-4xl` (nível 3: heading-section)
- Metadados agrupados com separadores visuais sutis
- `text-balance` para melhor quebra de linha no título
- Espaçamento generoso (`mb-8`) entre header e content
- Wrapper `.not-prose` para evitar conflitos com estilos de typography plugin

---

## 5. Checklist de Aplicação

Ao criar ou revisar um componente, verifique:

- [ ] O elemento de maior importância usa o token de nível adequado?
- [ ] Há no máximo 3-4 níveis de hierarquia visíveis?
- [ ] O contraste de tamanho entre níveis é suficiente (mínimo 1.25x)?
- [ ] Metadados usam `muted-foreground` para diminuir importância visual?
- [ ] Espaçamento reforça a hierarquia (mais espaço = mais importância)?
- [ ] Gradientes e efeitos especiais são usados com moderação?
- [ ] Títulos importantes usam `text-balance` ou `text-pretty`?
- [ ] Line-height adequado para cada tipo de conteúdo?

---

## 6. Referências e Inspiração

**Hierarquia Visual:**
- [The Interaction Design Foundation - Visual Hierarchy](https://www.interaction-design.org/literature/topics/visual-hierarchy)
- [Nielsen Norman Group - Visual Hierarchy](https://www.nngroup.com/articles/visual-hierarchy/)

**Tipografia:**
- [Type Scale (modularscale.com)](https://www.modularscale.com/)
- [Practical Typography](https://practicaltypography.com/)

**Tokens de Design:**
- [Design Tokens - W3C Community Group](https://design-tokens.github.io/community-group/)
- [Vercel Design System](https://vercel.com/design)

---

## 7. Próximos Passos

Depois de aplicar este guideline de hierarquia:

1. Aplicar ao **sistema de layout e grid** (próximo documento)
2. Refinar **paleta de cores** para reforçar hierarquia
3. Definir **padrões de componentes** baseados nesta hierarquia
4. Criar **microinterações** que reforcem a hierarquia
5. Validar **acessibilidade** (contraste AA/AAA)
