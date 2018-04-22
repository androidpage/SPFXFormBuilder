import * as React from 'react'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import styles from './FormFooterRenderer.module.scss';

export interface IFormFooterProps{
    saveText?: string;
    cancelText?: string;
    saveAction: any;
    cancelAction: any;
}
export interface IFormFooterState extends IFormFooterProps{
}

export default class FormFooter extends React.Component<IFormFooterProps, IFormFooterState>{
    constructor(props){
        super(props)

        this.state = {
            saveText: props.saveText || "Save",
            cancelText: props.cancelText || "Cancel",
            saveAction: props.saveAction,
            cancelAction: props.cancelAction
        }
    }

    public render(): React.ReactElement<IFormFooterProps>{
        let _s = this.state;

        return(
            <div className={ styles.formFooter }>
                <PrimaryButton text={ _s.saveText } onClick={ _s.saveAction } />
                <DefaultButton text={ _s.cancelText } onClick={ _s.cancelAction } />
            </div>
        )
    }
}