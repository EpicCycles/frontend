import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorDismissibleBlock = props => {
  const { application, removeMessage } = props;
  const messageColor = application.messageType && application.messageType === 'E' ? 'red' : 'green';

  return <Message color={messageColor} content={application.message} onDismiss={removeMessage} />;
};

export default ErrorDismissibleBlock;
