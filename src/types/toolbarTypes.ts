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
  props?: { [key: string]: any }
}

export type section = {
  section: string,
  group: boolean,
  components: sectionComponent[],
  extensions?: Array<any>,
}

export type toolbarSections = Array<section>

export type itemsPropType = { [key: string]: Array<string> } | Array<string>