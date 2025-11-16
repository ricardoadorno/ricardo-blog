# Blog UI Playbook

**Guia de Evolução Contínua do Design System do Blog**

Este playbook é o documento mestre que consolida todos os guidelines, padrões e fluxos de trabalho para criar, manter e evoluir a interface do blog de forma consistente e de alta qualidade.

---

## 📚 Índice de Documentação

Todos os documentos de design estão em `/docs`:

1. **[hierarchy-guideline.md](hierarchy-guideline.md)** - Hierarquia visual e tokens
2. **[layout-grid-system.md](layout-grid-system.md)** - Grid, layout e ritmo vertical
3. **[color-palette-oklch.md](color-palette-oklch.md)** - Paleta OKLCH e acessibilidade
4. **[theme-variations.md](theme-variations.md)** - Variações de tema (editorial, minimal, brutal)
5. **[component-patterns.md](component-patterns.md)** - Padrões de componentes do blog
6. **[microinteractions.md](microinteractions.md)** - Sistema de microinterações
7. **[editorial-typography.md](editorial-typography.md)** - Tipografia para conteúdo longform
8. **[blog-ui-playbook.md](blog-ui-playbook.md)** - Este documento (meta!)

---

## 🎯 Filosofia de Design

### Princípios Centrais

1. **Legibilidade acima de tudo** - O blog existe para ser lido
2. **Hierarquia clara** - Usuário sempre sabe onde está e o que importa
3. **Consistência sistemática** - Mesmos padrões, mesmas soluções
4. **Performance e acessibilidade** - Rápido, acessível a todos
5. **Evolução documentada** - Mudanças são justificadas e registradas

### Valores de Design

- **Editorial**: Elegante, sofisticado, focado em conteúdo
- **Moderno**: Tech-forward, usando OKLCH, design tokens, componentes composable
- **Acessível**: WCAG AA mínimo, AAA preferencial
- **Performático**: Core Web Vitals verdes, loading rápido

---

## 🔄 Fluxo de Trabalho Padrão

Sempre que for criar ou alterar um componente/feature, siga estas 3 etapas:

### Etapa 1: Mapear Função e Hierarquia

**Perguntas:**
- Qual a função principal deste componente?
- Qual nível de hierarquia visual ele ocupa? (1-10, ver [hierarchy-guideline](hierarchy-guideline.md))
- Em que contexto será usado? (home, blog index, post individual, etc.)

**Exemplo:**
```
Componente: BlogCard
Função: Mostrar preview de post para clique
Hierarquia:
  - Título: Nível 5 (heading-card, text-xl)
  - Meta: Nível 9 (meta, text-sm muted)
  - Excerpt: Nível 8 (body-sm, text-sm)
Contexto: Blog index, related posts
```

### Etapa 2: Escolher Padrão e Tokens Existentes

**Perguntas:**
- Existe um padrão similar já definido? (ver [component-patterns](component-patterns.md))
- Quais tokens de hierarquia devo usar? (ver [hierarchy-guideline](hierarchy-guideline.md))
- Quais espaçamentos aplicar? (múltiplos de 4px, ver [layout-grid-system](layout-grid-system.md))
- Quais cores usar? (verificar contraste, ver [color-palette-oklch](color-palette-oklch.md))

**Exemplo:**
```tsx
// Usar padrão BlogCard já definido
<article className="p-6 space-y-4"> {/* p-6 = 24px, space-y-4 = 16px */}
  <h3 className="text-xl font-bold"> {/* heading-card */}
  <p className="text-sm text-muted-foreground"> {/* meta */}
```

### Etapa 3: Definir Microinterações e Estados

**Perguntas:**
- Quais estados este componente tem? (idle, hover, focus, active, loading, success, error)
- Quais microinterações são apropriadas? (ver [microinteractions](microinteractions.md))
- Durações e easings? (150-300ms, ease-in-out)

**Exemplo:**
```tsx
<article className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  {/* Hover: lift + shadow em 300ms */}
</article>
```

---

## ✅ Checklist de Revisão Visual

Use este checklist **sempre** que criar ou revisar um componente:

### Hierarquia e Tipografia
- [ ] Usa tokens de hierarquia corretos (display, heading-*, body-*, meta)?
- [ ] Font-sizes são do sistema de escalas (text-xs a text-6xl)?
- [ ] Line-heights apropriados (tight para títulos, relaxed para corpo)?
- [ ] Measure (largura de linha) respeitada (max 65-75ch para texto)?
- [ ] Text-balance ou text-pretty aplicado quando relevante?

### Layout e Espaçamento
- [ ] Container usa max-w adequado (max-w-3xl para artigos, max-w-6xl para grids)?
- [ ] Padding lateral é px-4 (16px)?
- [ ] Todos os espaçamentos são múltiplos de 4px?
- [ ] Gap de grid é gap-6 (24px) para posts?
- [ ] Ritmo vertical consistente (mt-12 para H2, mb-4 para parágrafos, etc.)?

### Cores e Contraste
- [ ] Contraste de texto/fundo atinge AA (4.5:1) ou AAA (7:1)?
- [ ] Cores usam tokens do sistema (primary, muted-foreground, etc.)?
- [ ] Links têm cor e underline visíveis?
- [ ] Estados de foco têm ring visível (focus:ring-2)?

### Microinterações
- [ ] Hover tem feedback visual claro?
- [ ] Transições duram 150-400ms (não mais)?
- [ ] Easing é suave (ease-in-out ou ease-soft)?
- [ ] Loading states têm spinner ou skeleton?
- [ ] Animações respeitam prefers-reduced-motion?

### Responsividade
- [ ] Mobile (<768px) funciona bem?
- [ ] Tablet (768-1023px) funciona bem?
- [ ] Desktop (1024px+) funciona bem?
- [ ] Breakpoints são md: e lg:?
- [ ] Font-size em mobile é ≥16px (evita zoom do iOS)?

### Acessibilidade
- [ ] Semantic HTML (header, nav, main, article, footer)?
- [ ] Headings em ordem (h1 → h2 → h3)?
- [ ] ARIA labels em ícones sem texto?
- [ ] Keyboard navigation funciona?
- [ ] Focus visível em todos os elementos interativos?

### Performance
- [ ] Imagens usam next/image ou OptimizedImage?
- [ ] Animações rodam a 60fps?
- [ ] Lazy loading aplicado onde apropriado?
- [ ] Componentes pesados são code-split?

---

## 🏗️ Padrões de Componentes Rápidos

### Card de Post (Regular)

```tsx
<article className="group rounded-xl border border-border/50 bg-card/30 p-6 space-y-4 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
  <h3 className="text-xl font-bold">{title}</h3>
  <div className="text-sm text-muted-foreground flex gap-4">
    <time>{date}</time>
    <span>{author}</span>
  </div>
  <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
  <a className="text-sm text-primary inline-flex items-center gap-2">
    Read article <ArrowRight />
  </a>
</article>
```

### Botão Primário

```tsx
<button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 active:scale-98">
  Click me
</button>
```

### Input de Formulário

```tsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-shadow"
  placeholder="Enter text..."
/>
```

### Callout (Informacional)

```tsx
<div className="p-4 rounded-lg border-l-4 border-info bg-info/10 flex gap-3">
  <Info className="w-5 h-5 text-info" />
  <div>
    <h4 className="font-bold mb-2">Did you know?</h4>
    <p className="text-sm">{content}</p>
  </div>
</div>
```

---

## 📐 Tokens de Design Rápidos

### Hierarquia de Texto

| Uso | Token | Classe |
|-----|-------|--------|
| Hero principal | display-hero | `text-5xl md:text-7xl` |
| Título de página | heading-page | `text-4xl md:text-5xl` |
| Título de seção/post | heading-section | `text-3xl md:text-4xl` |
| Título de card | heading-card | `text-xl` |
| Corpo | body | `text-base` |
| Meta | meta | `text-sm text-muted-foreground` |

### Espaçamentos Comuns

| Uso | Token | Classe |
|-----|-------|--------|
| Gap entre cards | 24px | `gap-6` |
| Padding de card | 24px | `p-6` |
| Espaço entre elementos dentro de card | 16px | `space-y-4` |
| Espaço antes de H2 | 48px | `mt-12` |
| Espaço após parágrafo | 24px | `mb-6` |
| Padding de seção | 80px | `py-20` |

### Cores Principais

| Uso | Token | Exemplo de Contraste |
|-----|-------|---------------------|
| Texto principal | `foreground` | 15:1 com background |
| Texto secundário | `muted-foreground` | 5.5:1 com background |
| Botão primário | `primary` / `primary-foreground` | 8.5:1 |
| Links | `primary` | 5.8:1 com background |

---

## 🎨 Quando Usar Cada Variação de Tema

### Editorial (Recomendado para Blog)
- **Use quando**: Blog com foco em leitura, artigos longos
- **Características**: Serif para títulos, monocromático com accent sutil
- **Inspiração**: Medium, The Verge

### Minimalista
- **Use quando**: Portfolio, docs técnicos, projetos clean
- **Características**: Sans-serif, monocromático rigoroso, muito espaço
- **Inspiração**: Apple, Linear, Stripe

### Brutalista
- **Use quando**: Projeto experimental, art blog, tech showcase
- **Características**: Monospace, cores vibrantes, bordas duras
- **Inspiração**: Brutalist Websites, Craigslist modernizado

---

## 🚀 Processo de Evolução

### Quando Adicionar Nova Feature

1. **Pesquisar**: Já existe padrão similar? Buscar em [component-patterns](component-patterns.md)
2. **Planejar**: Esboçar no papel ou Figma, definir hierarquia
3. **Implementar**: Seguir fluxo de trabalho (3 etapas acima)
4. **Revisar**: Passar por checklist completo
5. **Documentar**: Adicionar ao component-patterns.md se for reutilizável

### Quando Alterar Componente Existente

1. **Justificar**: Por que mudar? (UX issue, acessibilidade, performance?)
2. **Revisar impacto**: Quantos lugares usam este componente?
3. **Testar**: Em todos os contextos onde é usado
4. **Atualizar docs**: Refletir mudança na documentação
5. **Git commit**: Mensagem descritiva da mudança

### Quando Criar Novo Padrão

1. **Validar necessidade**: Padrão será usado 3+ vezes?
2. **Generalizar**: Remover especificidades, criar API flexível
3. **Documentar**: Adicionar a [component-patterns](component-patterns.md) com:
   - Quando usar
   - Quando evitar
   - Código exemplo
   - Variantes
4. **Comunicar**: Avisar time sobre novo padrão disponível

---

## 📖 Como Usar Este Playbook

### Cenário 1: Criar um Novo Componente

```
Tarefa: Criar um componente de "Author Bio" no final dos posts

1. Mapear função e hierarquia
   - Função: Mostrar info do autor com foto, nome, bio e social links
   - Hierarquia: Nome (heading-card, text-xl), Bio (body-sm, text-sm), Links (meta)
   - Contexto: Final de posts individuais

2. Escolher padrão e tokens
   - Padrão similar: BlogCard (estrutura de card)
   - Layout: flex gap-4, imagem redonda 64x64px à esquerda
   - Espaçamentos: p-6, space-y-3
   - Cores: muted para background, foreground para texto

3. Definir microinterações
   - Hover em social links: cor muda para primary
   - Transição: 200ms ease-in-out
   - Imagem: sem hover (não é clicável)

4. Implementar
   [Código aqui]

5. Revisar com checklist
   [✓] Hierarquia correta
   [✓] Espaçamentos múltiplos de 4
   [✓] Contraste AA
   [✓] Responsivo
   [✓] Acessível

6. Documentar
   Adicionar "Author Bio" a component-patterns.md
```

### Cenário 2: Ajustar Hierarquia de uma Página

```
Problema: Página /about tem hierarquia confusa

1. Consultar hierarchy-guideline.md
   - Identificar níveis de importância atuais
   - Comparar com guidelines

2. Aplicar correções
   - Título principal: text-4xl → heading-page ✓
   - Subtítulos: text-2xl → heading-card-lg ✓
   - Corpo: text-base → body ✓
   - Meta: adicionar text-muted-foreground ✓

3. Revisar ritmo vertical
   - Adicionar mt-12 antes de seções
   - Adicionar mb-6 após parágrafos

4. Testar
   - Visual: hierarquia clara?
   - Responsivo: funciona em mobile?

5. Commit
   git commit -m "fix: improve hierarchy on /about page"
```

### Cenário 3: Refatorar Cores para Melhor Contraste

```
Problema: Links no corpo do texto têm contraste 3.8:1 (falha AA)

1. Consultar color-palette-oklch.md
   - Verificar tabela de pares aprovados
   - Encontrar: "Links no corpo" deve ter 5.8:1

2. Ajustar cor
   - Atual: oklch(60% 0.2 280)
   - Novo: oklch(55% 0.2 280) ← mais escuro
   - Testar: 6.1:1 ✓ (passa AA+)

3. Atualizar globals.css
   .mdx-content a {
     color: oklch(55% 0.2 280);
   }

4. Validar
   - WebAIM Contrast Checker: ✓ 6.1:1
   - Todos os posts: revisar visualmente

5. Documentar
   - Atualizar color-palette-oklch.md com novo valor
```

---

## 🎯 Metas de Qualidade

### Performance
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: > 90 (all categories)

### Acessibilidade
- **Contraste**: WCAG AA mínimo (4.5:1 text, 3:1 UI)
- **Keyboard**: 100% navegável
- **Screen readers**: Semantic HTML + ARIA
- **Automated tests**: axe DevTools 0 issues

### Design System
- **Componentes documentados**: 100%
- **Padrões reutilizados**: > 80%
- **Desvios justificados**: Todos
- **Tokens usados**: > 90%

---

## 🔧 Ferramentas Essenciais

### Design
- **Figma**: Protótipos e mockups
- **Realtime Colors**: Preview de paletas
- **OKLCH Picker**: Escolher cores perceptualmente uniformes

### Desenvolvimento
- **VSCode**: Editor principal
- **Tailwind CSS IntelliSense**: Autocomplete de classes
- **Prettier**: Formatação de código

### Teste e Validação
- **Chrome DevTools**: Performance, Lighthouse
- **WebAIM Contrast Checker**: Validar contraste
- **axe DevTools**: Testes de acessibilidade
- **React DevTools**: Profiling de componentes

---

## 📚 Recursos e Referências

### Leitura Essencial
- [Practical Typography](https://practicaltypography.com/) - Tipografia web
- [Refactoring UI](https://www.refactoringui.com/) - Design prático
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

### Inspiração de Design
- [Medium](https://medium.com/) - Tipografia editorial
- [Stripe](https://stripe.com/) - Design system moderno
- [Linear](https://linear.app/) - Minimalismo elegante

### Comunidades
- [shadcn/ui Discord](https://discord.gg/shadcn) - Tailwind + shadcn
- [Tailwind CSS Discord](https://discord.gg/tailwindcss)
- [Design Systems Repo](https://designsystemsrepo.com/)

---

## 🎓 Aprendizagem Contínua

### Evoluir o Design System

**Mensalmente:**
- Revisar componentes mais usados
- Identificar padrões emergentes
- Atualizar documentação

**Trimestralmente:**
- Auditar acessibilidade completa
- Revisar performance (Lighthouse)
- Atualizar dependências (Tailwind, shadcn)

**Anualmente:**
- Rever paleta de cores (tendências)
- Considerar nova escala tipográfica
- Avaliar novos padrões de UI

### Contribuir para a Documentação

Se você encontrar:
- **Pattern novo e útil** → Adicionar a component-patterns.md
- **Bug ou inconsistência** → Corrigir e documentar
- **Melhoria de acessibilidade** → Aplicar e atualizar color-palette-oklch.md
- **Otimização de performance** → Documentar em comentários inline

---

## 📄 Template de Documentação de Novo Componente

Ao criar um componente reutilizável, documente assim:

```markdown
## ComponentName

### Quando usar
- Contexto 1
- Contexto 2

### Quando evitar
- Situação 1
- Situação 2

### Estrutura

\`\`\`tsx
// Código do componente com comentários
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |

### Variantes

#### Variante 1: Name
- Descrição
- Quando usar

### Acessibilidade
- ARIA labels necessários
- Keyboard navigation
- Screen reader considerations

### Exemplo de Uso

\`\`\`tsx
<ComponentName prop1="value" />
\`\`\`
```

---

## 🎉 Conclusão

Este playbook é um guia vivo. À medida que o blog evolui, este documento também deve evoluir. Sempre documente decisões, justifique mudanças e mantenha a consistência.

**Lembre-se dos princípios:**
1. Legibilidade
2. Hierarquia clara
3. Consistência
4. Acessibilidade
5. Performance

**Happy coding! 🚀**

---

## 📞 Contato e Contribuições

- **Issues**: Reportar bugs ou sugerir melhorias no GitHub
- **Discussões**: Para dúvidas sobre design decisions
- **PRs**: Bem-vindos! Siga o fluxo de trabalho do playbook

**Última atualização**: 2025-01-15
**Versão**: 1.0
**Autor**: Ricardo (com assistência de Claude)
