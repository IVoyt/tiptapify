import { useImage } from "@tiptapify/composables/Toolbar/Media/useImage";
import { useEmoji } from "@tiptapify/composables/Toolbar/Media/useEmoji";
import { useLink } from "@tiptapify/composables/Toolbar/Media/useLink";
import { useTable } from "@tiptapify/composables/Toolbar/Media/useTable";
import { useVideo } from "@tiptapify/composables/Toolbar/Media/useVideo";

export function useMediaItems() {
  return {
    link: useLink(),
    image: useImage(),
    video: useVideo(),
    emoji: useEmoji(),
    table: useTable()
  }
}