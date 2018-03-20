import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import FormTooltipRenderer from '../renderers/FormTooltipRenderer';
import { IFieldDefinition } from '../interfaces/IFieldDefinition';

export interface IFormTextFieldProps{
    fieldDefinition: IFieldDefinition;
    errorMessage?: string;
    value?: string;
    onChanged: any;
}

export interface IFormTextFieldState{
    disabled: boolean;
    errorMessage?: string;
    label: string;
    multiline: boolean;
    name: string;
    ref: string;
    required: boolean;
    value: string;
    onChanged?: any;
    onRenderLabel?: any;
}

export default class FormTextField extends React.Component<IFormTextFieldProps, IFormTextFieldState>{

    constructor(props){
        super(props);

        let _d = props.fieldDefinition;
        let _e = props.errorMessage;
        let _v = props.value;

        let _s = {
            disabled: _d.disabled   || false,
            errorMessage: _e        || "",
            label: _d.label         || (_d.name || ""),
            multiline: _d.multiline || false,
            name: _d.name           || "",
            ref: _d.name            || "",
            required: _d.required   || false,
            value: _v               || "",
            onChanged: this.props.onChanged
        }

        if(_d.tooltip) _s["onRenderLabel"] = () => (<FormTooltipRenderer label={ _d.label } tooltip={ _d.tooltip } required={ _d.required } />);

        this.state = _s;
    }

    private _renderCustomLabel(tooltip, label){
        return tooltip ? (<FormTooltipRenderer label={ label } tooltip={ tooltip } />) : false
    }

    private _changeHandler(value){

    }

    private _changeValidator(value): boolean{

        return false;
    }

    public render(): React.ReactElement<IFormTextFieldProps>{

        let _s = this.state;

        return (
            <TextField {..._s} />
        );
    }
}