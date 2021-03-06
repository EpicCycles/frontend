import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import ErrorDismissibleBlock from '../../common/ErrorDismissibleBlock';
import HeaderSection from './HeaderSection';
import { menuStructure } from './helpers/menu';
import { Icon } from 'semantic-ui-react';
import { getLocalStorage, setLocalStorage } from '../../state/helpers/localStorage';
import { createCookie, deleteCookie, getCookieObject } from '../../state/helpers/cookies';
import {
  COOKIE_TOKEN,
  COOKIE_USER,
  STORAGE_BRANDS,
  STORAGE_CHARGES,
  STORAGE_PARTS,
  STORAGE_QUESTIONS,
  STORAGE_SECTIONS,
  STORAGE_SUPPLIER_PRODUCTS,
  STORAGE_SUPPLIERS,
} from '../../helpers/constants';
import { userName } from '../user/helpers/user';
import { LOGIN_URL } from '../../helpers/routes';

class Header extends React.Component {
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener('beforeunload', this.saveStateToLocalStorage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStateToLocalStorage.bind(this));

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
  componentDidUpdate(prevProps, prevState) {
    const { application, removeMessage } = this.props;

    if (application && application.message && application.messageType !== 'E')
      setTimeout(() => removeMessage(), 5000);
  }
  hydrateStateWithLocalStorage = () => {
    const userDetails = getCookieObject(COOKIE_USER);
    const token = getCookieObject(COOKIE_TOKEN);

    if (token && userDetails) {
      this.props.setStateFromLocalStorage(userDetails, token);
      this.props.getUsers();

      const brands = getLocalStorage(STORAGE_BRANDS);
      const charges = getLocalStorage(STORAGE_CHARGES);
      const questions = getLocalStorage(STORAGE_QUESTIONS);
      const suppliers = getLocalStorage(STORAGE_SUPPLIERS);
      if (brands && suppliers && charges) {
        this.props.getCoreDataSuccess(brands, charges, questions, suppliers);
      } else {
        this.props.getCoreData();
      }
      const sections = getLocalStorage(STORAGE_SECTIONS);
      if (sections) {
        this.props.getFrameworkSuccess(sections);
      } else {
        this.props.getFramework();
      }

      const parts = getLocalStorage(STORAGE_PARTS);
      const supplierProducts = getLocalStorage(STORAGE_SUPPLIER_PRODUCTS);
      if (parts && supplierProducts) {
        this.props.listPartsOK({ parts, supplierProducts });
      } else {
        this.props.listParts({});
      }
    } else {
      this.props.changeRoute(LOGIN_URL);
    }
  };
  refreshData = () => {
    this.props.getCoreData();
    this.props.getFramework();
    this.props.listParts({});
  };
  saveStateToLocalStorage = () => {
    const {
      user,
      token,
      parts,
      supplierProducts,
      sections,
      suppliers,
      questions,
      charges,
      brands,
    } = this.props;
    if (user) {
      createCookie(COOKIE_USER, user);
      createCookie(COOKIE_TOKEN, token);

      setLocalStorage(STORAGE_PARTS, parts);
      setLocalStorage(STORAGE_SUPPLIER_PRODUCTS, supplierProducts);
      setLocalStorage(STORAGE_SECTIONS, sections);
      setLocalStorage(STORAGE_SUPPLIERS, suppliers);
      setLocalStorage(STORAGE_BRANDS, brands);
      setLocalStorage(STORAGE_CHARGES, charges);
      setLocalStorage(STORAGE_QUESTIONS, questions);
    }
  };

  logoutUser = () => {
    deleteCookie(COOKIE_USER);
    deleteCookie(COOKIE_TOKEN);
    this.props.logoutUser();
  };

  render() {
    const { user, application, removeMessage } = this.props;

    return (
      <Fragment key="header">
        <div className="row full nav">
          <Fragment key="nav">
            <ul className="nav">
              <li className="dropdown">
                <Link className="dropbtn" to="/">
                  Home
                </Link>
              </li>
              {menuStructure.map(menuSection => {
                return (
                  <HeaderSection
                    key={'headerSection' + menuSection.sectionPos}
                    sectionContents={menuSection.sectionContents}
                  />
                );
              })}
            </ul>
            {user && (
              <span id="user">
                Current User: {userName(user)}
                <Icon name="log out" onClick={this.logoutUser} />
                <Icon name="sync" onClick={this.refreshData} />
              </span>
            )}
          </Fragment>
        </div>
        {application && application.message && (
          <ErrorDismissibleBlock application={application} removeMessage={removeMessage} />
        )}
      </Fragment>
    );
  }
}

export default Header;
