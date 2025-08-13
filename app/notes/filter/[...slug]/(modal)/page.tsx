import NotePreview from "@/components/NotePreview/NotePreview";

// type Props = {
//   params: { id: string };
// };

export default function ModalPage({ params }: { params: { slug: string[] } }) {
  const id = params.slug[params.slug.length - 1];

  return <NotePreview id={id} />;
}
