import * as mdi from "@mdi/js";
import { Editor } from "@tiptap/vue-3";
import { computed } from "vue";

export function getMediaItems(editor: Editor, toolbarLinkButton: any) {
  return {
    link: {
      name: 'format.link',
      tooltip: 'format.link',
      icon: computed(() => editor.isActive('link') ? mdi.mdiLinkOff : mdi.mdiLink),
      enabled: true,
      props: {
        color: computed(() => editor.isActive('link') ? 'primary' : ''),
        disabled: computed(() => editor.isActive('code') || editor.isActive('codeBlock')),
      },
      attrs: {
        click: computed(() => {
          return editor.isActive('link')
            ? editor.chain().focus().unsetLink().run
            : toolbarLinkButton?.value?.open
        })
      }
    }
  }
}