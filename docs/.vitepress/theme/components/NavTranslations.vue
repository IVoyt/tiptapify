<script setup>
/*
 * The language menu of VitePress (VPNavTranslations, swapped in by an alias in the config) with one change: it
 * lists every language in one order, the current one in its place and highlighted, instead of putting the
 * current one on top and leaving it out of the list.
 */
import { computed, ref, useId } from "vue";
import { useRoute } from "vitepress";
import { useData } from "vitepress/dist/client/theme-default/composables/data.js";
import { resolveLocaleLink, useLangs } from "vitepress/dist/client/theme-default/composables/langs.js";
import { useNavOverflow } from "vitepress/dist/client/theme-default/composables/nav-overflow.js";
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";
import VPMenuLink from "vitepress/dist/client/theme-default/components/VPMenuLink.vue";
const props = defineProps({
	screen: {
		type: Boolean,
		required: false
	},
	menu: {
		type: Boolean,
		required: false
	}
});
const data = useData();
const { theme, site, localeIndex } = data;
const route = useRoute();
const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });

// Every language in the order of the config; the current one links to this very page
const languages = computed(() => Object.entries(site.value.locales).map(([key, value]) => {
	if (key !== localeIndex.value) {
		return localeLinks.value.find((locale) => locale.text === value.label);
	}

	return {
		text: value.label,
		link: resolveLocaleLink(data, route, {
			targetLocale: key,
			targetLocaleLink: currentLang.value.link,
			currentLocaleLink: currentLang.value.link,
			linkToCorrespondingPage: true
		}),
		lang: value.lang,
		dir: value.dir,
		current: true
	};
}).filter(Boolean));
const show = computed(() => !!(localeLinks.value.length && currentLang.value.label));
// only the inline bar flyout participates in the overflow engine
const overflow = props.screen || props.menu ? null : useNavOverflow();
const isCollapsed = computed(() => !!overflow && !overflow.state.translations);
const isOpen = ref(false);
const listId = useId();
function toggle() {
	isOpen.value = !isOpen.value;
}
const localeProps = (locale) => ({
	lang: locale.lang,
	hreflang: locale.lang,
	rel: "alternate",
	dir: locale.dir,
	"data-allow-mismatch": "attribute"
});
</script>

<template>
  <!-- accordion inside the nav screen -->
  <div
    v-if="screen && show"
    class="VPNavTranslations VPNavScreenTranslations"
    :class="{ open: isOpen }"
  >
    <button
      type="button"
      class="title"
      :aria-expanded="isOpen"
      :aria-controls="listId"
      @click="toggle"
    >
      <span class="vpi-languages icon lang" aria-hidden="true" />
      {{ currentLang.label }}
      <span class="vpi-chevron-down icon chevron" aria-hidden="true" />
    </button>

    <ul v-show="isOpen" :id="listId" class="list">
      <li v-for="locale in languages" :key="locale.link" class="item">
        <VPLink
          class="link"
          :class="{ current: locale.current }"
          :aria-current="locale.current ? 'page' : undefined"
          :href="locale.link"
          :external="false"
          v-bind="localeProps(locale)"
        >
          {{ locale.text }}
        </VPLink>
      </li>
    </ul>
  </div>

  <!-- titled group inside the `⋯` menu -->
  <div v-else-if="menu && show" class="VPNavTranslations group translations">
    <p class="title">{{ theme.langMenuLabel || 'Change language' }}</p>

    <ul>
      <template v-for="locale in languages" :key="locale.link">
        <VPMenuLink :item="locale" :external="false" v-bind="localeProps(locale)" />
      </template>
    </ul>
  </div>

  <!-- inline flyout in the navbar -->
  <VPFlyout
    v-else-if="!menu && show"
    class="VPNavTranslations VPNavBarTranslations"
    :class="{ collapsed: isCollapsed }"
    icon="vpi-languages"
    :label="theme.langMenuLabel || 'Change language'"
    :ref="(inst) => overflow?.setClusterEl('translations', inst?.$el ?? null)"
  >
    <ul class="items">
      <template v-for="locale in languages" :key="locale.link">
        <VPMenuLink :item="locale" :external="false" v-bind="localeProps(locale)" />
      </template>
    </ul>
  </VPFlyout>
</template>

<style scoped>
/* flyout variant */
.VPNavBarTranslations {
  display: none;
}

@media (min-width: 48rem) {
  .VPNavBarTranslations {
    display: flex;
    align-items: center;
  }
}

.VPNavBarTranslations .title {
  padding: 0 1.5rem 0 0.75rem;
  line-height: 2.2857143;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* menu-group variant (inside the `⋯` menu) — matches the menu group
   titles */
.group > .title {
  padding: 0 0.75rem;
  line-height: 2.2857143;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

/* accordion variant (inside the nav screen) */
.VPNavScreenTranslations .title {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.VPNavScreenTranslations .icon {
  font-size: 1rem;
}

.VPNavScreenTranslations .icon.lang {
  margin-right: 0.5rem;
}

.VPNavScreenTranslations .icon.chevron {
  margin-left: 0.25rem;
  transition: transform 0.25s;
}

.VPNavScreenTranslations.open .icon.chevron {
  transform: rotate(180deg);
}

.VPNavScreenTranslations .list {
  padding: 0.25rem 0 0 1.5rem;
}

.VPNavScreenTranslations .link {
  line-height: 2.4615385;
  font-size: 0.8125rem;
  color: var(--vp-c-text-1);
}

.VPNavScreenTranslations .link.current {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
