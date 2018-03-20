import * as React from 'react';
import styles from './CustomForm.module.scss';
import { ICustomFormProps } from './ICustomFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

import MappedElement from './functions/MappedElement';
import FormTextField from './inputs/FormTextField';
import { IFieldDefinition } from './interfaces/IFieldDefinition';
import { EFieldType } from './interfaces/EFieldType';

export default class CustomForm extends React.Component<ICustomFormProps, {definition: any}> {

  constructor(props){
    super(props);
    console.log(props.definition)
    this.state = {
      definition: props.definition
    }
  }

  public componentWillReceiveProps(nextProps){
    if(this.state.definition !== nextProps.definition){
      this.setState({
        definition: nextProps.definition
      });
    }
  }

  private _handleChange(value){
    console.log(value);
  }

  public render(): React.ReactElement<ICustomFormProps> {
    let _d;

    try{
      _d = JSON.parse(this.state.definition);
    }
    catch(e){
      console.log(e);
    }

    let _test: IFieldDefinition = {
      name: "Test",
      label: "Test Input",
      type: EFieldType.textfield,
      required: false,
      tooltip: "Mm, hover over me..."
    }

    return (
      <div className={ styles.customForm }>
        <p>G'day! This is where your custom form will go - head over to the web part settings to get it set up!</p>
        <FormTextField fieldDefinition={ _test } onChanged={ this._handleChange } />
        { _d && _d.fields ? _d.fields.map((_field) => <MappedElement definition={ _field } />) : "" } 
      </div>
    );
  }
}
