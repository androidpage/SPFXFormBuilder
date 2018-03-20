import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CustomFormWebPartStrings';
import CustomForm from './components/CustomForm';
import { ICustomFormProps } from './components/ICustomFormProps';

export interface ICustomFormWebPartProps {
  formName: string;
  formDefinition: JSON;
}

export default class CustomFormWebPart extends BaseClientSideWebPart<ICustomFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomFormProps> = React.createElement(
      CustomForm,
      {
        name: this.properties.formName,
        definition: this.properties.formDefinition
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('formName', {
                  label: strings.FormNameFieldLabel
                }),
                PropertyPaneTextField('formDefinition', {
                  label: strings.FormDefinitionFieldLabel,
                  multiline: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
