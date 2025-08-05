import { default as BulletListButton } from "@tiptapify/extensions/components/list/bullet/Button.vue";
import { default as NumberedListButton } from "@tiptapify/extensions/components/list/numbered/Button.vue";
import { default as TaskListButton } from "@tiptapify/extensions/components/list/task/Button.vue";
import { default as IndentListButton } from "@tiptapify/extensions/components/list/indent/Button.vue";
import { default as OutdentListButton } from "@tiptapify/extensions/components/list/outdent/Button.vue";
import { markRaw } from "vue";

export default {
  section: 'list',
  group: true,
  components: [
    {
      name: 'bulletList',
      component: markRaw(BulletListButton),
    },
    {
      name: 'orderedList',
      component: markRaw(NumberedListButton),
    },
    {
      name: 'taskList',
      component: markRaw(TaskListButton),
    },
    {
      name: 'indent',
      component: markRaw(IndentListButton),
    },
    {
      name: 'outdent',
      component: markRaw(OutdentListButton),
    },
  ]
}