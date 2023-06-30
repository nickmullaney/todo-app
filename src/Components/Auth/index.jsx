import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";

function Auth({ capability, children }) {
  const { loggedIn, can } = useContext(AuthContext);

  return (
    <When condition={loggedIn && (can(capability) || !capability)}>
      {children}
    </When>
  )
}

export default Auth;