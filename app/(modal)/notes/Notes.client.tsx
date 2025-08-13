"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import css from "../page.module.css";
import { useSearchParams } from "next/navigation";

type Props = {
  initialData: FetchNotesResponse;
};

export default function Notes({ initialData }: Props) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedTag = searchParams.get("tag") || "all";

  const isInitial = debouncedSearchTerm.trim() === "" && currentPage === 1;

  const { data, isPending } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debouncedSearchTerm, currentPage, selectedTag],
    queryFn: () => fetchNotes({ query: debouncedSearchTerm, page: currentPage, perPage: 12, tag: selectedTag }),
    initialData: isInitial ? initialData : undefined,
    placeholderData: (prev) => prev,
  });
  console.log("🚀 ~ Notes ~ data:", data);

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
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} currentTag={selectedTag} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
