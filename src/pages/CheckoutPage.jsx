import React, { useState } from 'react';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage = ({ ticketId = 'ticket-123', amount = 15000 }) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  const handlePaymentSuccess = (payment) => {
    setPaymentCompleted(true);
    setTicketDetails({
      paymentId: payment.id,
      txRef: payment.tx_ref,
      amount: payment.amount,
      status: payment.status,
      timestamp: new Date().toLocaleString()
    });
  };

  const handlePaymentFailed = (payment) => {
    console.log('Payment failed:', payment);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Secure Checkout</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Order Summary</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>Ticket ID:</strong> {ticketId}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Amount:</strong> {amount.toLocaleString()} RWF
          </div>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '15px'
          }}>
            <p style={{ fontSize: '12px', color: '#666' }}>
              This is a secure payment. You will receive an STK push on your phone.
            </p>
          </div>
        </div>

        <div>
          <PaymentForm
            ticketId={ticketId}
            amount={amount}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailed={handlePaymentFailed}
          />
        </div>
      </div>

      {paymentCompleted && ticketDetails && (
        <div style={{
          backgroundColor: '#dfd',
          border: '2px solid #080',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h2 style={{ color: '#080' }}>✓ Payment Confirmed</h2>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '4px', marginTop: '15px' }}>
            <p><strong>Payment ID:</strong> {ticketDetails.paymentId}</p>
            <p><strong>Transaction Ref:</strong> {ticketDetails.txRef}</p>
            <p><strong>Amount Paid:</strong> {ticketDetails.amount?.toLocaleString()} RWF</p>
            <p><strong>Status:</strong> {ticketDetails.status?.toUpperCase()}</p>
            <p><strong>Time:</strong> {ticketDetails.timestamp}</p>
          </div>
          <p style={{ marginTop: '15px', fontSize: '14px', color: '#060' }}>
            Your ticket has been activated. Check your email for ticket details and QR code.
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
