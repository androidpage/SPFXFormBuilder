import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { update } from '@microsoft/sp-lodash-subset';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneLabel,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import AceEditor,{ EditorProps } from 'react-ace';
import pnp from 'sp-pnp-js';

import * as strings from 'CustomFormWebPartStrings';
import CustomForm from './components/CustomForm';
import { ICustomFormProps } from './components/ICustomFormProps';
import InitForm from './components/InitForm';

// require the below for Ace Editor
require(`brace/theme/monokai`);
require(`brace/mode/json`);
require(`brace/snippets/json`);

export interface ICustomFormWebPartProps {
  formName: string;
  formDefinition: JSON;
  editorIsOpen: boolean;
  initIsOpen: boolean;
}

export default class CustomFormWebPart extends BaseClientSideWebPart<ICustomFormWebPartProps> {

  protected onInit(){
    return super.onInit().then(() => {
      console.log(this.context);
        pnp.setup({
            sp: {
                baseUrl: this.context.pageContext.web.absoluteUrl
            }
        });
    });
  }

  public render(): void {
    const editor: React.ReactElement<IPanelProps> = React.createElement(
      Modal,
      {
        isOpen: this.properties.editorIsOpen,
        onDismiss: this._closeModal.bind(this, "editorIsOpen"),
        isBlocking: true
      },
      [React.createElement(
        AceEditor,
        {
          mode: "json",
          theme: "monokai",
          name: "custom-form-editor",
          onChange: this._saveCodeEditor.bind(this),
          value: this.properties.formDefinition ? this.properties.formDefinition.toString() : "",
          width: "1200px",
          height: "800px",
          showPrintMargin: false
        }
      ),React.createElement(
        PrimaryButton,
        {
          text: "Close",
          onClick: this._closeModal.bind(this, "editorIsOpen"),
          style:{
            float: "right",
            margin: "10px"
          }
        }
      )]
    )
    console.log(this.properties.initIsOpen);
    const element: React.ReactElement<ICustomFormProps> = React.createElement(
      this.properties.initIsOpen ? InitForm : CustomForm,
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

  public _openModal(modal){
    update(this.properties, modal, () => { return true });
    this.render();
  }
  
  public _closeModal(modal){
    update(this.properties, modal, () => { return false });
    this.render();
  }

  private _saveCodeEditor(newValue){
    update(this.properties, "formDefinition", () => { return newValue });
    //this.render();
  }

  public onPropertyPaneConfigurationComplete(){
    // turn init mode off again when property pane is closed
    update(this.properties, "initIsOpen", () => { return false });
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
                PropertyPaneButton('openCodeEditor', {
                  text: "Edit Form Definition",
                  onClick: this._openModal.bind(this, "editorIsOpen")
                }),
                PropertyPaneToggle('initIsOpen', {
                  key: "initIsOpen",
                  label: "Initialisation Mode"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
