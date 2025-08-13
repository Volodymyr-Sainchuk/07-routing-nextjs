"use client";
import Link from "next/link";
import css from "./Header.module.css";
import { useRouter, useSearchParams } from "next/navigation";

interface Tag {
  id: string;
  name: string;
}

interface HeaderProps {
  tags: Tag[];
}

export default function Header({ tags }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") || "all";

  function handleSelectTag(tagId: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tagId === "all") {
      params.delete("tag");
    } else {
      params.set("tag", tagId);
    }
    router.push(`/notes/?${params.toString()}`);
  }

  return (
    // <header>
    //   {tags.map((tag) => (
    //     <button
    //       key={tag.id}
    //       onClick={() => handleSelectTag(tag.id)}
    //       style={{
    //         fontWeight: selectedTag === tag.id ? "bold" : "normal",
    //       }}
    //     >
    //       {tag.name}
    //     </button>
    //   ))}
    // </header>
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleSelectTag(tag.id)}
                style={{
                  fontWeight: selectedTag === tag.id ? "bold" : "normal",
                }}
              >
                {tag.name}
              </button>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
}
