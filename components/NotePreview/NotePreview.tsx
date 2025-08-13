"use client";

import NoteDetailsClient from "@/app/(modal)/notes/[id]/NoteDetails.client";

export interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  return <NoteDetailsClient id={id} />;
}
