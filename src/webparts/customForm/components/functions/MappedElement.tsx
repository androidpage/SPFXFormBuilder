import * as React from 'react';

import { EFieldType } from '../interfaces/EFieldType';
import { IFieldDefinition } from '../interfaces/IFieldDefinition';
import FormTextField from '../inputs/FormTextField';

export interface IMappedElementProps{
    definition: any;
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

        switch(_t){
            case 'textfield':{
                console.log("T")
                return (<FormTextField fieldDefinition={ _d } onChanged={ (x) => console.log(x)} />)
            }
            default:{
                return(<span>Element type not found</span>)
            }
        }
    }
}