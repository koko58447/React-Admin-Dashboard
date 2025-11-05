import React from 'react';

interface LogoutConfirmModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ show, handleClose, handleConfirm }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1} style={{backgroundColor: show ? 'rgba(0,0,0,0.5)' : ''}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Logout</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;