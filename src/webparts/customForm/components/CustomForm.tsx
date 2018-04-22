import * as React from 'react';
import styles from './CustomForm.module.scss';
import { ICustomFormProps } from './ICustomFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

import FormFooter from './renderers/FormFooter/FormFooterRenderer';
import MappedElement from './functions/MappedElement';
import FormTextField from './inputs/FormTextField';
import { IFieldDefinition } from './interfaces/IFieldDefinition';
import { EFieldType } from './interfaces/EFieldType';

export interface ICustomFormState{
  definition: any;
  name: string;
}

export default class CustomForm extends React.Component<ICustomFormProps, ICustomFormState> {

  constructor(props){
    super(props);
    console.log(props.definition)

    this.state = {
      definition: props.definition,
      name: props.name
    }
  }

  public componentWillReceiveProps(nextProps){
    if(this.state.definition !== nextProps.definition || this.state.name !== nextProps.name){
      this.setState({
        definition: nextProps.definition,
        name: nextProps.name
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

    return (
      <div className={ styles.customForm }>
      {
        // If there is no definition display this message
        !_d && ( <p>G'day! This is where your custom form will go - head over to the web part settings to get it set up!</p> )
      }{
        // Form title -- add functionality to change colours/style later 
        this.state.name && (
          <h2>{ this.state.name }</h2>
        )
      }{
        // Fields - iterate over the 'fields' node in the definition and map to supported fields
        _d && _d.fields && (
          _d.fields.map((_field) => <MappedElement definition={ _field } onChange={ this._handleChange } />)
        )
      }{
        ( <FormFooter /> )
      }
      </div>
    );
  }
}
