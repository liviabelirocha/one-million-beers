import { useNavigation } from "@remix-run/react";
import { ButtonHTMLAttributes } from "react";
import { ImSpinner10 } from "react-icons/im";

export const SubmitButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const navigation = useNavigation();

  return (
    <button
      type="submit"
      {...props}
      disabled={navigation.state !== "idle"}
      className={`flex justify-center items-center gap-2 ${className}`}
    >
      {navigation.state !== "idle" && <ImSpinner10 className="animate-spin" />}
      {children}
    </button>
  );
};
