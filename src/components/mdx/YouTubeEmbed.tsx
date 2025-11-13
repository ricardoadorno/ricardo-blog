interface YouTubeEmbedProps {
  id: string;
  title?: string;
}

export function YouTubeEmbed({ id, title = 'YouTube video' }: YouTubeEmbedProps) {
  return (
    <div className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
