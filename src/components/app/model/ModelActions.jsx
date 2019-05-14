import React from "react";
import * as PropTypes from "prop-types";
import {Icon} from "semantic-ui-react";
import {gridItemClass} from "./helpers/display";

const ModelActions = props => <div
    className={`align_center ${gridItemClass(props.className)} grid-col--fixed-right`}
    key={`modelActions${props.componentKey}`}
    style={{ gridRow: ` span ${props.rowSpan}` }}
    data-test="model-field-cell"
>
    {props.actions.map(action => <Icon
        name={action.iconName}
        title={action.iconTitle}
        onClick={() => (!(props.actionsDisabled || action.iconDisabled)) && action.iconAction(props.componentKey)}
        key={`${action.iconName}-${props.componentKey}`}
        data-test="model-action"
        disabled={(props.actionsDisabled || action.iconDisabled)}
    />)}
</div>;

ModelActions.defaultProps = {
    className: '',
    rowSpan: 1,
};

ModelActions.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        iconName: PropTypes.string.isRequired,
        iconTitle: PropTypes.string.isRequired,
        iconAction: PropTypes.func.isRequired,
        iconDisabled: PropTypes.bool,
    })).isRequired,
    componentKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    className: PropTypes.string,
    rowSpan: PropTypes.number,
    actionsDisabled: PropTypes.bool,
};
export default ModelActions;