"use client";

// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: { id: string }) {
  return <NoteDetailsClient id={id} />;
}
