import Link from "next/link";

export default function NewsletterLink() {
  return (
    <Link
      href="/newsletter"
      prefetch={false}
      className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
    >
      Read the newsletter
    </Link>
  );
}
