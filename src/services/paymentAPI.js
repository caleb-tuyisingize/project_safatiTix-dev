import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const paymentAPI = {
  initiatePayment: async (ticketId, phoneNumber, amount) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/initiate`,
        {
          ticketId,
          phoneNumber,
          amount: parseFloat(amount)
        },
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getPaymentStatus: async (paymentId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payments/${paymentId}/status`,
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  cancelPayment: async (paymentId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/${paymentId}/cancel`,
        {},
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  pollPaymentStatus: async (paymentId, maxAttempts = 150, intervalMs = 2000) => {
    let attempts = 0;

    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const data = await paymentAPI.getPaymentStatus(paymentId);
          const payment = data.payment;

          if (payment.status === 'paid' || payment.status === 'success') {
            resolve({ success: true, payment });
            return;
          }

          if (payment.status === 'failed' || payment.status === 'cancelled') {
            resolve({ success: false, payment });
            return;
          }

          attempts++;
          if (attempts >= maxAttempts) {
            reject(new Error('Payment confirmation timeout'));
            return;
          }

          setTimeout(poll, intervalMs);
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            reject(error);
            return;
          }
          setTimeout(poll, intervalMs);
        }
      };

      poll();
    });
  }
};

export default paymentAPI;
