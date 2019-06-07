import React, { Fragment } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';
import { removeKey } from '../../../helpers/utils';
import {createNewModelInstance, getModelKey} from '../model/helpers/model';
import SupplierEdit from '../../supplier/SupplierEdit';

class UploadMappingSuppliers extends React.Component {
  constructor(props) {
    super();
    this.state = this.deriveStateFromProps(props);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.suppliers !== prevProps.suppliers) {
      const updatedRowMappings = this.state.rowMappings.map(rowMap => {
        this.props.suppliers.some(supplier => {
          if (supplier.supplier_name.toLowerCase() === rowMap.supplierName.toLowerCase()) {
            rowMap.supplier = supplier.id;
            return true;
          }
          return false;
        });
        return rowMap;
      });
      this.setState({ rowMappings: updatedRowMappings });
    }
  }

  deriveStateFromProps = props => {
    const { rowMappings } = props;
    return {
      showModal: false,
      rowMappings,
    };
  };

  goToNextStep = () => {
    const { rowMappings } = this.state;
    this.props.addDataAndProceed({ rowMappings });
  };

  discardData = supplierName => {
    const updatedRowMappings = this.state.rowMappings.map(rowMap => {
      if (rowMap.supplierName === supplierName) {
        let updatedRowMap = removeKey(rowMap, 'supplier');
        updatedRowMap.ignore = true;
        return updatedRowMap;
      }
      return rowMap;
    });
    this.setState({ rowMappings: updatedRowMappings });
  };

  undoDiscardData = supplierName => {
    const updatedRowMappings = this.state.rowMappings.map(rowMap => {
      if (rowMap.supplierName === supplierName) {
        rowMap.ignore = false;
      }
      return rowMap;
    });
    this.setState({ rowMappings: updatedRowMappings });
  };

  setUpSupplierModalForNewField = supplierName => {
    const supplier = createNewModelInstance({
      supplier_name: supplierName,
    });
    this.setState({
      supplier,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, supplier: {} });
  };

  render() {
    const { saveSupplier, deleteSupplier } = this.props;
    const { rowMappings, showModal, supplier } = this.state;
    const unResolvedRowMappings = rowMappings.filter(
      rowMapping => !(rowMapping.supplier || rowMapping.ignore),
    );
    const suppliersUnmatched = [];
    const suppliersDiscarded = [];
    unResolvedRowMappings.forEach(row => {
      if (!suppliersUnmatched.includes(row.supplierName)) suppliersUnmatched.push(row.supplierName);
    });
    const discardedRowMappings = rowMappings.filter(rowMapping => rowMapping.ignore);
    discardedRowMappings.forEach(row => {
      if (!suppliersDiscarded.includes(row.supplierName)) suppliersDiscarded.push(row.supplierName);
    });
    return (
      <Fragment key="supplierUploadMapping">
        <section key="mappingData" className="row" id="mappingData">
          {showModal && (
            <SupplierEdit
              supplier={supplier ? supplier : {}}
              componentKey={getModelKey(supplier)}
              saveSupplier={saveSupplier}
              deleteSupplier={deleteSupplier}
              closeModal={this.handleCloseModal}
            />
          )}
          {suppliersUnmatched.map((supplierName, index) => (
            <div key={`mapping${index}`} className="rounded">
              {supplierName}
              <Icon
                id={`delete-field${index}`}
                name="trash"
                onClick={() => this.discardData(supplierName)}
                title="Discard data"
              />
              <Icon
                id={`create{index}`}
                name="add circle"
                onClick={() => this.setUpSupplierModalForNewField(supplierName)}
                title="Create Supplier to store data"
              />
            </div>
          ))}
          {suppliersDiscarded.map((supplierName, index) => (
            <div key={`discard${index}`} className="rounded discarded">
              {supplierName}
              <Icon
                id={`restore-field${index}`}
                name="remove circle"
                onClick={() => this.undoDiscardData(supplierName)}
                title="Do not Discard data"
              />
            </div>
          ))}
        </section>
        <div>
          <Button
            key="uploadCont"
            onClick={this.goToNextStep}
            disabled={unResolvedRowMappings.length > 0}
          >
            Continue ...
          </Button>
        </div>
      </Fragment>
    );
  }
}

UploadMappingSuppliers.propTypes = {
  rowMappings: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  saveSupplier: PropTypes.func.isRequired,
  deleteSupplier: PropTypes.func,
  addDataAndProceed: PropTypes.func.isRequired,
};
export default UploadMappingSuppliers;
