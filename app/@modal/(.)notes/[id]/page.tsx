"use client";

import { usePathname } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function ModalPage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  return <NotePreview id={id} />;
}
