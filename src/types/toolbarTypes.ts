import { Component } from 'vue'

export enum ToolbarSectionsEnum {
  actions = 'actions',
  ai = 'ai',
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
  component: Component,
  props?: { [key: string]: any }
}

export type section = {
  section: string,
  group: boolean,
  components: sectionComponent[],
  extensions?: Array<any>,
}

export type toolbarSections = Array<section>

export type itemsPropType = { [key: string]: string[] } | string[]
