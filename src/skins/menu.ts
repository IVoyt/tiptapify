/*
 * The shared `content-class` of the four tiptapify menus (heading, align,
 * bullet, list-styles): the base class plus the soft menu carrier, which
 * anchors the soft menu rules in src/skins/menu.css through the SkinScope
 * wrapper. Driven by the menu shape flag (`shape.menu === 'soft'`), not the
 * skin name: a custom skin extending pastel keeps the carrier.
 */
export function menuContentClass(menuSoft: boolean): string {
  return menuSoft ? 'tiptapify-menu tiptapify-menu--soft' : 'tiptapify-menu'
}
