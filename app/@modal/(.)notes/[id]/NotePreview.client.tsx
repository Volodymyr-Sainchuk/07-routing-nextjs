"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка при завантаженні нотатки</p>}
      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      )}
    </Modal>
  );
}
