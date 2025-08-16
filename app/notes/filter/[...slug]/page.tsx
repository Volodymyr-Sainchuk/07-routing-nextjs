import { Suspense } from "react";
import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "@/app/notes/filter/[...slug]/Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const slug = (await params).slug || [];
  const tag = slug.length > 0 ? slug[0] : "All";

  const queryClient = new QueryClient();

  const queryTag = tag === "All" ? undefined : tag;

  const data = await fetchNotes({ query: "", page: 1, perPage: 12, tag: queryTag });

  const cacheTagKey = tag === "All" ? "" : tag;
  queryClient.setQueryData(["notes", "", 1, cacheTagKey], data);

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes initialData={data} initialTag={tag} />
      </HydrationBoundary>
    </Suspense>
  );
}
