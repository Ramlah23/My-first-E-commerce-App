import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

// eslint-disable-next-line react/prop-types
export const PaymentProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const processPayment = async () => {
    // Aquí integrarías la lógica para procesar el pago, por ejemplo, con Stripe o PayPal
    // Podrías utilizar APIs de terceros para manejar los pagos
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