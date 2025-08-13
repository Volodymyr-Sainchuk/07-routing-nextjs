"use client";

import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import css from "./layout.module.css";

enum Tags {
  All = "All",
  Work = "Work",
  Personal = "Personal",
  Todo = "Todo",
  Meeting = "Meeting",
  Shopping = "Shopping",
}

const tags = [
  { id: Tags.All, name: "All" },
  { id: Tags.Work, name: "Work" },
  { id: Tags.Personal, name: "Personal" },
  { id: Tags.Todo, name: "Todo" },
  { id: Tags.Meeting, name: "Meeting" },
  { id: Tags.Shopping, name: "Shopping" },
];

export default function NotesFilterLayout({ children }: { children: ReactNode }) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <Header tags={tags} />
      </aside>
      <main className={css.mainContent}>{children}</main>
    </div>
  );
}
