import { Plugin } from 'vue';
import Tiptapify from '@tiptapify/components/Tiptapify.vue';
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue';

interface PackageOptions {
  locale?: string;
}

const TiptapifyPlugin: Plugin = {
  install(app, options: PackageOptions = {}) {
    app.component('Tiptapify', Tiptapify);
    app.component('TiptapifyDialog', TiptapifyDialog);
  }
};

export { Tiptapify, TiptapifyDialog };
export default TiptapifyPlugin;