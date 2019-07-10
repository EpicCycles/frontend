import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { PASSWORD, TEXT } from '../app/model/helpers/fields';
import { VALUE_MISSING } from '../app/model/helpers/error';
import { updateModel } from '../app/model/helpers/model';
import { updateObject } from '../../helpers/utils';
import EditModelPage from '../app/model/EditModelPage';
import IconArray from '../../common/IconArray';
const loginFields = [
  {
    fieldName: 'username',
    type: TEXT,
    displaySize: 20,
    maxLength: 60,
    header: 'User Name',
    synonyms: [],
    required: true,
    error: VALUE_MISSING,
  },
  {
    fieldName: PASSWORD,
    type: PASSWORD,
    displaySize: 20,
    maxLength: 60,
    header: 'Password',
    synonyms: [],
    required: true,
    error: VALUE_MISSING,
  },
];
const initialUser = { username: '', password: '' };
class Login extends React.Component {
  state = {
    userDetail: updateObject(initialUser),
  };
  handleModelValueChange = (fieldName, input) => {
    let { userDetail } = this.state;

    userDetail = updateModel(userDetail, loginFields, fieldName, input);
    this.setState({ userDetail });
  };

  onClickReset = () => {
    const userDetail = updateObject(initialUser);
    this.setState({ userDetail });
  };
  loginUser = () => {
    const { userDetail } = this.state;
    this.props.loginUser(userDetail.username, userDetail.password);
  };
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      const { userDetail } = this.state;
      if (userDetail.username && userDetail.password) this.loginUser();
    }
  };

  render() {
    const { userDetail } = this.state;
    const { isLoading } = this.props;
    const additionalActions = [
      {
        iconName: 'sign in',
        iconTitle: 'Sign In',
        iconAction: () => this.loginUser(),
        iconDisabled: !(userDetail.username && userDetail.password),
      },
    ];
    return (
      <form onKeyPress={this.handleKeyPress}>
        <div className="fit-content">
          <h1>Login</h1>
          <EditModelPage
            model={userDetail}
            modelFields={loginFields}
            onChange={this.handleModelValueChange}
          />
          <div className="full align_right">
            <IconArray componentKey={''} actionArray={additionalActions} />
          </div>
          {isLoading && (
            <Dimmer active inverted>
              <Loader content="Loading" />
            </Dimmer>
          )}
        </div>
      </form>
    );
  }
}

export default Login;
