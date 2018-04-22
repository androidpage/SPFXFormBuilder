import * as React from 'react';
import styles from './InitForm.module.scss';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import { SList } from './services/SList.service';

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

    public componentWillReceiveProps(nextProps) {
        let _d = JSON.parse(nextProps.definition);
        this._checkListExists(_d.destinationList);
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
        console.log(_res);
        return _field
    }

    public render(): React.ReactElement<IInitFormProps>{
        let _d = JSON.parse(this.state.definition);
        return(
            <div>
                <h2>Form Initialisation</h2>
                <p style={{ fontWeight: "bold", color: this.state.listExists ? "green" : "red" }}>List { _d.destinationList } exists: { this.state.listExists ? "Yes" : "No" }</p>
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
                                        <td>{ field.serverType }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}