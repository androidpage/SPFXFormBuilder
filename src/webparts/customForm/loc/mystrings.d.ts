declare interface ICustomFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'CustomFormWebPartStrings' {
  const strings: ICustomFormWebPartStrings;
  export = strings;
}
