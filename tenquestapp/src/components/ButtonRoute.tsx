import { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const nav = useNavigate();

  const toComponentWData = ()=>{
    nav(to, )
  };
  return (
    <Link to = {to} state={data}>
      <button onClick={toComponentWData} role={role}>
        {children}
      </button>
    </Link>
  );
};

export default ButtonRoute;
