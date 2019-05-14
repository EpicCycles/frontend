import React, {Fragment} from "react";
import * as PropTypes from "prop-types";

import SelectInput from "../../common/SelectInput";
import {getModelKey} from "../app/model/helpers/model";
import {bikeFullName} from "./helpers/bike";
import BikeSearch from "./BikeSearch";

const BikeListAndSelect = (props) => {
    const { onKeyPress, className, brands, onChange, brandSelected, onClick, frameName, getFrameList, canSelectArchived, archived, bikes, frames, selectedBike } = props;
    const bikeOptions = bikes.map(bike => {
        return {
            value: getModelKey(bike).toString(),
            name: bikeFullName(bike, frames, brands),
        }
    });

    return <Fragment>
        <h2 data-test="list-and-search-heading">Select Bike</h2>
        <div className={className}>
            <BikeSearch
                onChange={onChange}
                onClick={onClick}
                getFrameList={getFrameList}
                brands={brands}
                brandSelected={brandSelected}
                frameName={frameName}
                archived={archived}
                canSelectArchived={canSelectArchived}
                data-test="bikes-search"
                className={className}
                onKeyPress={onKeyPress}
            />
            {(bikeOptions.length > 0) ? <SelectInput
                    fieldName='selectedBike'
                    onChange={onChange}
                    options={bikeOptions}
                    title={'Select Bike'}
                    label={'Select Bike'}
                    value={selectedBike.toString()}
                    data-test="bikes-select"
                    isEmptyAllowed={true}
                />

                : <div data-test="start-message">
                    No bikes to show, set new criteria and search, or
                </div>}
        </div>
    </Fragment>;
};
BikeListAndSelect.defaultProps = {
    brands: [],
    bikes: [],
    frames: [],
    className: 'row',
    selectedBike: '',
};
BikeListAndSelect.propTypes = {
    brands: PropTypes.array,
    bikes: PropTypes.array,
    frames: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    brandSelected: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    frameName: PropTypes.string,
    canSelectArchived: PropTypes.bool,
    archived: PropTypes.bool,
    getFrameList: PropTypes.func.isRequired,
    selectedBike: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    onKeyPress: PropTypes.func,
};
export default BikeListAndSelect;
