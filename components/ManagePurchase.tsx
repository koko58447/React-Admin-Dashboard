import React, { useState, useMemo } from 'react';

// Mock Data
const initialPurchaseData = [
  { id: 1, supplier: 'Global Supplies Inc.', refNo: 'PO-00123', date: '2024-07-20', total: 1250.75, status: 'Received' },
  { id: 2, supplier: 'Tech Distributors', refNo: 'PO-00124', date: '2024-07-19', total: 899.00, status: 'Pending' },
  { id: 3, supplier: 'Office Essentials', refNo: 'PO-00125', date: '2024-07-18', total: 345.50, status: 'Received' },
  { id: 4, supplier: 'Local Farm Co.', refNo: 'PO-00126', date: '2024-07-17', total: 550.00, status: 'Ordered' },
  { id: 5, supplier: 'Global Supplies Inc.', refNo: 'PO-00127', date: '2024-07-16', total: 2100.25, status: 'Received' },
  { id: 6, supplier: 'Gadget Warehouse', refNo: 'PO-00128', date: '2024-07-15', total: 3400.00, status: 'Received' },
  { id: 7, supplier: 'Fresh Produce LLC', refNo: 'PO-00129', date: '2024-07-14', total: 450.60, status: 'Pending' },
  { id: 8, supplier: 'Tech Distributors', refNo: 'PO-00130', date: '2024-07-13', total: 150.00, status: 'Ordered' },
  { id: 9, supplier: 'Office Essentials', refNo: 'PO-00131', date: '2024-07-12', total: 95.20, status: 'Received' },
  { id: 10, supplier: 'Global Supplies Inc.', refNo: 'PO-00132', date: '2024-07-11', total: 1800.00, status: 'Received' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Received': return 'badge bg-success';
    case 'Pending': return 'badge bg-warning text-dark';
    case 'Ordered': return 'badge bg-info text-dark';
    default: return 'badge bg-secondary';
  }
};

const ManagePurchase: React.FC = () => {
  const [purchases, setPurchases] = useState(initialPurchaseData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any | null>(null);

  const paginatedPurchases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return purchases.slice(startIndex, startIndex + itemsPerPage);
  }, [purchases, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  const handleEditClick = (purchase: any) => {
    setSelectedPurchase(purchase);
    setShowEditModal(true);
  };

  const handleDeleteClick = (purchase: any) => {
    setSelectedPurchase(purchase);
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
      setPurchases(purchases.filter(p => p.id !== selectedPurchase.id));
      setShowDeleteConfirm(false);
      setSelectedPurchase(null);
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-dark">Manage Purchase</h1>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPurchaseModal">Add New Purchase</button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
             <div className="col-auto">
                <label htmlFor="itemsPerPage" className="form-label me-2">Show</label>
                <select id="itemsPerPage" className="form-select form-select-sm d-inline-block" style={{width: 'auto'}} value={itemsPerPage} onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <span className="ms-2">entries</span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Supplier</th>
                  <th scope="col">Reference No</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPurchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.supplier}</td>
                    <td>{purchase.refNo}</td>
                    <td>{purchase.date}</td>
                    <td>${purchase.total.toFixed(2)}</td>
                    <td><span className={getStatusBadge(purchase.status)}>{purchase.status}</span></td>
                    <td className="text-end">
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEditClick(purchase)}>Edit</button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(purchase)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <nav className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                    Showing {paginatedPurchases.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {(currentPage - 1) * itemsPerPage + paginatedPurchases.length} of {purchases.length} entries
                </div>
                <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
      </div>
      
      {/* Add Modal */}
      <div className="modal fade" id="addPurchaseModal" tabIndex={-1} aria-labelledby="addPurchaseModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPurchaseModalLabel">Add New Purchase</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Add purchase form fields here */}
              <p>Add purchase form goes here...</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save Purchase</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      <div className={`modal fade ${showEditModal ? 'show d-block' : ''}`} tabIndex={-1} style={{backgroundColor: showEditModal ? 'rgba(0,0,0,0.5)' : ''}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Purchase</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Editing purchase: {selectedPurchase?.refNo}</p>
              {/* Edit purchase form fields here, pre-filled with selectedPurchase data */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
              <button type="button" className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showDeleteConfirm ? 'show d-block' : ''}`} tabIndex={-1} style={{backgroundColor: showDeleteConfirm ? 'rgba(0,0,0,0.5)' : ''}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteConfirm(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete purchase order {selectedPurchase?.refNo}?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePurchase;
