import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useMemo, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import useAuthCheck from "../../Hooks/useAuthCheck";
import AddPropertyModal from "../AddPropertyModal";
import ProfileMenu from "../ProfileMenu";
import "./Header.css";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const getMenuStyles = useMemo(() => {
    if (document.documentElement.clientWidth <= 800)
      return { right: !menuOpened && "100%" };
  }, [menuOpened]);

  function handlePropertyAdd() {
    if (validateLogin()) {
      setModalOpen(true);
    }
  }

  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img
            src="./logo.png"
            alt="logo"
            width={100}
            style={{ filter: "hue-rotate(100deg)" }}
          />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles}
          >
            {/* <a href="#residencies">Residencies</a>
            <a href="#value">Our Value</a>
            <a href="#contact-us">Contact Us</a>
            <a href="#get-started">Get Started</a> */}
            <Link to="/properties">Properties</Link>
            <a href="mailto:nishantargade4579@gmail.com">Contact</a>

            <div onClick={handlePropertyAdd}>Add Property</div>
            <AddPropertyModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />

            {!isAuthenticated ? (
              <button className="button" onClick={() => loginWithRedirect()}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
