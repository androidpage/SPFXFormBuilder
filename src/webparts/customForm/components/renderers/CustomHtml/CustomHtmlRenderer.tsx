import * as React from 'react'
import { IFieldDefinition } from '../../interfaces/IFieldDefinition';
import MappedElement from '../../functions/MappedElement';

export interface ICustomHtmlRendererProps{
    definition: IFieldDefinition;
}
export interface ICustomHtmlRendererState{
    type: string;
    value: any;
    children: any[];
}

export default class CustomHtmlRenderer extends React.Component<ICustomHtmlRendererProps, ICustomHtmlRendererState>{
    constructor(props){
        super(props);

        this.state = {
            type: props.definition.element || "span",
            value: props.definition.value || "",
            children: props.definition.children || []
        }
    }

    public render(): React.ReactElement<React.ClassAttributes<Element>>{
        if(this.state.children.length > 0){
            let _children = this.state.children.map((child) => {
                return (<MappedElement definition={ child } onChange={ () => {return false; }} />);
            });

            return React.createElement(this.state.type,{}, _children);    
        }
        else{
            return this.state.value ? React.createElement(this.state.type,{},[this.state.value]) : React.createElement(this.state.type,{});
        }
    }
}