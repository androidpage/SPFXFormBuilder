import * as React from 'react';
import styles from './InitForm.module.scss';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { SList } from './services/SList.service';
import { SPFieldTypeKindMap } from './maps/SPFieldTypeKind.map';

export interface IInitFormProps{
    name: string;
    definition: string;
}
export interface IInitFormState extends IInitFormProps{
    listExists?: boolean;
}

export default class InitForm extends React.Component<IInitFormProps, IInitFormState>{
    constructor(props){
        super(props);
        this.state = props;
    }

    public async componentDidMount(){
        let _d = JSON.parse(this.state.definition);
        let _exists = this._checkListExists(_d.destinationList);
        
        if(_exists){
            let _fields = _d.fields.map((field) => {
                return this._checkListFieldExists(_d.destinationList, field);
            });

            let _p = await Promise.all(_fields);
            _d.fields = _p;

            this.setState({
                definition: JSON.stringify(_d)
            });
        }
    }

    @autobind
    private async _checkListExists(listName){
        let List = new SList;
        let _res = await List.exists(listName);

        this.setState({
            listExists: _res.message === "Success"
        });

        return _res.message === "Success";
    }

    private async _checkListFieldExists(listName, field){
        let List = new SList;
        let _field = field;
        let _res = await List.fieldExists(listName, field.name);
        _field["exists"] = _res.message === "Success";
        _field["serverType"] = _res.message === "Success" ? _res.data.FieldTypeKind + " (" + _res.data.TypeDisplayName + " )" : "N/A"
        _field["typeMismatch"] = _res.message === "Success" ? this._checkTypeMismatch(_field, _res.data.FieldTypeKind) : false
        return _field
    }

    private _checkTypeMismatch(field, fieldTypeKind){
        let _map = (new SPFieldTypeKindMap).mapToInternal(fieldTypeKind);
        let _field = field;
        let _res = _map ? Object.keys(_map).map((key) => {
            let _serverField = _map[key];
            let _templateField = field[key];
            let _mismatch = Array.isArray(_serverField) ? _serverField.indexOf(_templateField) >= 0 : _serverField == _templateField;
            return _templateField !== null && _templateField !== undefined ? _mismatch : true;
        }).filter(v => v === false) : []

        return _res.length > 0;
    }

    private async _createList(listName, event){
        let List = new SList;

        let _res = await List.ensureList(listName);

        console.log(_res);
    }

    private async _createFields(listName, fields, event){
        let List = new SList
        let Map = new SPFieldTypeKindMap
        
        let _newFields = fields.map((field) => {
            return Map.mapToXML(field); 
        });
        console.log(_newFields);
        let _newFieldPromises = _newFields.map((fieldXml) => {
            return List.addFieldFromXml(listName, fieldXml);
        });

        let _res = await Promise.all(_newFieldPromises);

        console.log(_res);
    }

    public render(): React.ReactElement<IInitFormProps>{
        let _d = JSON.parse(this.state.definition);
        return(
            <div>
                <h2>Form Initialisation</h2>
                <p>Please only use this if you are a sharepoint admin. If you believe you're seeing this incorrectly please contact your IT.</p>
                <p style={{ fontWeight: "bold", color: this.state.listExists ? "green" : "red" }}>List { _d.destinationList } exists: { this.state.listExists ? "Yes" : "No" }</p>
                {
                    !this.state.listExists && (
                        <DefaultButton text="Create List" style={{ margin: "10px 0" }} onClick={ this._createList.bind(this, _d.destinationList) }/>
                    )
                }
                <table className={ styles.initTable }>
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Exists</th>
                            <th>Server Type</th>
                        </tr>
                        {
                            _d.fields && _d.fields.map((field) => {
                                return(
                                    <tr>
                                        <td>{ field.name }</td>
                                        <td>{ field.type + (field.multi ? " (Multi)" : "")}</td>
                                        <td style={{ backgroundColor: field.exists ? "Green" : "Red", color: "white", fontWeight: "bold" }}>{ field.exists ? "Yes" : "No" }</td>
                                        <td style={{ backgroundColor: field.typeMismatch ? "Red" : "none", color: field.typeMismatch ? "white" : "black" }}>{ field.serverType }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    {
                        _d.fields.filter(f => !f.exists).length > 0 && (
                            <tfoot>
                                <tr>
                                    <td colSpan={ 4 }>
                                        <DefaultButton text="Create All Fields" style={{ float: "right" }} onClick={ this._createFields.bind(this, _d.destinationList, _d.fields.filter(f => !f.exists)) }/>
                                    </td>
                                </tr>
                            </tfoot>
                        )
                    }
                </table>
            </div>
        )
    }
}