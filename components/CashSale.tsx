import React, { useState, useMemo } from 'react';
import InvoiceModal from './InvoiceModal';

// Mock Data
const initialSalesData = [
  { id: 1, invoiceId: 'INV-10234', date: '2024-07-21', customer: 'Walk-in Customer', total: 45.50, status: 'Paid', items: [{id: 1, name: 'Latte', price: 3.50, quantity: 2}, {id: 2, name: 'Croissant', price: 2.75, quantity: 3}], subtotal: 38.75, tax: 6.75 },
  { id: 2, invoiceId: 'INV-10235', date: '2024-07-21', customer: 'John Doe', total: 12.75, status: 'Paid', items: [{id: 1, name: 'Espresso', price: 2.50, quantity: 1}, {id: 2, name: 'Muffin', price: 2.25, quantity: 2}], subtotal: 11.00, tax: 1.75 },
  { id: 3, invoiceId: 'INV-10236', date: '2024-07-20', customer: 'Walk-in Customer', total: 8.00, status: 'Paid', items: [{id: 1, name: 'Iced Tea', price: 2.00, quantity: 4}], subtotal: 8.00, tax: 0.00 },
  { id: 4, invoiceId: 'INV-10237', date: '2024-07-20', customer: 'Jane Smith', total: 25.50, status: 'Paid', items: [{id: 1, name: 'Sandwich', price: 5.50, quantity: 2}, {id: 2, name: 'Salad', price: 6.00, quantity: 1}], subtotal: 22.00, tax: 3.50 },
  { id: 5, invoiceId: 'INV-10238', date: '2024-07-19', customer: 'Walk-in Customer', total: 6.25, status: 'Paid', items: [{id: 1, name: 'Cappuccino', price: 3.50, quantity: 1}, {id: 2, name: 'Muffin', price: 2.25, quantity: 1}], subtotal: 5.75, tax: 0.50 },
];

const CashSale: React.FC = () => {
  const [sales, setSales] = useState(initialSalesData);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any | null>(null);

  const handleViewClick = (sale: any) => {
    setSelectedSale(sale);
    setShowInvoiceModal(true);
  };
  
  const handleDeleteClick = (saleId: number) => {
    // In a real app, you'd show a confirmation modal first
    if(window.confirm('Are you sure you want to delete this sale?')){
      setSales(sales.filter(s => s.id !== saleId));
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-dark">Cash Sales</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Invoice ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.invoiceId}</td>
                    <td>{sale.date}</td>
                    <td>{sale.customer}</td>
                    <td>${sale.total.toFixed(2)}</td>
                    <td><span className="badge bg-success">{sale.status}</span></td>
                    <td className="text-end">
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleViewClick(sale)}>View</button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(sale.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Add pagination here if needed */}
        </div>
      </div>
      {selectedSale && (
        <InvoiceModal
          show={showInvoiceModal}
          handleClose={() => setShowInvoiceModal(false)}
          // FIX: Add missing 'paid' and 'change' properties to satisfy the InvoiceDetails type.
          // For viewing past cash sales, it is assumed the amount paid was the total and the change was 0.
          details={{ 
              items: selectedSale.items, 
              subtotal: selectedSale.subtotal, 
              tax: selectedSale.tax, 
              total: selectedSale.total,
              paid: selectedSale.total,
              change: 0
            }}
        />
      )}
    </div>
  );
};

export default CashSale;
