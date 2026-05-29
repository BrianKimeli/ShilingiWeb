import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function LegacyBlogPost({ params }: Props) {
  const { slug } = await params;
  redirect(`/times/${slug}`);
}
