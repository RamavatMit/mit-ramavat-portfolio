"use client";

import { createContext, useContext } from "react";

export type BookApi = {
  goTo: (pageId: string) => void;
  next: () => void;
  prev: () => void;
};

export const BookContext = createContext<BookApi | null>(null);

export function useBook() {
  return useContext(BookContext);
}

/** True while the page that contains the caller is face-up and readable. Null outside the book. */
export const PageVisibleContext = createContext<boolean | null>(null);

export function usePageVisible() {
  const v = useContext(PageVisibleContext);
  return v ?? true;
}
