import { useImage } from "@tiptapify/composables/Toolbar/Media/useImage";
import { useEmoji } from "@tiptapify/composables/Toolbar/Media/useEmoji";
import { useLink } from "@tiptapify/composables/Toolbar/Media/useLink";
import { useTable } from "@tiptapify/composables/Toolbar/Media/useTable";

export function useMediaItems() {
  return {
    link: useLink(),
    image: useImage(),
    emoji: useEmoji(),
    table: useTable()
  }
}