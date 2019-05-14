import React, {Fragment} from 'react';
import * as PropTypes from "prop-types";
import {findObjectWithId} from "../../helpers/utils";
import QuotePartEdit from "./QuotePartEdit";
import {getModelKey} from "../app/model/helpers/model";
import {buildQuotePart} from "./helpers/quotePart";

const QuotePartsPartType = props => {
    const { quote, brands, suppliers, sections, partType, bikePart, quotePart, replacementPart, additionalParts, deleteQuotePart, saveQuotePart, parts, supplierProducts } = props;
    const quotePartForBikePart = quotePart || buildQuotePart(quote.id, partType.id);
    return <Fragment>

        {bikePart && <QuotePartEdit
            deleteQuotePart={deleteQuotePart}
            saveQuotePart={saveQuotePart}
            partType={partType}
            bikePart={bikePart}
            quotePart={quotePartForBikePart}
            replacementPart={replacementPart}
            componentKey={getModelKey(quotePartForBikePart)}
            brands={brands}
            suppliers={suppliers}
            parts={parts}
            supplierProducts={supplierProducts}
            sections={sections}
            quote={quote}
            key={`editPart${getModelKey(quotePartForBikePart)}`}
        />}
        {additionalParts.map(additionalQuotePart => {
            const part = findObjectWithId(parts, additionalQuotePart.part);
            return <QuotePartEdit
                deleteQuotePart={deleteQuotePart}
                saveQuotePart={saveQuotePart}
                partType={partType}
                quotePart={additionalQuotePart}
                replacementPart={part}
                componentKey={getModelKey(additionalQuotePart)}
                brands={brands}
                suppliers={suppliers}
                sections={sections}
                quote={quote}
                parts={parts}
                supplierProducts={supplierProducts}
                key={`editPart${getModelKey(additionalQuotePart)}`}
            />
        })
        }
    </Fragment>
};
QuotePartsPartType.defaultProps = {
    additionalParts: [],
};
QuotePartsPartType.propTypes = {
    partType: PropTypes.object,
    bikePart: PropTypes.object,
    quotePart: PropTypes.object,
    replacementPart: PropTypes.object,
    additionalParts: PropTypes.array,
    parts: PropTypes.array,
    supplierProducts: PropTypes.array,
    deleteQuotePart: PropTypes.func.isRequired,
    saveQuotePart: PropTypes.func.isRequired,
    brands: PropTypes.array.isRequired,
    suppliers: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    quote: PropTypes.object.isRequired,
};

export default QuotePartsPartType;