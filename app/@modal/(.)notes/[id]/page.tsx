"use client";

import NotePreview from "@/components/NotePreview/NotePreview";

export default function ModalPage({ params }: { params: { slug: string[] } }) {
  const id = params.slug[params.slug.length - 1];
  return <NotePreview id={id} />;
}
