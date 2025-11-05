import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
  show: boolean;
  handleClose: () => void;
  totalAmount: number;
  onPaymentSuccess: (details: { paid: number, change: number }) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, handleClose, totalAmount, onPaymentSuccess }) => {
  const [amountPaid, setAmountPaid] = useState('');
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (show) {
      setAmountPaid('');
      setChange(0);
    }
  }, [show]);

  useEffect(() => {
    const paid = parseFloat(amountPaid);
    if (!isNaN(paid) && paid >= totalAmount) {
      setChange(paid - totalAmount);
    } else {
      setChange(0);
    }
  }, [amountPaid, totalAmount]);

  const handleConfirmPayment = () => {
    onPaymentSuccess({
        paid: parseFloat(amountPaid),
        change: change
    });
  };
  
  const handleQuickCash = (amount: number) => {
    setAmountPaid(amount.toString());
  }

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1} style={{backgroundColor: show ? 'rgba(0,0,0,0.5)' : ''}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
                <h6 className="text-muted">Total Due</h6>
                <h1 className="display-4 fw-bold">${totalAmount.toFixed(2)}</h1>
            </div>
            
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control form-control-lg"
                id="amountPaid"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                autoFocus
              />
              <label htmlFor="amountPaid">Amount Paid</label>
            </div>

            <div className="d-flex justify-content-center gap-2 mb-3">
                {[5, 10, 20, 50, Math.ceil(totalAmount)].map(val => (
                     <button key={val} className="btn btn-sm btn-outline-secondary" onClick={() => handleQuickCash(val)}>${val}</button>
                ))}
            </div>

            {parseFloat(amountPaid) >= totalAmount && (
                 <div className="text-center text-success fs-4">
                    Change Due: <span className="fw-bold">${change.toFixed(2)}</span>
                </div>
            )}
             {amountPaid && parseFloat(amountPaid) < totalAmount && (
                 <div className="text-center text-danger">
                    Amount is less than total due.
                </div>
             )}
          </div>
          <div className="modal-footer d-grid">
            <button 
                type="button" 
                className="btn btn-primary btn-lg"
                disabled={!amountPaid || parseFloat(amountPaid) < totalAmount}
                onClick={handleConfirmPayment}
            >
                Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;