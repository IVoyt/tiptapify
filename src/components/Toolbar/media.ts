import { default as EmojiButton } from "@tiptapify/extensions/components/media/emoji/Button.vue";
import { default as LinkButton } from "@tiptapify/extensions/components/media/link/Button.vue";
import { default as ImageButton } from "@tiptapify/extensions/components/media/image/Button.vue";
import { default as TableButton } from "@tiptapify/extensions/components/media/table/Button.vue";
import { default as VideoButton } from "@tiptapify/extensions/components/media/video/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'media',
    group: true,
    components: [
    {
      name: 'link',
      component: markRaw(LinkButton),
    },
    {
      name: 'image',
      component: markRaw(ImageButton),
    },
    {
      name: 'video',
      component: markRaw(VideoButton),
    },
      {
      name: 'emoji',
      component: markRaw(EmojiButton),
    },
    {
      name: 'table',
      component: markRaw(TableButton),
    }
  ]
}