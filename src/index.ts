import { Plugin } from 'vue';
import Tiptapify from '@tiptapify/components/Tiptapify.vue';
import TiptapifyDialog from '@tiptapify/components/UI/TiptapifyDialog.vue';
import { getI18n } from "@tiptapify/i18n";

interface PackageOptions {
  locale?: string;
}

const TiptapifyPlugin: Plugin = {
  install(app, options: PackageOptions = {}) {
    const locale = options.locale || 'en'
    app.use(getI18n(locale));
    app.component('Tiptapify', Tiptapify);
    app.component('TiptapifyDialog', TiptapifyDialog);
  }
};

export { Tiptapify, TiptapifyDialog };
export default TiptapifyPlugin;