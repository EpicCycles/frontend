import React from "react";
import * as PropTypes from "prop-types";

import SelectInput from "../../common/SelectInput";
import {getModelKey} from "../app/model/helpers/model";

const BrandSelect = (props) => {
    const { brands, fieldName, onChange, brandSelected, isEmptyAllowed, error, bikeOnly, disabled } = props;
    const brandsToUse = (brands && bikeOnly) ? brands.filter(brand => brand.bike_brand) : brands;
    const brandOptions = brandsToUse ? brandsToUse.map(brand => {
        return {
            'value': String(getModelKey(brand)),
            'name': brand.brand_name
        }
    }) : [];
    return <SelectInput
        fieldName={fieldName}
        onChange={onChange}
        value={brandSelected ? brandSelected.toString() : ""}
        options={brandOptions}
        isEmptyAllowed={isEmptyAllowed}
        error={error}
        disabled={disabled}
    />;
};

BrandSelect.defaultProps = {
    brands: [],
    fieldName: 'brand',
    isEmptyAllowed: false,
    error: "",
    bikeOnly: false,
    disabled: false,
};

BrandSelect.propTypes = {
    brands: PropTypes.array.isRequired,
    fieldName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    brandSelected: PropTypes.any,
    isEmptyAllowed: PropTypes.bool,
    error: PropTypes.string,
    bikeOnly: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default BrandSelect;