import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import FormTooltipRenderer from '../renderers/FormTooltip/FormTooltipRenderer';
import { IFieldDefinition } from '../interfaces/IFieldDefinition';

export interface IFormDropdownProps{
    fieldDefinition: IFieldDefinition;
    errorMessage?: string;
    value?: string;
    onChanged: any;
}

export interface IFormDropdownState{
    disabled: boolean;
    errorMessage?: string;
    label: string;
    multiSelect: boolean;
    name: string;
    options: any;
    placeHolder: string;
    ref: string;
    required: boolean;
    value: string;
    onChanged?: any;
    onRenderLabel?: any;
}

export default class FormDropdown extends React.Component<IFormDropdownProps, IFormDropdownState>{
    constructor(props){
        super(props);

        let _d = props.fieldDefinition;
        let _e = props.errorMessage;
        let _v = props.value;

        let _s = {
            disabled: _d.disabled       || false,
            errorMessage: _e            || "",
            label: _d.label             || (_d.name || ""),
            multiSelect: _d.multi       || false,
            name: _d.name               || "",
            options: _d.options         || [{ key: "xx", text: "ERROR: Options Not Found."}],
            placeHolder: _d.placeholder || "Please select a value",
            ref: _d.name                || "",
            required: _d.required       || false,
            value: _v                   || "",
            onChanged: this.props.onChanged
        }

        if(_d.tooltip) _s["onRenderLabel"] = () => (<FormTooltipRenderer label={ _d.label } tooltip={ _d.tooltip } required={ _d.required } />);

        this.state = _s;
    }

    public render(): React.ReactElement<IFormDropdownProps>{
        let _s = this.state;

        return (
            <Dropdown {..._s} />
        );
    }
}