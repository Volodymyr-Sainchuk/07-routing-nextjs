import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "@/components/NotePreview/NotePreview";

type Props = {
  params: Promise<{ noteId: string }>;
};

export default async function ModalPage({ params }: Props) {
  const { noteId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={noteId} />
    </HydrationBoundary>
  );
}
