import * as React from 'react';

import { EFieldType } from '../interfaces/EFieldType';
import { IFieldDefinition } from '../interfaces/IFieldDefinition';
import FormTextField from '../inputs/FormTextField';
import FormDropdown from '../inputs/FormDropdown';
import FormChoiceGroup from '../inputs/FormChoiceGroup';

export interface IMappedElementProps{
    definition: any;
    onChange: any;
}

export interface IMappedElementState extends IMappedElementProps{

}

export default class MappedElement extends React.Component<IMappedElementProps, IMappedElementState>{

    constructor(props){
        super(props);
        this.state = props;
    }
    
    public render(): React.ReactElement<IMappedElementProps>{

        let _t = this.state.definition.type
        let _d = this.state.definition as IFieldDefinition
        console.log(_t);

        switch(_t.toLowerCase()){
            case 'tf':
            case 'textfield':{
                return (
                    <FormTextField 
                        fieldDefinition={ _d } 
                        onChanged={ this.state.onChange.bind(this, _d) }
                    />
                );
            }
            case 'dd':
            case 'dropdown':{
                return (
                    <FormDropdown 
                        fieldDefinition={ _d } 
                        onChanged={ (x) => console.log(x) } 
                    />
                );
            }
            case 'ch':
            case 'choice':{
                return (
                    <FormChoiceGroup 
                        fieldDefinition={ _d } 
                        onChanged= { (x) => console.log(x) } 
                    />
                );
            }
            case '':
            default:{
                return (
                    <span>Element type not found</span>
                );
            }
        }
    }
}