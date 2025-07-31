import { useImage } from "@tiptapify/composables/Toolbar/Media/useImage";
import { useLink } from "@tiptapify/composables/Toolbar/Media/useLink";
import { useTable } from "@tiptapify/composables/Toolbar/Media/useTable";

export function useMediaItems() {
  return {
    link: useLink(),
    image: useImage(),
    table: useTable()
  }
}