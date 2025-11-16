# Sistema de Microinterações do Blog

Microinterações são pequenos momentos de feedback e resposta que tornam a interface viva e responsiva. Este documento define a linguagem de microinterações do blog baseada em princípios funcionais e de design.

## Princípios de Microinterações

1. **Simples e funcionais** - Cada microinteração tem um propósito claro
2. **Feedback imediato** - Respostas acontecem em <100ms
3. **Hierarquia de atenção** - Interações mais importantes são mais evidentes
4. **Consistência** - Mesmo tipo de ação = mesmo tipo de feedback
5. **Nunca gratuitas** - Evitar "efeitos especiais" sem função

## Referências e Inspiração

- [Microinteractions: The Secret to Great App Design](https://www.interaction-design.org/literature/article/microinteractions-better-user-experience-through-details)
- [UI Animation Handbook](https://uianimation.io/)
- [Material Design Motion](https://m3.material.io/styles/motion)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

## Tokens de Animação

### Duração (Duration)

```css
:root {
  /* Micro - Feedbacks imediatos */
  --duration-instant: 0ms;          /* Sem animação */
  --duration-fast: 150ms;           /* Hover, foco */
  --duration-base: 250ms;           /* Transições padrão */

  /* Macro - Transições maiores */
  --duration-slow: 400ms;           /* Modais, slides */
  --duration-slower: 600ms;         /* Page transitions */

  /* Looping - Animações contínuas */
  --duration-pulse: 2000ms;         /* Pulse effects */
  --duration-float: 6000ms;         /* Floating animations */
}
```

### Easing (Timing Functions)

```css
:root {
  /* Standard easings */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Custom easings - mais suaves */
  --ease-soft: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Recommended for blog */
  --ease-default: var(--ease-soft);
}
```

### Transformações Comuns

```css
:root {
  /* Scale */
  --scale-hover: 1.02;              /* Hover sutil em cards */
  --scale-active: 0.98;             /* Press down */
  --scale-image-hover: 1.1;         /* Zoom em imagens */

  /* Translate */
  --translate-hover: -4px;          /* Lift em Y */
  --translate-arrow: 4px;           /* Seta para direita */

  /* Opacity */
  --opacity-disabled: 0.5;
  --opacity-muted: 0.7;
}
```

---

## Kit de Classes Utilitárias de Animação

### Classes Tailwind Customizadas (adicionar ao globals.css)

```css
@layer utilities {
  /* ========================================
     MOTION UTILITIES
     ======================================== */

  /* Hover: Lift (elevar) */
  .motion-lift {
    transition: transform var(--duration-fast) var(--ease-default),
                box-shadow var(--duration-fast) var(--ease-default);
  }

  .motion-lift:hover {
    transform: translateY(var(--translate-hover));
  }

  /* Hover: Scale (crescer) */
  .motion-scale {
    transition: transform var(--duration-fast) var(--ease-default);
  }

  .motion-scale:hover {
    transform: scale(var(--scale-hover));
  }

  /* Hover: Scale image (zoom em imagem) */
  .motion-scale-image {
    transition: transform var(--duration-slow) var(--ease-default);
  }

  .motion-scale-image:hover {
    transform: scale(var(--scale-image-hover));
  }

  /* Focus: Ring animado */
  .motion-focus-ring:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3);
    transition: box-shadow var(--duration-fast) var(--ease-default);
  }

  /* Hover: Arrow (seta para direita) */
  .motion-arrow-right {
    transition: transform var(--duration-fast) var(--ease-default);
  }

  .motion-arrow-right:hover {
    transform: translateX(var(--translate-arrow));
  }

  /* Hover: Glow (brilho) */
  .motion-glow:hover {
    box-shadow: 0 0 20px rgb(var(--primary) / 0.3),
                0 0 40px rgb(var(--primary) / 0.1);
    transition: box-shadow var(--duration-base) var(--ease-default);
  }

  /* Loading: Spin */
  .motion-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Loading: Pulse */
  .motion-pulse {
    animation: pulse var(--duration-pulse) cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Entrance: Fade in */
  .motion-fade-in {
    animation: fadeIn var(--duration-base) var(--ease-default);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Entrance: Slide up */
  .motion-slide-up {
    animation: slideUp var(--duration-base) var(--ease-default);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Transition: Smooth all */
  .motion-smooth {
    transition: all var(--duration-base) var(--ease-default);
  }

  /* Transition: Smooth color */
  .motion-smooth-colors {
    transition: background-color var(--duration-base) var(--ease-default),
                color var(--duration-base) var(--ease-default),
                border-color var(--duration-base) var(--ease-default);
  }
}
```

---

## Microinterações por Momento

### 1. Hover em Card de Post

**Trigger**: Mouse sobre o card

**Feedback**:
- Card eleva 4px (translateY)
- Border muda de `border/50` para `primary/30`
- Box shadow aparece sutilmente
- Imagem dá zoom leve (scale 1.1)
- Overlay gradient aparece com fade

**Código**:
```tsx
<article className="group relative overflow-hidden rounded-xl border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  {/* Image */}
  <div className="overflow-hidden">
    <img className="transition-transform duration-500 group-hover:scale-110" />
  </div>
</article>
```

**Duração**: 300ms (card), 500ms (imagem)

**Easing**: `ease-in-out` (padrão Tailwind)

---

### 2. Click em Botão (CTA)

**Trigger**: Click no botão

**Feedback**:
1. **Hover**: Cor de fundo mais clara (90% opacity)
2. **Active (press down)**: Scale 0.98
3. **Loading**: Spinner aparece, texto muda
4. **Success**: Checkmark aparece

**Código**:
```tsx
<button
  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-200 hover:bg-primary/90 active:scale-98 disabled:opacity-50"
  onClick={handleClick}
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
      Loading...
    </>
  ) : (
    'Subscribe'
  )}
</button>
```

**Duração**: 200ms (hover), 100ms (active)

**Easing**: `ease-in-out`

---

### 3. Navegação entre Posts (Prev/Next)

**Trigger**: Click em "Previous" ou "Next"

**Feedback**:
- Seta desliza para o lado correspondente (translateX)
- Texto muda de cor
- Toda a área é clicável com hover feedback

**Código**:
```tsx
<nav className="flex justify-between gap-4 mt-12 pt-8 border-t">
  {prev && (
    <a
      href={`/blog/${prev.slug}`}
      className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
    >
      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      <div>
        <p className="text-xs text-muted-foreground">Previous</p>
        <p className="font-medium">{prev.title}</p>
      </div>
    </a>
  )}

  {next && (
    <a
      href={`/blog/${next.slug}`}
      className="group flex items-center gap-2 text-sm text-right hover:text-primary transition-colors ml-auto"
    >
      <div>
        <p className="text-xs text-muted-foreground">Next</p>
        <p className="font-medium">{next.title}</p>
      </div>
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  )}
</nav>
```

**Duração**: 150ms (seta), 200ms (cor)

---

### 4. Mudança de Tema (Light ↔ Dark)

**Trigger**: Click no botão de tema

**Feedback**:
- Ícone roda 360° enquanto tema muda
- Cores transicionam suavemente
- Sem flash (prefers-color-scheme respeitado)

**Código**:
```tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);

  const toggleTheme = () => {
    setIsChanging(true);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => setIsChanging(false), 400);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      <div className={`transition-transform duration-400 ${isChanging ? 'rotate-360' : ''}`}>
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </div>
    </button>
  );
}
```

**CSS Global (garantir transições suaves)**:
```css
/* globals.css */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Exceções (não animar estes) */
.no-transition,
.motion-instant {
  transition: none !important;
}
```

**Duração**: 300ms (cores), 400ms (ícone)

---

### 5. Busca (Search) - Digitação

**Trigger**: Usuário digita no campo

**Feedback**:
- Debounce de 300ms antes de filtrar
- Resultados fazem fade-in
- Contador de resultados aparece
- Loading indicator sutil (opcional)

**Código**:
```tsx
'use client';

import { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

export function Search({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [query, debouncedQuery]);

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery) return posts;
    return posts.filter(/* ... */);
  }, [posts, debouncedQuery]);

  return (
    <div>
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-ring transition-shadow"
          placeholder="Search articles..."
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Results com fade-in */}
      <div className="mt-6 animate-in fade-in duration-300">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```

**Duração**: 300ms (debounce), 300ms (fade-in resultados)

---

### 6. Copy Code Button

**Trigger**: Click no botão de copiar

**Feedback**:
1. **Idle**: Ícone de Copy, opacity 0 (aparece no hover do bloco)
2. **Hover**: Opacity 100, background muted
3. **Click**: Ícone muda para Check (verde)
4. **After 2s**: Volta ao ícone de Copy

**Código**:
```tsx
'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-muted"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-success" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}
```

**Duração**: 200ms (aparecer), 200ms (ícone swap)

---

### 7. Newsletter Subscribe

**Trigger**: Submissão do formulário

**Feedback**:
1. **Idle**: Input normal + botão "Subscribe"
2. **Loading**: Botão mostra spinner + "Subscribing..."
3. **Success**: Form desaparece (fade out), mensagem de sucesso aparece (fade in) com checkmark animado

**Código**:
```tsx
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

return (
  <div className="relative">
    {status !== 'success' ? (
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 transition-shadow"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    ) : (
      <div className="flex flex-col items-center gap-3 text-success animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <p className="font-medium">Thanks for subscribing!</p>
      </div>
    )}
  </div>
);
```

**Duração**: 500ms (fade in/out), 1000ms (spinner durante loading)

---

### 8. Scroll Progress Bar

**Trigger**: Scroll da página

**Feedback**:
- Barra no topo cresce conforme scroll
- Cor primária com gradient sutil
- Smooth atualização (não laggy)

**Código**:
```tsx
'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted/30 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

**Duração**: 100ms (suave mas responsivo)

---

### 9. Table of Contents - Active Heading

**Trigger**: Scroll do artigo

**Feedback**:
- Heading ativo muda de cor para `primary`
- Font weight aumenta para `font-medium`
- Transição suave ao trocar

**Código**:
```tsx
<a
  href={`#${heading.id}`}
  className={`block py-1 text-sm transition-all duration-200 ${
    activeId === heading.id
      ? 'text-primary font-medium'
      : 'text-muted-foreground hover:text-foreground'
  }`}
>
  {heading.text}
</a>
```

**Duração**: 200ms

---

### 10. Link Hover (no corpo do texto)

**Trigger**: Mouse sobre link

**Feedback**:
- Cor muda de `primary` para `accent`
- Underline fica mais grosso (ou aparece se não tinha)
- Cursor muda para pointer

**Código**:
```css
/* globals.css */
.mdx-content a {
  color: rgb(var(--primary));
  text-decoration-color: rgb(var(--primary) / 0.3);
  text-decoration-thickness: 0.0625rem;
  text-underline-offset: 0.125rem;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.mdx-content a:hover {
  color: rgb(var(--accent));
  text-decoration-color: rgb(var(--accent));
  text-decoration-thickness: 0.125rem; /* 2px */
}
```

**Duração**: 200ms

---

## Regras de Ouro para Microinterações

### DO ✅

1. **Use animações sutis** - 150-300ms para a maioria das interações
2. **Feedback imediato** - Hover/focus em <100ms
3. **Easing natural** - `ease-out` para entradas, `ease-in` para saídas
4. **Consistência** - Mesmo tipo de interação = mesmo feedback
5. **Respeite prefers-reduced-motion** - Desative animações se usuário preferir

### DON'T ❌

1. **Animações longas** - Evite >600ms exceto para page transitions
2. **Efeitos sem propósito** - Sem "fireworks" gratuitos
3. **Animações blocantes** - Não impeça usuário de interagir
4. **Excesso de movimento** - Máximo 2-3 elementos animando simultaneamente
5. **Easing linear em transições** - Parece robótico

---

## Support para Prefers-Reduced-Motion

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Checklist de Microinterações

Ao adicionar uma microinteração, pergunte:

- [ ] Tem um propósito funcional claro?
- [ ] Dura menos de 400ms (exceto loading states)?
- [ ] Usa easing adequado (não linear)?
- [ ] É consistente com outras interações similares?
- [ ] Respeita `prefers-reduced-motion`?
- [ ] Funciona bem em mobile (touch)?
- [ ] Não bloqueia a interação do usuário?
- [ ] Performance OK (60fps)?

---

## Próximos Passos

1. **Implementar tokens de animação** no globals.css
2. **Criar classes utilitárias** para reutilização
3. **Aplicar microinterações** aos componentes principais
4. **Testar performance** (Chrome DevTools, Lighthouse)
5. **Validar acessibilidade** (testar com reduced motion)

---

## Ferramentas de Teste

- **Chrome DevTools**: Performance tab para medir FPS
- **Lighthouse**: Audit de performance
- **React DevTools**: Profiler para React rendering
- **axe DevTools**: Testes de acessibilidade automáticos
