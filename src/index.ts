import { Plugin } from 'vue';
import Tiptapify from '@tiptapify/components/Tiptapify.vue';
import { getI18n } from "@tiptapify/i18n";

interface PackageOptions {
  locale?: string;
}

const TiptapifyPlugin: Plugin = {
  install(app, options: PackageOptions = {}) {
    const locale = options.locale || 'en'
    app.use(getI18n(locale));
    app.component('Tiptapify', Tiptapify);
  }
};

export { Tiptapify };
export default TiptapifyPlugin;