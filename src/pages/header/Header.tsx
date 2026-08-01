import { useState } from "react";
import TopBar from "./TopBar";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <TopBar />

      <Navigation
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <MobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
    </>
  );
}