import css from "./SidebarNotes.module.css";

export interface Tag {
  id: string;
  name: string;
}

export interface TagsMenuProps {
  tags: Tag[];
  selectedTag: string;
}

export default function SidebarNotes({ tags }: TagsMenuProps) {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag.id} className={css.menuItem}>
          <a href={`/notes/filter/${tag.name === "All" ? "" : tag.name}`} className={css.menuLink}>
            {tag.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
