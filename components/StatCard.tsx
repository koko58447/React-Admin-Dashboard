import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change, changeType }) => {
  const isIncrease = changeType === 'increase';

  return (
    <div className="card shadow-sm h-100 border-0">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="card-subtitle mb-2 text-muted text-uppercase small">{title}</h6>
                    <h2 className="card-title h3 fw-bold mb-1">{value}</h2>
                    <div className={`d-flex align-items-center small ${isIncrease ? 'text-success' : 'text-danger'}`}>
                        {isIncrease ? <ArrowUpIcon className="me-1" style={{width: '16px', height: '16px'}}/> : <ArrowDownIcon className="me-1" style={{width: '16px', height: '16px'}} />}
                        <span>{change} vs yesterday</span>
                    </div>
                </div>
                <div className={`p-3 rounded-circle text-white ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    </div>
  );
};

export default StatCard;