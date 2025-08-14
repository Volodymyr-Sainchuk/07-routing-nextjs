"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import css from "@/app/page.module.css";

type Props = {
  initialData: FetchNotesResponse;
  initialTag?: string;
};

export default function Notes({ initialData, initialTag }: Props) {
  const params = useParams();
  const tagFromUrl = params.slug?.[0] || initialTag || "All";

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isPending } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", tagFromUrl, debouncedSearchTerm, currentPage],
    queryFn: () =>
      fetchNotes({
        query: debouncedSearchTerm,
        page: currentPage,
        perPage: 12,
        tag: tagFromUrl !== "All" ? tagFromUrl : undefined,
      }),
    placeholderData: initialData,
    refetchOnMount: false,
  });

  const handleSearch = (newValue: string) => {
    setSearchTerm(newValue);
    setCurrentPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination total={data.totalPages} page={currentPage} onChange={setCurrentPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isPending && <p>Завантаження...</p>}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} currentTag={tagFromUrl} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
