import { EFieldType } from './EFieldType';
import {  IFieldValidator } from './IFieldValidator';

export interface IFieldDefinition{
    element?: string;
    name: string;
    label?: string;
    type: EFieldType;
    tooltip?: string;
    required?: boolean;
    multiSelect?: boolean;
    multiLine?: boolean;
    validators?: IFieldValidator[];
    value?: string;
}