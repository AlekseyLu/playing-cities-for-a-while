import { FC, ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="bg-white rounded-md max-w-xl h-96 flex-auto">{children}</div>
  );
};

export { Layout };
