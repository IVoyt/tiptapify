import { default as AiButton } from '@tiptapify/extensions/components/ai/Button.vue'
import { markRaw } from 'vue'

export default {
  section: 'ai',
  group: true,
  components: [
    {
      name: 'ai',
      component: markRaw(AiButton),
    }
  ]
}
