import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

// eslint-disable-next-line react/prop-types
export const PaymentProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const processPayment = async () => {
    
  };

  const value = {
    paymentMethod,
    selectPaymentMethod,
    processPayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  return useContext(PaymentContext);
};