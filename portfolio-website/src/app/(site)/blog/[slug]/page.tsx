import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/content/mdx-components";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
    const slug = params?.slug;
    const post = allPosts.find((p) => p.slug === slug);
  
    if (!post) {
      null;
    }
  
    return post;
  }
  
  export async function generateMetadata({
    params,
  }: PostPageProps): Promise<Metadata> {
    const post = await getPostFromParams(params);
  
    if (!post) {
      return {
        title: "Post Not Found",
        description: "The post you're looking for doesn't exist.",
      };
    }
  
    return {
      title: post.title,
      description: post.description,
    };
  }
  
  export async function generateStaticParams(): Promise<
    PostPageProps["params"][]
  > {
    return allPosts.map((post) => ({
      slug: post.slug,
    }));
  }
  
  export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostFromParams(params);
  
    if (!post) {
      notFound();
    }
  
    return (
      <div className="container max-w-3xl py-10">
        <Button variant="ghost" asChild className="mb-8 flex h-9 items-center rounded-md px-4">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </Button>
        <article>
          <div className="space-y-4">
            <h1 className="inline-block font-heading text-4xl font-bold lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <time dateTime={post.date} className="text-muted-foreground">
                {formatDate(post.date)}
              </time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="mt-8">
            <Mdx code={post.body.code} />
          </div>
        </article>
      </div>
    );
  }