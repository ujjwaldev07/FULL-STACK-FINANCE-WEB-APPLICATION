import { useState } from "react";
import { FiHome, FiLogOut, FiPlusCircle, FiList } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div>
        <p className="brand-tag">Fintech Console</p>
        <h1 className="brand-title">Finance Manager</h1>
      </div>
      <nav className="topbar-nav">
        <NavLink to="/dashboard" className="topbar-link">
          <FiHome /> Dashboard
        </NavLink>
        <NavLink to="/add-transaction" className="topbar-link">
          <FiPlusCircle /> Add
        </NavLink>
        <NavLink to="/transactions" className="topbar-link">
          <FiList /> History
        </NavLink>
      </nav>
      <div className="topbar-user">
        <span>{user?.name}</span>
        <Button type="button" variant="ghost" onClick={() => setIsLogoutModalOpen(true)}>
          <FiLogOut /> Logout
        </Button>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        title="Sign out"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
};

export default Navbar;
