import React from 'react';
import * as PropTypes from 'prop-types';

// have an array of title, parent component has state which is current selected tab index

const TabbedView = props => {
  const { currentTab, tabs, changeTab } = props;
  const selectedTab = currentTab;
  return (
    <ul className="tabrow" data-test="tab-row">
      {tabs.map(tab => (
        <li
          id={`tab${tab.tabValue}`}
          key={`tab${tab.tabValue}`}
          onClick={() => tab.tabValue !== selectedTab && changeTab(tab.tabValue)}
          className={tab.tabValue === selectedTab ? 'tabSelected' : 'tabUnselected'}
          data-test="tab"
        >
          {tab.tabText}
        </li>
      ))}
    </ul>
  );
};

TabbedView.defaultProps = {
  currentTab: 0,
};
TabbedView.propTypes = {
  currentTab: PropTypes.number,
  tabs: PropTypes.array.isRequired,
  changeTab: PropTypes.func.isRequired,
};
export default TabbedView;
