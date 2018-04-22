import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import FormTooltipRenderer from '../renderers/FormTooltip/FormTooltipRenderer';
import { IFieldDefinition } from '../interfaces/IFieldDefinition';
import { IFieldValidator } from '../interfaces/IFieldValidator';

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
    _fieldValidators: IFieldValidator[];

    constructor(props){
        super(props);

        let _d = props.fieldDefinition;
        let _e = props.errorMessage;
        let _v = props.value;

        let _s: IFormTextFieldState = {
            disabled: _d.disabled   || false,
            errorMessage: _e        || "",
            label: _d.label         || (_d.name || ""),
            multiline: _d.multi     || false,
            name: _d.name           || "",
            ref: _d.name            || "",
            required: _d.required   || false,
            value: _v               || "",
            onChanged: this._changeValidator
        }

        if(_d.tooltip) _s.onRenderLabel = () => ( <FormTooltipRenderer label={ _d.label } tooltip={ _d.tooltip } required={ _d.required } /> );

        this.state = _s;
        this._fieldValidators = _d.validators;
    }

    private _renderCustomLabel(tooltip, label){
        return tooltip ? (<FormTooltipRenderer label={ label } tooltip={ tooltip } />) : false
    }

    private _changeHandler(value, isValid = false){
        if(isValid){
            this.props.onChanged(value);
        }
        else{
            this.props.onChanged(false);
        }
    }

    @autobind
    private _changeValidator(value){
        if(value){
            let _validators = this._fieldValidators || [];
            let _validationErrors = _validators.map((v) => {
                let _res: {validator: RegExp, validatorError: string, isValid?: boolean} = v
                _res.isValid = value.match(v.validator) !== null
                return _res;
            }).filter((v) => {
                return v.isValid === false
            });
    
            this.setState({
                errorMessage: _validationErrors.length > 0 ? _validationErrors[0].validatorError : "",
                value: value
            });

            this._changeHandler(value, _validationErrors.length <= 0);
        }
        else{
            this.setState({
                errorMessage: this.state.required ? "This field is required" : "",
                value: value
            });

            this._changeHandler(value, !this.state.required);
        }
    }

    public render(): React.ReactElement<IFormTextFieldProps>{

        let _s = this.state;

        return (
            <TextField {..._s} />
        );
    }
}