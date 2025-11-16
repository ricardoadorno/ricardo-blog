export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  category?: string;
}

export interface PostData extends PostMeta {
  content: React.ReactElement;
}
