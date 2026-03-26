import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activeMainMenu, setActiveMainMenu] = useState(null);

  return (
    <NavContext.Provider value={{ activeMainMenu, setActiveMainMenu }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
