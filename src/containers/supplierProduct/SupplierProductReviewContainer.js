import { connect } from 'react-redux';
import { savePartsAndProducts } from '../../state/actions/part';
import SupplierProductReview from '../../components/supplierProduct/SupplierProductReview';

const mapStateToProps = ({ core, framework, part }) => {
  return {
    brands: core.brands,
    suppliers: core.suppliers,
    sections: framework.sections,
    isLoading: framework.isLoading || core.isLoading || part.isLoading,
    parts: part.parts,
    supplierProducts: part.supplierProducts,
  };
};
const mapDispatchToProps = {
  savePartsAndProducts,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierProductReview);
