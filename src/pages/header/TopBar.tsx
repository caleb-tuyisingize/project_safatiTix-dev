import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  HelpCircle,
  Map,
  Globe,
  User,
} from "lucide-react";

export default function TopBar() {
  const styles: Record<string, CSSProperties> = {
    topBar: {
      width: "100%",
      height: "42px",
      background: "#0F172A",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,.08)",
    },

    container: {
      width: "100%",
      maxWidth: "1440px",
      padding: "0 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "13px",
      color: "#CBD5E1",
      fontWeight: 500,
    },

    center: {
      color: "#94A3B8",
      fontSize: "13px",
      fontWeight: 600,
      letterSpacing: ".2px",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },

    link: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      textDecoration: "none",
      color: "#F8FAFC",
      fontSize: "13px",
      fontWeight: 500,
      transition: "all .25s ease",
    },

    language: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer",
      color: "#F8FAFC",
      fontSize: "13px",
      fontWeight: 500,
    },
  };

  return (
    <div style={styles.topBar}>
      <div style={styles.container}>
        {/* Left */}

        <div style={styles.left}>
          <MapPin size={14} />
          Kigali, Rwanda
        </div>

        {/* Center */}

        <div style={styles.center}>
          Rwanda's Smart Transportation Platform
        </div>

        {/* Right */}

        <div style={styles.right}>
          <Link to="/help-center" style={styles.link}>
            <HelpCircle size={14} />
            Help Center
          </Link>

          <Link to="/track" style={styles.link}>
            <Map size={14} />
            Track Bus
          </Link>

          <div style={styles.language}>
            <Globe size={14} />
            EN
          </div>

          <Link to="/login" style={styles.link}>
            <User size={14} />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}