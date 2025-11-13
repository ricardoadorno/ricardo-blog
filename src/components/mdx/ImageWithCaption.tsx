import Image from 'next/image';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
}: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
