export enum OverridableExtensions {
  link = 'link',
  image = 'image',
}

export interface extensionsComponents { [key: string]: { component: any, props?: any} }