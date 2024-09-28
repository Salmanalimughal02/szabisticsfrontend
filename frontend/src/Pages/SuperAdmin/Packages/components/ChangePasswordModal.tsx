import { CionLogin } from "../../../../utils/Constant";
import { H3, P } from "../../../../AbstractElements";
import ChangePasswordForm from "./ChangePasswordForm";
type propsType = {
  toggle: () => void;
};

const ChangePasswordModal = ({ toggle }: propsType) => {
  return (
    <div className="modal-toggle-wrapper">
      <H3>Change Password</H3>
      <P>Please type your change password</P>
      <ChangePasswordForm toggle={toggle} />
    </div>
  );
};

export default ChangePasswordModal;
