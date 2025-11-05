import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface InvoiceDetails {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  change: number;
}

interface InvoiceModalProps {
  show: boolean;
  handleClose: () => void;
  details: InvoiceDetails;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ show, handleClose, details }) => {
  const invoiceId = `INV-${Date.now().toString().slice(-6)}`;
  const invoiceDate = new Date().toLocaleDateString();

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1} style={{backgroundColor: show ? 'rgba(0,0,0,0.5)' : ''}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Invoice</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <h4>POS System</h4>
              <p className="text-muted mb-0">Thank you for your purchase!</p>
            </div>
            <div className="d-flex justify-content-between small border-bottom pb-2 mb-2">
              <span>Invoice #: {invoiceId}</span>
              <span>Date: {invoiceDate}</span>
            </div>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {details.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${item.price.toFixed(2)}</td>
                    <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 border-top pt-2">
              <div className="d-flex justify-content-between small">
                <span>Subtotal</span>
                <span>${details.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span>Tax (8%)</span>
                <span>${details.tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total</span>
                <span>${details.total.toFixed(2)}</span>
              </div>
               <div className="d-flex justify-content-between small mt-2 border-top pt-2">
                <span>Amount Paid</span>
                <span>${details.paid.toFixed(2)}</span>
              </div>
               <div className="d-flex justify-content-between small text-success">
                <span>Change Due</span>
                <span>${details.change.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>Print Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;