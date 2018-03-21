import * as React from 'react'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

import { IFieldDefinition } from '../interfaces/IFieldDefinition';

export interface IFormChoiceGroupProps{
    fieldDefinition: IFieldDefinition;
    errorMessage?: string;
    value?: string;
    onChanged: any;
}

export interface IFormChoiceGroupState{
    disabled: boolean;
    errorMessage?: string;
    label: string;
    name: string;
    options: any;
    placeHolder: string;
    ref: string;
    required: boolean;
    value: string;
    onChanged?: any;
    onRenderLabel?: any;
}

export default class FormChoiceGroup extends React.Component<IFormChoiceGroupProps, IFormChoiceGroupState>{
    constructor(props){
        super(props);

        let _d = props.fieldDefinition;
        let _e = props.errorMessage;
        let _v = props.value;

        this.state = {
            disabled: _d.disabled       || false,
            errorMessage: _e            || "",
            label: _d.label             || (_d.name || ""),
            name: _d.name               || "",
            options: _d.options         || [{ key: "xx", text: "ERROR: Options Not Found."}],
            placeHolder: _d.placeholder || "Please select a value",
            ref: _d.name                || "",
            required: _d.required       || false,
            value: _v,
            onChanged: this.props.onChanged
        }
    }

    public render(): React.ReactElement<IFormChoiceGroupProps>{
        let _s = this.state;
        
        return(
            <ChoiceGroup {..._s} />
        )
    }
}