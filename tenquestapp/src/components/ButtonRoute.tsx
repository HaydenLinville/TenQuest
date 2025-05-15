import { PropsWithChildren } from "react";
import {  useNavigate } from "react-router-dom";

type ButtonProps = {
  role: string;
  to: string;
  data: {};
};

const ButtonRoute = ({
  children,
  role,
  to,
  data,
}: PropsWithChildren<ButtonProps>) => {
  const nav = useNavigate();

  const toComponentWData = () => {
    nav(to, data);
  };
  return (
    <button onClick={toComponentWData} role={role}>
      {children}
    </button>
  );
};

export default ButtonRoute;

{
  /* <Link to = {to} state={data}>
</Link> */
}
