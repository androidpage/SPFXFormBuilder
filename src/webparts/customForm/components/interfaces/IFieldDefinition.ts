import { EFieldType } from "./EFieldType";

export interface IFieldDefinition{
    name: string;
    label?: string;
    type: EFieldType;
    tooltip?: string;
    required?: boolean;
    multiSelect?: boolean;
    multiLine?: boolean;
    validator?: RegExp;
}