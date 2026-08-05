export const formatCurrency = (amount, currency = 'RWF') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};

export const normalizePhoneNumber = (phoneNumber) => {
  const digits = String(phoneNumber).replace(/\D/g, '');
  if (digits.startsWith('250')) return `+${digits}`;
  if (digits.startsWith('0')) return `+250${digits.slice(1)}`;
  if (digits.length === 9) return `+250${digits}`;
  return `+${digits}`;
};

export const isValidPhoneNumber = (phoneNumber) => {
  const normalized = normalizePhoneNumber(phoneNumber);
  return /^\+250(7|2)[0-9]{8}$/.test(normalized);
};

export const maskPhoneNumber = (phoneNumber) => {
  const digits = String(phoneNumber).replace(/\D/g, '');
  if (digits.length >= 4) {
    return `***${digits.slice(-4)}`;
  }
  return 'unknown';
};

export const getPaymentStatusMessage = (status) => {
  const messages = {
    'pending': 'Payment pending - waiting for confirmation',
    'paid': 'Payment confirmed - ticket activated',
    'success': 'Payment successful - ticket ready',
    'failed': 'Payment failed - please try again',
    'cancelled': 'Payment cancelled',
    'completed': 'Payment completed'
  };
  return messages[status?.toLowerCase()] || 'Unknown status';
};

export const getPaymentStatusColor = (status) => {
  const colors = {
    'pending': '#FFA500',
    'paid': '#4CAF50',
    'success': '#4CAF50',
    'failed': '#F44336',
    'cancelled': '#757575',
    'completed': '#4CAF50'
  };
  return colors[status?.toLowerCase()] || '#999';
};

export const calculateTotalAmount = (baseAmount, tax = 0, discount = 0) => {
  return baseAmount + tax - discount;
};

export const generatePaymentReference = () => {
  return `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
