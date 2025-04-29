// @components/ui/alert.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  duration?: number;
}

const alerts: AlertProps[] = [];
let setAlertsFunction: React.Dispatch<React.SetStateAction<AlertProps[]>> | null = null;

export const showAlert = (message: string, type: AlertType, duration = 5000) => {
  const newAlert: AlertProps = { type, message, duration };
  alerts.push(newAlert);
  
  if (setAlertsFunction) {
    setAlertsFunction([...alerts]);
  }
  
  // Auto-remove the alert after duration
  setTimeout(() => {
    const index = alerts.indexOf(newAlert);
    if (index !== -1) {
      alerts.splice(index, 1);
      if (setAlertsFunction) {
        setAlertsFunction([...alerts]);
      }
    }
  }, duration);
};

const getAlertStyles = (type: AlertType) => {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-500 bg-opacity-90',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
      };
    case 'error':
      return {
        bgColor: 'bg-red-500 bg-opacity-90',
        // icon: (
        //   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        //   </svg>
        // ),
      };
    case 'warning':
      return {
        bgColor: 'bg-yellow-500 bg-opacity-90',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-blue-500 bg-opacity-90',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      };
  }
};

export const AlertComponent: React.FC = () => {
  const [activeAlerts, setActiveAlerts] = useState<AlertProps[]>([]);
  
  useEffect(() => {
    setAlertsFunction = setActiveAlerts;
    setActiveAlerts([...alerts]);
    
    return () => {
      setAlertsFunction = null;
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex flex-col items-center z-50 pointer-events-none">
      <AnimatePresence>
        {activeAlerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 20 + index * 10, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`${styles.bgColor} text-white rounded-lg shadow-lg p-4 m-2 max-w-md flex items-center pointer-events-auto backdrop-blur-sm border border-white/20`}
              style={{ 
                zIndex: 9999 - index,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="mr-3 flex-shrink-0 text-white">{styles.icon}</div>
              <div className="mr-2 flex-1 text-sm md:text-base font-medium">{alert.message}</div>
              <button
                onClick={() => {
                  const newAlerts = [...activeAlerts];
                  newAlerts.splice(index, 1);
                  setActiveAlerts(newAlerts);
                  
                  const idx = alerts.indexOf(alert);
                  if (idx !== -1) {
                    alerts.splice(idx, 1);
                  }
                }}
                className="flex-shrink-0 ml-2 text-white rounded-full hover:bg-white hover:bg-opacity-20 p-1 transition-colors focus:outline-none"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AlertComponent;