// Export all MDX components for easy importing
export { Callout } from './Callout';
export { Pre } from './Pre';
export { YouTubeEmbed } from './YouTubeEmbed';
export { ImageWithCaption } from './ImageWithCaption';
export { CodeGroup } from './CodeGroup';
export { ImageGallery } from './ImageGallery';
export { Quote } from './Quote';
export { PullQuote } from './PullQuote';
export { Aside } from './Aside';

// Default MDX components configuration
import { Callout } from './Callout';
import { Pre } from './Pre';
import { YouTubeEmbed } from './YouTubeEmbed';
import { ImageWithCaption } from './ImageWithCaption';
import { CodeGroup } from './CodeGroup';
import { ImageGallery } from './ImageGallery';
import { Quote } from './Quote';
import { PullQuote } from './PullQuote';
import { Aside } from './Aside';

export const mdxComponents = {
  Callout,
  Pre,
  pre: Pre,
  YouTubeEmbed,
  ImageWithCaption,
  CodeGroup,
  ImageGallery,
  Quote,
  PullQuote,
  Aside,
  blockquote: Quote,
};
