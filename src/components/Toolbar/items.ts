import actions from "@tiptapify/components/Toolbar/actions";
import alignment from "@tiptapify/components/Toolbar/alignment";
import format from "@tiptapify/components/Toolbar/format";
import formatExtra from "@tiptapify/components/Toolbar/formatExtra";
import style from "@tiptapify/components/Toolbar/style";
import list from "@tiptapify/components/Toolbar/list";
import media from "@tiptapify/components/Toolbar/media";
import misc from "@tiptapify/components/Toolbar/misc";

const items = {
  style,
  format,
  formatExtra,
  media,
  alignment,
  list,
  actions,
  misc,
}

const availableItems: { [key: string]: string } = {}
for (const item of Object.values(items)) {
  const itemComponents = item.components
  for (const component of itemComponents) {
    availableItems[component.name] = item.section
  }
}

export default items

export { availableItems }
