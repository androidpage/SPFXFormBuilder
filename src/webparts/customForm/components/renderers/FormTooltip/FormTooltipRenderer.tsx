import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

import styles from './FormTooltipRenderer.module.scss';

export interface IFormTooltipRendererProps{
    label: string;
    tooltip?: string;
    required?: boolean;
}

export interface IFormTooltipRendererState extends IFormTooltipRendererProps{
}

export default class IFormTooltipRenderer extends React.Component<IFormTooltipRendererProps, IFormTooltipRendererState>{

    constructor(props){
        super(props);

        this.state = {
            label: props.label          || "",
            tooltip: props.tooltip      || null,
            required: props.required    || false
        }
    }

    public render(): React.ReactElement<IFormTooltipRendererProps>{
        let _s = this.state;
        return(
            <div>
                <Label className={ _s.required ? "is-required" : "" }>
                    { _s.label }
                {
                    _s.tooltip ? ( 
                        <TooltipHost content={ _s.tooltip }> 
                            <Icon iconName="Info" className={ styles.formToolipIcon } />
                        </TooltipHost> 
                    ) : ""
                }
                </Label>
            </div>
        );
    }
}