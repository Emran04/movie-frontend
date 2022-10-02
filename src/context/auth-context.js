import React, { useState, useEffect } from "react";
import { ADMIN_DATA, CUSTOMER_DATA } from "../configs/consts";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [customer, setCustomer] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if customer data exist in localStorage
    const customerData = localStorage.getItem(CUSTOMER_DATA);
    const adminData = localStorage.getItem(ADMIN_DATA);
    if (customerData) {
      setCustomer(JSON.parse(customerData));
      setIsCustomerLoggedIn(true);
    }
    if (adminData) {
      setAdmin(JSON.parse(adminData));
      setIsAdminLoggedIn(true);
    }
  }, []);

  return <AuthContext.Provider value={{
    customer,
    admin,
    isCustomerLoggedIn,
    isAdminLoggedIn
  }} {...props} />;
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
