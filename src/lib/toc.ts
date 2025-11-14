/**
 * Table of Contents Utilities
 * Extrai headings (H2, H3) do conteúdo MDX para criar TOC
 */

export interface TOCHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extrai headings do conteúdo markdown/MDX
 * Processa H2 e H3 para criar estrutura de TOC
 */
export function extractHeadings(content: string): TOCHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCHeading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2]
      .trim()
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1') // bold
      .replace(/\*(.*?)\*/g, '$1')     // italic
      .replace(/`(.*?)`/g, '$1')       // inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // links

    // Gera ID único e URL-safe
    const id = generateHeadingId(text);

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Gera ID único para heading (slug format)
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-')     // Espaços viram hífens
    .replace(/--+/g, '-')     // Remove hífens duplos
    .replace(/^-|-$/g, '');   // Remove hífens no início/fim
}

/**
 * Calcula tempo de leitura baseado em palavras
 * @param content Conteúdo do post
 * @param wordsPerMinute Velocidade de leitura (padrão: 200)
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  // Remove code blocks e outros elementos não-texto
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '')        // Remove inline code
    .replace(/<[^>]*>/g, '')        // Remove HTML tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Links -> só texto

  // Conta palavras
  const words = cleanContent
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Calcula minutos (mínimo 1)
  const minutes = Math.ceil(words / wordsPerMinute);

  return Math.max(1, minutes);
}

/**
 * Agrupa headings por seções (H2 com seus H3)
 */
export function groupHeadingsBySection(headings: TOCHeading[]) {
  const sections: Array<{
    heading: TOCHeading;
    subheadings: TOCHeading[];
  }> = [];

  let currentSection: typeof sections[0] | null = null;

  headings.forEach(heading => {
    if (heading.level === 2) {
      currentSection = { heading, subheadings: [] };
      sections.push(currentSection);
    } else if (heading.level === 3 && currentSection) {
      currentSection.subheadings.push(heading);
    }
  });

  return sections;
}
