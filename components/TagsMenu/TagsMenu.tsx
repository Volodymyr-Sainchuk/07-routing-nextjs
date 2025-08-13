"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";

export interface Tag {
  id: string;
  name: string;
}

export interface TagsMenuProps {
  tags: Tag[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export default function TagsMenu({ tags, selectedTag, onSelectTag }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelect = (tagName: string) => {
    onSelectTag(tagName);
    setIsOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾ ({selectedTag})
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <button className={css.menuLink} onClick={() => handleSelect("All")} type="button">
              All notes
            </button>
          </li>
          {tags.map((tag) => (
            <li key={tag.id} className={css.menuItem}>
              <button className={css.menuLink} onClick={() => handleSelect(tag.name)} type="button">
                {tag.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
