# Documentação do Design System do Blog

Bem-vindo à documentação completa do design system do ricardo-blog! Este conjunto de documentos fornece guidelines, padrões e fluxos de trabalho para criar e manter uma interface consistente, acessível e de alta qualidade.

## 📖 Documentos Principais

### 🎯 [Blog UI Playbook](blog-ui-playbook.md) **← COMECE AQUI**

**O documento mestre** que reúne tudo. Contém:
- Fluxo de trabalho padrão (3 etapas)
- Checklist completo de revisão
- Processo de evolução contínua
- Referência rápida a todos os guidelines

**Use quando**: Criar qualquer componente, revisar código, ou ter dúvida sobre processo.

---

## 🏗️ Fundamentos do Sistema

### 1. [Hierarquia Visual](hierarchy-guideline.md)

Define os níveis de importância visual e tokens de tipografia.

**Conteúdo:**
- Mapeamento de tipos de página (Home, Blog, Post, etc.)
- Tokens de hierarquia (display-hero, heading-page, body, meta, etc.)
- Boas práticas de hierarquia visual
- Exemplos antes/depois

**Use quando**: Definir tamanhos de texto, organizar informação visualmente.

---

### 2. [Layout e Grid System](layout-grid-system.md)

Sistema de grid, colunas e ritmo vertical.

**Conteúdo:**
- Breakpoints e containers
- Grid para listagem de posts (1/2/3 colunas)
- Largura de conteúdo de artigo (max-w-3xl)
- Ritmo vertical (espaçamentos múltiplos de 4px)
- Layout specs por tipo de página

**Use quando**: Definir layouts de página, espaçamentos entre elementos.

---

### 3. [Paleta de Cores OKLCH](color-palette-oklch.md)

Paleta refinada com OKLCH para melhor contraste e acessibilidade.

**Conteúdo:**
- Introdução ao OKLCH
- Auditoria da paleta atual
- Paleta refinada (light + dark themes)
- Pares aprovados de cor/fundo (WCAG AA/AAA)
- Ferramentas e conversões RGB → OKLCH

**Use quando**: Escolher cores, validar contraste, implementar dark mode.

---

## 🎨 Variações e Estilos

### 4. [Variações de Tema](theme-variations.md)

Três temas completos prontos para uso.

**Conteúdo:**
- **Editorial**: Elegante, serif + sans, foco em legibilidade
- **Minimalista**: Clean, monocromático, muito espaço em branco
- **Brutalista**: Ousado, monospace, cores vibrantes

Cada tema inclui: paleta, tipografia, border radius, exemplos de componentes.

**Use quando**: Explorar diferentes estilos visuais, escolher direção de design.

---

### 5. [Tipografia Editorial](editorial-typography.md)

Escala tipográfica e estilos para conteúdo longform.

**Conteúdo:**
- Escala tipográfica (Major Third 1.25)
- Line heights otimizados para leitura
- Measure (largura de linha ideal: 65-75ch)
- Espaçamento vertical em artigos
- Estilos específicos: lead paragraph, pull quote, aside, code blocks, listas

**Use quando**: Estilizar artigos, ajustar legibilidade, criar componentes de conteúdo.

---

## 🧩 Componentes e Interações

### 6. [Padrões de Componentes](component-patterns.md)

Biblioteca de padrões específicos do blog.

**Conteúdo:**
- 10 padrões principais:
  1. Card de Post (regular)
  2. Card de Post (featured)
  3. Lista Compacta de Posts
  4. Banner de Newsletter
  5. Callout
  6. Code Block com Copy Button
  7. Table of Contents
  8. Search Bar
  9. Tag Cloud
  10. Breadcrumbs

Cada padrão inclui: quando usar, quando evitar, código completo, variantes.

**Use quando**: Criar componentes do blog, buscar padrões reutilizáveis.

---

### 7. [Microinterações](microinteractions.md)

Sistema de animações e feedback visual.

**Conteúdo:**
- Princípios de microinterações
- Tokens de animação (duração, easing, transformações)
- Kit de classes utilitárias
- 10 momentos chave:
  1. Hover em card
  2. Click em botão
  3. Navegação entre posts
  4. Mudança de tema
  5. Busca/digitação
  6. Copy code button
  7. Newsletter subscribe
  8. Scroll progress
  9. Table of contents active
  10. Link hover

**Use quando**: Adicionar animações, definir transições, criar feedback visual.

---

## 🎯 Ordem de Leitura Recomendada

### Para Iniciantes

1. **[Blog UI Playbook](blog-ui-playbook.md)** - Visão geral e fluxo de trabalho
2. **[Hierarquia Visual](hierarchy-guideline.md)** - Fundamentos de organização
3. **[Padrões de Componentes](component-patterns.md)** - Componentes prontos

### Para Aprofundar

4. **[Layout e Grid](layout-grid-system.md)** - Sistema de layout
5. **[Paleta OKLCH](color-palette-oklch.md)** - Cores e acessibilidade
6. **[Tipografia Editorial](editorial-typography.md)** - Tipografia de conteúdo

### Para Personalizar

7. **[Variações de Tema](theme-variations.md)** - Explorar estilos
8. **[Microinterações](microinteractions.md)** - Refinamento de UX

---

## 🚀 Quick Start

### Cenário 1: Criar um Card de Post

```tsx
// 1. Consultar component-patterns.md → "Card de Post (Regular)"
// 2. Copiar código base
// 3. Ajustar conforme necessário
// 4. Revisar com checklist do playbook

import { BlogCard } from '@/components/blog/BlogCard';

<BlogCard post={post} />
```

### Cenário 2: Melhorar Contraste de Cor

```bash
# 1. Consultar color-palette-oklch.md → "Pares Aprovados"
# 2. Verificar contraste atual com WebAIM Contrast Checker
# 3. Ajustar lightness no OKLCH até atingir AA (4.5:1) ou AAA (7:1)
# 4. Atualizar globals.css
```

### Cenário 3: Ajustar Hierarquia de Página

```bash
# 1. Consultar hierarchy-guideline.md → "Tokens de Hierarquia"
# 2. Mapear elementos atuais → níveis 1-10
# 3. Aplicar classes corretas (text-xl, text-muted-foreground, etc.)
# 4. Revisar ritmo vertical (layout-grid-system.md)
```

---

## 📊 Estrutura da Documentação

```
docs/
├── README.md                     ← Você está aqui
├── blog-ui-playbook.md          ← Documento mestre
├── hierarchy-guideline.md       ← Hierarquia visual
├── layout-grid-system.md        ← Layout e grid
├── color-palette-oklch.md       ← Cores e contraste
├── theme-variations.md          ← Temas (editorial/minimal/brutal)
├── component-patterns.md        ← Padrões de componentes
├── microinteractions.md         ← Animações e feedback
└── editorial-typography.md      ← Tipografia de conteúdo
```

---

## 🔗 Links Úteis

### Ferramentas
- [OKLCH Color Picker](https://oklch.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Realtime Colors](https://www.realtimecolors.com/)
- [Type Scale](https://typescale.com/)

### Referências
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Practical Typography](https://practicaltypography.com/)

### Inspiração
- [Medium](https://medium.com/) - Tipografia editorial
- [Linear](https://linear.app/) - Design minimalista
- [Vercel](https://vercel.com/) - Design system moderno

---

## 🎓 Como Contribuir

Se você:
- Encontrar inconsistência → Abrir issue no GitHub
- Criar novo padrão reutilizável → Adicionar a `component-patterns.md`
- Melhorar acessibilidade → Atualizar `color-palette-oklch.md`
- Otimizar performance → Documentar inline nos componentes

**Sempre siga o fluxo de trabalho do [Blog UI Playbook](blog-ui-playbook.md)!**

---

## 📝 Changelog

### v1.0 (2025-01-15)
- ✅ Criação inicial de toda a documentação
- ✅ 8 documentos completos
- ✅ Playbook com fluxo de trabalho
- ✅ Padrões de 10 componentes principais
- ✅ Sistema completo de hierarquia, layout, cores e tipografia

---

## 📞 Contato

**Autor**: Ricardo
**Email**: [seu email]
**GitHub**: [seu username]

---

**Happy designing! 🎨✨**
