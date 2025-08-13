import dynamic from "next/dynamic";

const NotePreview = dynamic(() => import("@/components/NotePreview/NotePreview"), {
  ssr: false,
});

export default function ModalPage({ params }: { params: { slug: string[] } }) {
  const id = params.slug[params.slug.length - 1];
  return <NotePreview id={id} />;
}
