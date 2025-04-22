import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  role: string;
  to: string;
  data: {}
};

const ButtonRoute = ({
  children,
  role,
  to,
  data
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Link to = {to} state={data}>
      <button role={role}>
        {children}
      </button>
    </Link>
  );
};

export default ButtonRoute;
