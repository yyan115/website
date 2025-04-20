import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { type Post } from "contentlayer/generated";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <Link href={post.url} className="relative aspect-video overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <CardHeader className="flex flex-col space-y-1.5 p-4">
        <div className="space-y-1">
          <h3 className="font-bold hover:text-primary">
            <Link href={post.url}>{post.title}</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.date)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-muted-foreground">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link
          href={post.url}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
