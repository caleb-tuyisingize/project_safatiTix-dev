import React from "react";

interface MobileMenuProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({
  mobileOpen,
}: MobileMenuProps) {
  if (!mobileOpen) return null;

  return (
    <div
      style={{
        background: "#fff",
        borderTop: "1px solid #e5e7eb",
        padding: "20px",
      }}
    >
      <p>Mobile Menu (Coming Soon)</p>
    </div>
  );
}