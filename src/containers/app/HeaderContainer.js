import { connect } from 'react-redux';
import Header from '../../components/menus/Header';
import {
  changeRoute,
  removeMessage,
  saveStateToLocalStorage,
  setStateFromLocalStorage,
} from '../../state/actions/application';
import { getUsers, logoutUser } from '../../state/actions/user';
import { getCoreData, getCoreDataSuccess } from '../../state/actions/core';
import { listParts, listPartsOK } from '../../state/actions/part';
import { getFramework, getFrameworkSuccess } from '../../state/actions/framework';

const mapStateToProps = ({ user, application, core, part, framework }) => {
  const { brands, charges, suppliers } = core;
  const { parts, supplierProducts } = part;
  const { sections } = framework;
  return {
    user: user.user,
    token: user.token,
    application,
    brands,
    charges,
    suppliers,
    parts,
    supplierProducts,
    sections,
  };
};
const mapDispatchToProps = {
  changeRoute,
  removeMessage,
  logoutUser,
  saveStateToLocalStorage,
  setStateFromLocalStorage,
  getCoreData,
  getCoreDataSuccess,
  getFramework,
  getFrameworkSuccess,
  listParts,
  listPartsOK,
  getUsers,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
