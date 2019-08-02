import { connect } from 'react-redux';
import ChargesEdit from '../../components/charge/ChargesEdit';
import { deleteCharge, saveCharge, addCharge } from '../../state/actions/core';

export default connect(
  ({ core, user }) => ({
    charges: core.charges,
    users: user.users,
    isLoading: core.isLoading,
  }),
  {
    saveCharge,
    addCharge,
    deleteCharge,
  },
)(ChargesEdit);
