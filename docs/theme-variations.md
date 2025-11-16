# Variações de Tema do Blog

Este documento apresenta 3 variações de tema prontas para o blog, cada uma com uma estética e filosofia visual distintas:

1. **Editorial** - Elegante, sofisticado, foco na legibilidade
2. **Minimalista** - Clean, espaçoso, essencial
3. **Brutalista** - Ousado, raw, experimental

Cada tema pode ser ativado alterando variáveis CSS e algumas classes utilitárias.

---

## Tema 1: Editorial

### Filosofia

Design inspirado em revistas digitais premium como Medium, The Verge e Notion. Foco total na tipografia, hierarquia clara e experiência de leitura confortável.

### Características

- **Tipografia**: Serifada para títulos, sans-serif para corpo
- **Paleta**: Monocromática com um accent sutil
- **Espaçamento**: Generoso, respirável
- **Bordas**: Raios sutis (8-12px)
- **Imagens**: Grandes, imersivas, com captions

### Paleta de Cores (Editorial)

```css
/* Editorial Theme - Light */
:root[data-theme="editorial"] {
  /* ===== NEUTRAL ===== */
  --background: oklch(99% 0 0);           /* Branco quente */
  --foreground: oklch(15% 0 0);           /* Preto profundo */

  --card: oklch(98% 0.005 40);            /* Off-white cremoso */
  --card-foreground: oklch(15% 0 0);

  /* ===== BRAND ===== */
  --primary: oklch(35% 0.05 280);         /* Azul escuro elegante */
  --primary-foreground: oklch(99% 0 0);

  --accent: oklch(60% 0.15 30);           /* Terracota sutil */
  --accent-foreground: oklch(99% 0 0);

  /* ===== MUTED ===== */
  --muted: oklch(95% 0.005 40);
  --muted-foreground: oklch(45% 0.01 280);

  --border: oklch(88% 0.005 40);
  --ring: oklch(35% 0.05 280);

  /* ===== SEMANTIC ===== */
  --destructive: oklch(50% 0.2 25);
  --success: oklch(50% 0.15 150);
}

/* Editorial Theme - Dark */
:root[data-theme="editorial"].dark {
  --background: oklch(12% 0.01 280);
  --foreground: oklch(95% 0.005 40);

  --card: oklch(18% 0.01 280);
  --card-foreground: oklch(95% 0.005 40);

  --primary: oklch(75% 0.12 280);
  --primary-foreground: oklch(12% 0.01 280);

  --accent: oklch(70% 0.18 30);
  --accent-foreground: oklch(12% 0.01 280);

  --muted: oklch(22% 0.01 280);
  --muted-foreground: oklch(65% 0.02 260);

  --border: oklch(28% 0.02 280);
}
```

### Tipografia Editorial

```css
/* Editorial - Usa serif para headings */
:root[data-theme="editorial"] {
  --font-heading: 'Playfair Display', 'Georgia', serif;
  --font-body: 'Inter', -apple-system, sans-serif;

  /* Escala mais dramática (1.333 - Perfect Fourth) */
  --text-4xl: clamp(2.8rem, 3vw + 1.5rem, 4rem);
  --text-3xl: clamp(2.1rem, 2.5vw + 1rem, 3rem);
}

/* Aplicar serif aos headings */
:root[data-theme="editorial"] h1,
:root[data-theme="editorial"] h2,
:root[data-theme="editorial"] h3 {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  font-weight: 700;
}
```

### Border Radius Editorial

```css
:root[data-theme="editorial"] {
  --radius: 0.5rem;         /* 8px - sutil */
  --radius-lg: 0.75rem;     /* 12px */
  --radius-xl: 1rem;        /* 16px */
}
```

### Componentes Chave (Editorial)

#### BlogCard Editorial

```tsx
<article className="group overflow-hidden">
  {/* Imagem sem borda, full-bleed */}
  <div className="aspect-[4/3] overflow-hidden mb-4">
    <img className="object-cover transition-transform duration-700 group-hover:scale-105" />
  </div>

  {/* Meta acima do título (editorial style) */}
  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
    <time>Jan 15, 2025</time>
    <span className="mx-2">•</span>
    <span>5 min read</span>
  </div>

  {/* Título serif grande */}
  <h3 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-3">
    {post.title}
  </h3>

  {/* Excerpt generoso */}
  <p className="text-base leading-relaxed text-muted-foreground line-clamp-3 mb-4">
    {post.excerpt}
  </p>

  {/* Link minimalista */}
  <a className="text-sm font-medium text-primary underline decoration-2 underline-offset-4">
    Continue reading
  </a>
</article>
```

#### Preview Visual

```
┌────────────────────────────────┐
│                                │
│     [  Large Image 4:3  ]      │
│                                │
├────────────────────────────────┤
│ JAN 15, 2025 • 5 MIN READ      │ ← Small caps, muted
│                                │
│ The Future of Web              │ ← Serif, bold, 2xl
│ Development in 2025            │
│                                │
│ Exploring the emerging trends  │ ← Sans, relaxed, muted
│ and technologies that will...  │
│                                │
│ Continue reading ─────         │ ← Underlined link
└────────────────────────────────┘
```

---

## Tema 2: Minimalista

### Filosofia

Inspirado em Apple, Linear, Stripe. Menos é mais. Cada elemento tem um propósito. Muito espaço em branco, tipografia sans-serif clean, cores neutras.

### Características

- **Tipografia**: Sans-serif system fonts
- **Paleta**: Monocromática rigorosa (grays + 1 accent)
- **Espaçamento**: Máximo, amplo
- **Bordas**: Mínimas ou zero
- **Imagens**: Opcionais, quando presentes são minimalistas

### Paleta de Cores (Minimalista)

```css
/* Minimalist Theme - Light */
:root[data-theme="minimalist"] {
  /* ===== NEUTRAL ===== */
  --background: oklch(100% 0 0);          /* Branco puro */
  --foreground: oklch(10% 0 0);           /* Preto quase puro */

  --card: oklch(100% 0 0);                /* Sem diferenciação */
  --card-foreground: oklch(10% 0 0);

  /* ===== BRAND ===== */
  --primary: oklch(10% 0 0);              /* Preto (!) */
  --primary-foreground: oklch(100% 0 0);

  --accent: oklch(10% 0 0);               /* Mesmo que primary */
  --accent-foreground: oklch(100% 0 0);

  /* ===== MUTED ===== */
  --muted: oklch(96% 0 0);                /* Gray 50 */
  --muted-foreground: oklch(50% 0 0);     /* Gray 500 */

  --border: oklch(90% 0 0);               /* Gray 100 */
  --ring: oklch(10% 0 0);

  /* ===== SEMANTIC ===== */
  --destructive: oklch(45% 0.25 25);      /* Red puro */
  --success: oklch(45% 0.2 150);          /* Green puro */
}

/* Minimalist Theme - Dark */
:root[data-theme="minimalist"].dark {
  --background: oklch(10% 0 0);           /* Preto profundo */
  --foreground: oklch(98% 0 0);           /* Branco quase puro */

  --card: oklch(10% 0 0);
  --card-foreground: oklch(98% 0 0);

  --primary: oklch(98% 0 0);              /* Branco */
  --primary-foreground: oklch(10% 0 0);

  --muted: oklch(18% 0 0);
  --muted-foreground: oklch(60% 0 0);

  --border: oklch(20% 0 0);
}
```

### Tipografia Minimalista

```css
:root[data-theme="minimalist"] {
  --font-heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Escala moderada (1.2 - Minor Third) */
  --text-4xl: clamp(2rem, 2vw + 1rem, 2.5rem);
  --text-3xl: clamp(1.7rem, 1.8vw + 0.8rem, 2.2rem);
}
```

### Border Radius Minimalista

```css
:root[data-theme="minimalist"] {
  --radius: 0;              /* Sem bordas arredondadas */
  --radius-lg: 0;
  --radius-xl: 0;
}
```

### Componentes Chave (Minimalista)

#### BlogCard Minimalista

```tsx
<article className="group py-8 border-b border-border last:border-0">
  {/* Sem imagem, ou imagem pequena e opcional */}

  {/* Meta inline, muito sutil */}
  <div className="text-xs text-muted-foreground mb-3">
    <time>January 15, 2025</time>
  </div>

  {/* Título grande, bold, sans-serif */}
  <h3 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
    {post.title}
  </h3>

  {/* Excerpt menor, mais espaço */}
  <p className="text-base text-muted-foreground line-clamp-2 mb-6 max-w-2xl">
    {post.excerpt}
  </p>

  {/* Link sem underline, hover com seta */}
  <a className="text-sm font-medium text-foreground inline-flex items-center gap-2 group-hover:gap-3 transition-all">
    Read article
    <span>→</span>
  </a>
</article>
```

#### Preview Visual

```
──────────────────────────────────────
January 15, 2025                      ← Tiny, muted

The Future of Web Development         ← Bold, 3xl, tight
in 2025

Exploring the emerging trends and     ← Muted, spaced
technologies that will shape...

Read article  →                       ← Simple link

──────────────────────────────────────
```

---

## Tema 3: Brutalista

### Filosofia

Inspirado em Brutalist Websites, Craigslist modernizado, design raw e honesto. Sem floreios, sem gradientes, sem sombras. Tipografia monospace, cores fortes, bordas duras.

### Características

- **Tipografia**: Monospace para títulos, grotesque sans para corpo
- **Paleta**: Alto contraste, cores primárias vibrantes
- **Espaçamento**: Compacto, eficiente
- **Bordas**: Duras, quadradas, bordas grossas
- **Imagens**: Alto contraste, filtros de cor, ou sem imagens

### Paleta de Cores (Brutalista)

```css
/* Brutalist Theme - Light */
:root[data-theme="brutalist"] {
  /* ===== NEUTRAL ===== */
  --background: oklch(100% 0 0);          /* Branco puro */
  --foreground: oklch(0% 0 0);            /* Preto puro */

  --card: oklch(95% 0.1 60);              /* Amarelo vibrante */
  --card-foreground: oklch(0% 0 0);

  /* ===== BRAND ===== */
  --primary: oklch(50% 0.3 270);          /* Roxo elétrico */
  --primary-foreground: oklch(100% 0 0);

  --accent: oklch(60% 0.3 120);           /* Verde limão */
  --accent-foreground: oklch(0% 0 0);

  /* ===== MUTED ===== */
  --muted: oklch(85% 0 0);                /* Gray claro */
  --muted-foreground: oklch(30% 0 0);     /* Gray escuro */

  --border: oklch(0% 0 0);                /* Preto sempre */
  --ring: oklch(50% 0.3 270);

  /* ===== SEMANTIC ===== */
  --destructive: oklch(55% 0.3 25);       /* Vermelho vibrante */
  --success: oklch(55% 0.28 150);         /* Verde vibrante */
}

/* Brutalist Theme - Dark */
:root[data-theme="brutalist"].dark {
  --background: oklch(0% 0 0);            /* Preto puro */
  --foreground: oklch(100% 0 0);          /* Branco puro */

  --card: oklch(15% 0.08 270);            /* Roxo escuro */
  --card-foreground: oklch(100% 0 0);

  --primary: oklch(65% 0.3 120);          /* Verde limão */
  --primary-foreground: oklch(0% 0 0);

  --accent: oklch(75% 0.3 60);            /* Amarelo */
  --accent-foreground: oklch(0% 0 0);

  --muted: oklch(20% 0 0);
  --muted-foreground: oklch(75% 0 0);

  --border: oklch(100% 0 0);              /* Branco sempre */
}
```

### Tipografia Brutalista

```css
:root[data-theme="brutalist"] {
  --font-heading: 'Courier New', 'Courier', monospace;
  --font-body: 'Arial', 'Helvetica', sans-serif;

  /* Escala agressiva, tamanhos fixos */
  --text-4xl: 3rem;     /* Sem fluid */
  --text-3xl: 2.5rem;
  --text-2xl: 2rem;
}

:root[data-theme="brutalist"] h1,
:root[data-theme="brutalist"] h2,
:root[data-theme="brutalist"] h3 {
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}
```

### Border Radius Brutalista

```css
:root[data-theme="brutalist"] {
  --radius: 0;              /* Zero sempre */
  --radius-lg: 0;
  --radius-xl: 0;
}
```

### Componentes Chave (Brutalista)

#### BlogCard Brutalista

```tsx
<article className="group border-4 border-foreground p-4 bg-card hover:bg-accent hover:border-accent transition-colors">
  {/* Imagem com filtro de cor */}
  <div className="aspect-video overflow-hidden mb-4 border-2 border-foreground">
    <img className="object-cover mix-blend-multiply filter saturate-150" />
  </div>

  {/* Meta em caps, inline */}
  <div className="text-xs uppercase tracking-widest font-bold mb-2">
    <time>2025-01-15</time> | <span>WEB DEV</span>
  </div>

  {/* Título monospace, caps */}
  <h3 className="font-heading text-xl uppercase font-bold mb-3 leading-tight">
    {post.title}
  </h3>

  {/* Excerpt compacto */}
  <p className="text-sm leading-snug line-clamp-2 mb-4">
    {post.excerpt}
  </p>

  {/* Botão como elemento */}
  <button className="border-2 border-foreground bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase hover:bg-foreground hover:text-background transition-colors">
    [READ]
  </button>
</article>
```

#### Preview Visual

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ┌──────────────────────────┐ ┃
┃ │                          │ ┃
┃ │   [IMAGE - SATURATED]    │ ┃
┃ │                          │ ┃
┃ └──────────────────────────┘ ┃
┃                              ┃
┃ 2025-01-15 | WEB DEV          ┃ ← Small caps
┃                              ┃
┃ THE FUTURE OF WEB            ┃ ← Monospace, caps
┃ DEVELOPMENT IN 2025          ┃
┃                              ┃
┃ Exploring the emerging...    ┃ ← Compact
┃                              ┃
┃ ┌──────────┐                 ┃
┃ │  [READ]  │                 ┃ ← Button
┃ └──────────┘                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Comparação Rápida

| Aspecto | Editorial | Minimalista | Brutalista |
|---------|-----------|-------------|------------|
| **Tipografia** | Serif + Sans | System Sans | Monospace + Grotesque |
| **Paleta** | Monocromática + Terracota | Grays + Preto | Cores primárias vibrantes |
| **Espaçamento** | Generoso | Máximo | Compacto |
| **Bordas** | Sutis (8-12px) | Zero | Zero + Grossas (2-4px) |
| **Imagens** | Grandes, 4:3 | Raras ou pequenas | Alto contraste, filtros |
| **Vibe** | Sofisticado, elegante | Clean, zen | Raw, ousado |
| **Uso ideal** | Blog longform, artigos | Portfolio, docs técnicos | Projeto experimental, art |

---

## Como Aplicar um Tema

### Método 1: Via Data Attribute

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="editorial"> {/* ou "minimalist" ou "brutalist" */}
      <body>{children}</body>
    </html>
  );
}
```

### Método 2: Via Context Provider (dinâmico)

```tsx
// src/contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type ThemeVariant = 'editorial' | 'minimalist' | 'brutalist';

const ThemeContext = createContext<{
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
}>({ theme: 'editorial', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>('editorial');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Método 3: Theme Switcher Component

```tsx
// src/components/ui/ThemeVariantSwitcher.tsx
'use client';

import { useTheme } from '@/contexts/ThemeContext';

export function ThemeVariantSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('editorial')}
        className={theme === 'editorial' ? 'font-bold' : ''}
      >
        Editorial
      </button>
      <button
        onClick={() => setTheme('minimalist')}
        className={theme === 'minimalist' ? 'font-bold' : ''}
      >
        Minimal
      </button>
      <button
        onClick={() => setTheme('brutalist')}
        className={theme === 'brutalist' ? 'font-bold' : ''}
      >
        Brutal
      </button>
    </div>
  );
}
```

---

## Implementação no CSS

### globals.css (adicionar no final)

```css
/* ========================================
   THEME VARIATIONS
   ======================================== */

/* Editorial Theme */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

[data-theme="editorial"] {
  /* Variables definidas acima */
}

[data-theme="editorial"] h1,
[data-theme="editorial"] h2,
[data-theme="editorial"] h3 {
  font-family: 'Playfair Display', Georgia, serif;
  letter-spacing: -0.02em;
}

/* Minimalist Theme */
[data-theme="minimalist"] {
  /* Variables definidas acima */
}

[data-theme="minimalist"] * {
  border-radius: 0 !important;
}

/* Brutalist Theme */
[data-theme="brutalist"] {
  /* Variables definidas acima */
}

[data-theme="brutalist"] h1,
[data-theme="brutalist"] h2,
[data-theme="brutalist"] h3 {
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

[data-theme="brutalist"] * {
  border-radius: 0 !important;
}
```

---

## Próximos Passos

1. **Escolher um tema padrão** (recomendação: Editorial para blog)
2. **Implementar CSS variables** para cada tema
3. **Testar componentes** em cada variação
4. **Criar theme switcher** (opcional) para demonstração
5. **Documentar edge cases** e ajustes necessários por componente

---

## Ferramentas de Referência

**Inspiração Editorial:**
- [Medium](https://medium.com/)
- [The Verge](https://www.theverge.com/)
- [Notion Blog](https://www.notion.so/blog)

**Inspiração Minimalista:**
- [Linear](https://linear.app/)
- [Stripe Docs](https://stripe.com/docs)
- [Apple Newsroom](https://www.apple.com/newsroom/)

**Inspiração Brutalista:**
- [Brutalist Websites](https://brutalistwebsites.com/)
- [Bloomberg](https://www.bloomberg.com/)
- [Monopo London](https://monopo.london/)

**Geradores de Tema:**
- [Realtime Colors](https://www.realtimecolors.com/)
- [shadcn/ui Themes](https://ui.shadcn.com/themes)
- [tweakcn](https://tweakcn.com/)
