import * as React from 'react'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import styles from './FormFooterRenderer.module.scss';

export interface IFormFooterProps{
    saveText?: string;
    cancelText?: string;
}
export interface IFormFooterState extends IFormFooterProps{
}

export default class FormFooter extends React.Component<IFormFooterProps, IFormFooterState>{
    constructor(props){
        super(props)

        this.state = {
            saveText: this.props.saveText || "Save",
            cancelText: this.props.cancelText || "Cancel"
        }
    }

    public render(): React.ReactElement<IFormFooterProps>{
        let _s = this.state;

        return(
            <div className={ styles.formFooter }>
                <PrimaryButton text={ _s.saveText } />
                <DefaultButton text={ _s.cancelText } />
            </div>
        )
    }
}