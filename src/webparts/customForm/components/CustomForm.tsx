import * as React from 'react';
import * as queryString from 'query-string';
import styles from './CustomForm.module.scss';
import { ICustomFormProps } from './ICustomFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Dialog, DialogType, DialogFooter, IDialogContentStyles } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';


import FormFooter from './renderers/FormFooter/FormFooterRenderer';
import MappedElement from './functions/MappedElement';
import FormTextField from './inputs/FormTextField';
import { IFieldDefinition } from './interfaces/IFieldDefinition';
import { EFieldType } from './interfaces/EFieldType';
import { SListItem } from './services/SListItem.service';

export interface ICustomFormState{
  definition: any;
  name: string;
  loadedFormValues?: any;
  newFormValues: any;
  saveState?: any;
  saveDialogIsHidden: boolean;
  cancelDialogIsHidden: boolean;
}

export default class CustomForm extends React.Component<ICustomFormProps, ICustomFormState>{

  constructor(props){
    super(props);

    this.state = {
      definition: this._parseDefinition(props.definition),
      name: props.name,
      newFormValues: {},
      saveDialogIsHidden: true,
      cancelDialogIsHidden: true
    };
  }

  public componentWillReceiveProps(nextProps){
    if(this.state.definition !== nextProps.definition || this.state.name !== nextProps.name){
      this.setState({
        definition: this._parseDefinition(nextProps.definition),
        name: nextProps.name
      });
    }
  }

  private _parseDefinition(definition){
    let _d;

    try{
      _d = JSON.parse(definition);
    }
    catch(e){
      console.log(e);
      _d = {
        "error": "There is an error with your definition (parse to JSON failed) -- " + e
      };
    }

    return _d;
  }

  @autobind
  private _changeHandler(fieldDefinition, value){
    let _f = this.state.newFormValues || {};
    let _fieldName = fieldDefinition.name;

    _f[_fieldName] = value;

    this.setState({ newFormValues: _f });
  }

  @autobind
  private _saveHandler(){
    let _v = this.state.newFormValues;
    let _erroredFields = Object.keys(_v).filter( key => _v[key] === false ).map((key) => {
      return this.state.definition.fields.find(v => v.name === key);
    });

    // Check if any fields are in an errored state
    if(_erroredFields.length > 0){
      this.setState({
        saveState: {
          error: "The following fields have errors, please resolve these then try again: " + _erroredFields.map(v => v.label).join(", ")
        },
        saveDialogIsHidden: false
      });
    }
    // If not; proceed
    else{
      this._saveListItem(_v);
    }
  }

  @autobind
  private async _saveListItem(formValues){
    let ListItem = new SListItem;

    let _res = await ListItem.save(this.state.definition.destinationList, formValues);
    console.log(_res);
    this.setState({
      saveState: _res,
      saveDialogIsHidden: false
    });
  }

  @autobind
  private _closeDialogs(){
    this.setState({
      saveDialogIsHidden: true,
      cancelDialogIsHidden: true
    });
  }

  @autobind
  private _cancelHandler(){
    this.setState({
      cancelDialogIsHidden: false
    });
  }

  @autobind
  private _redirect(event, url?){
    let _query = queryString.parseUrl(window.location.href);
    if(url){
      window.location.href = url;
    }
    else if(_query.query.Source){
      window.location.href = _query.query.Source;
    }
    else{
      window.location.href = this.context.webAbsoluteUrl || "/";
    }
  }

  public render(): React.ReactElement<ICustomFormProps> {
    let _d = this.state.definition;

    return (
      <div className={ styles.customForm }>
      {
        // If there is no definition display this message
        !_d && ( <p>G'day! This is where your custom form will go - head over to the web part settings to get it set up!</p> )
      }{
        _d.error && (<p>{ _d.error }</p>)
      }{
        // Form title -- add functionality to change colours/style later 
        (this.state.name || _d.title) && (
          <h2>{ this.state.name || _d.title }</h2>
        )
      }{
        // Fields - iterate over the 'fields' node in the definition and map to supported fields
        _d && _d.fields && (
          _d.fields.map((_field) => <MappedElement definition={ _field } onChange={ this._changeHandler } />)
        )
      }{
        !_d.error && ( <FormFooter saveAction={ this._saveHandler } cancelAction={ this._cancelHandler } /> )
      }{
      // Cancel Confirmation Dialog
        <Dialog 
          hidden={ this.state.cancelDialogIsHidden }
          dialogContentProps={{
            type: DialogType.normal,
            title: "Are you sure?",
            subText: "If you close the form now you will lose any unsaved changes.",
            showCloseButton: true
          }}
          isBlocking={ true }
          onDismiss={ this._closeDialogs }
        >
        <DialogFooter>
              <DefaultButton text="Go Back" onClick={ this._closeDialogs } />
              <PrimaryButton text="Close Anyway" onClick={ this._redirect } />
            </DialogFooter>
        </Dialog>
      }{
      // Save Confirmation Dialog
        this.state.saveState && (
          <Dialog 
            hidden={ this.state.saveDialogIsHidden }
            dialogContentProps={{
              type: DialogType.normal,
              title: this.state.saveState.message || "Message",
              subText: this.state.saveState.data || "data",
              showCloseButton: true
            }}
            isBlocking={ true }
            onDismiss={ this._closeDialogs }
          >
            <DialogFooter>
              <PrimaryButton text="Okay" onClick={ this._closeDialogs } />
            </DialogFooter>
          </Dialog>
        )
      }
      </div>
    );
  }
}
