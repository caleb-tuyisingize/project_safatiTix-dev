import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PaymentForm = ({ ticketId, amount, onPaymentSuccess, onPaymentFailed }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const pollingRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, []);

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('250')) return digits;
    if (digits.startsWith('0')) return `250${digits.slice(1)}`;
    if (digits.length === 9) return `250${digits}`;
    return digits;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!ticketId || !amount) {
        throw new Error('Missing ticket ID or amount');
      }

      if (!phoneNumber || phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      const formattedPhone = '+' + formatPhoneNumber(phoneNumber);

      const response = await axios.post('/api/payments/initiate', {
        ticketId,
        phoneNumber: formattedPhone,
        amount: parseFloat(amount)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Payment initiation failed');
      }

      setPaymentId(response.data.payment.id);
      setStatusMessage('STK push sent to your phone. Please enter your PIN to confirm payment.');
      setLoading(false);

      pollPaymentStatus(response.data.payment.id);

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment initiation failed');
      setLoading(false);
    }
  };

  const pollPaymentStatus = (pId) => {
    const startTime = Date.now();
    const maxPollTime = 5 * 60 * 1000; // 5 minutes

    const poll = async () => {
      if (!isMountedRef.current) return;

      if (Date.now() - startTime > maxPollTime) {
        setStatusMessage('Payment confirmation timed out. Please check your payment status.');
        return;
      }

      try {
        const response = await axios.get(`/api/payments/${pId}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const payment = response.data.payment;

        if (payment.status === 'paid' || payment.status === 'success') {
          setSuccess(true);
          setStatusMessage('Payment successful! Your ticket is confirmed.');
          if (onPaymentSuccess) onPaymentSuccess(payment);
          return;
        }

        if (payment.status === 'failed' || payment.status === 'cancelled') {
          setError('Payment was declined or cancelled.');
          if (onPaymentFailed) onPaymentFailed(payment);
          return;
        }

        setStatusMessage('Waiting for payment confirmation...');
        pollingRef.current = setTimeout(poll, 4000);

      } catch (err) {
        console.error('Status check error:', err);
        pollingRef.current = setTimeout(poll, 4000);
      }
    };

    poll();
  };

  return (
    <div className="payment-form-container" style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Confirm Payment</h2>

      <form onSubmit={handlePayment}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Amount (RWF):</label>
          <input
            type="number"
            value={amount}
            disabled
            style={{ width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 0788123456 or +250788123456"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
            disabled={loading || success}
            required
          />
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c00',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {statusMessage && (
          <div style={{
            backgroundColor: '#efe',
            color: '#060',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px'
          }}>
            {statusMessage}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#dfd',
            color: '#080',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            ✓ Payment Confirmed! Your ticket is ready.
          </div>
        )}

        <button
          type="submit"
          disabled={loading || success}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: success ? '#4CAF50' : '#0077B6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading || success ? 'not-allowed' : 'pointer',
            opacity: loading || success ? 0.7 : 1
          }}
        >
          {success ? '✓ Payment Successful' : loading ? 'Processing...' : 'Confirm & Pay'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
