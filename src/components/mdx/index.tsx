// Export all MDX components for easy importing
export { Callout } from './Callout';
export { Pre } from './Pre';
export { YouTubeEmbed } from './YouTubeEmbed';
export { ImageWithCaption } from './ImageWithCaption';

// Default MDX components configuration
import { Callout } from './Callout';
import { Pre } from './Pre';
import { YouTubeEmbed } from './YouTubeEmbed';
import { ImageWithCaption } from './ImageWithCaption';

export const mdxComponents = {
  Callout,
  Pre,
  pre: Pre,
  YouTubeEmbed,
  ImageWithCaption,
};
