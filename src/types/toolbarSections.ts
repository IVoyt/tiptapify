export enum ToolbarSectionsEnum {
  actions = 'actions',
  alignment = 'alignment',
  extra = 'extra',
  formatExtra = 'formatExtra',
  format = 'format',
  list = 'list',
  media = 'media',
  misc = 'misc',
  style = 'style',
}

export type sectionComponent = {
  name: string,
  component: any,
  extensions?: Array<any>,
}

export type section = {
  section: string,
  group: boolean,
  components: sectionComponent[],
}

export type toolbarSections = Array<section>