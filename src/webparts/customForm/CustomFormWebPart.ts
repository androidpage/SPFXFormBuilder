import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton
} from '@microsoft/sp-webpart-base';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';

import * as strings from 'CustomFormWebPartStrings';
import CustomForm from './components/CustomForm';
import { ICustomFormProps } from './components/ICustomFormProps';

export interface ICustomFormWebPartProps {
  formName: string;
  formDefinition: JSON;
}

export default class CustomFormWebPart extends BaseClientSideWebPart<ICustomFormWebPartProps> {

  public render(): void {

    const editor: React.ReactElement<IPanelProps> = React.createElement(
      Panel,
      {
        isOpen: false,
        type: PanelType.large
      }
    )
    const element: React.ReactElement<ICustomFormProps> = React.createElement(
      CustomForm,
      {
        name: this.properties.formName,
        definition: this.properties.formDefinition
      }
    );
    
    const container: React.ReactElement<any> = React.createElement(
      "div",
      {},
      [editor, element]
    )

    ReactDom.render(container, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _openCodeEditor(){
    console.log("Clicked");
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
                }),
                PropertyPaneButton('openCodeEditor', {
                  text: "Open Code Editor",
                  onClick: this._openCodeEditor
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
