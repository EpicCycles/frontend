import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import EditModel from '../app/model/EditModel';
import { userFields } from './helpers/userFields';

class UserDetailChange extends React.Component {
  render() {
    const { user, isLoading, changeUserData } = this.props;
    if (!(user && user.username)) return <div className="red error">You need to log in,</div>;
    return (
      <Fragment>
        <h2>Update User Details</h2>
        <EditModel
          model={user}
          modelFields={userFields}
          actionsRequired
          modelSave={changeUserData}
          pageMode
          showReadOnlyFields
        />
        {isLoading && (
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        )}
      </Fragment>
    );
  }
}

UserDetailChange.propTypes = {
  user: PropTypes.object,
  changeUserData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default UserDetailChange;
