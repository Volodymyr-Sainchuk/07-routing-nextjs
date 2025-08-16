"use client";

import NoteDetailsClient from "@/app/@modal/[id]/NoteDetails.client";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  return <NoteDetailsClient id={id} />;
}
