declare interface ICustomFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  FormNameFieldLabel: string;
  FormDefinitionFieldLabel: string;
}

declare module 'CustomFormWebPartStrings' {
  const strings: ICustomFormWebPartStrings;
  export = strings;
}
