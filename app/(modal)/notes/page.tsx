import { Suspense } from "react";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";

export default async function NotesPage() {
  const initialData = await fetchNotes({ query: "", page: 1, perPage: 12 });

  return (
    <Suspense fallback={<>Loading...</>}>
      <Notes initialData={initialData} />
    </Suspense>
  );
}
