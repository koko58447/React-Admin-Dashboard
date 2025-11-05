import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import { DollarSignIcon, TrendingDownIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';

const financeData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 5000, profit: 3800 },
  { name: 'Apr', revenue: 4780, profit: 2908 },
  { name: 'May', revenue: 5890, profit: 4800 },
  { name: 'Jun', revenue: 4390, profit: 3800 },
  { name: 'Jul', revenue: 5490, profit: 4300 },
];

const recentTransactions = [
    { id: 'T001', date: '2024-07-21', description: 'Sale INV-10234', amount: 45.50, type: 'Revenue' },
    { id: 'T002', date: '2024-07-20', description: 'Purchase PO-00123', amount: -1250.75, type: 'Expense' },
    { id: 'T003', date: '2024-07-20', description: 'Expense - Rent', amount: -1500.00, type: 'Expense' },
    { id: 'T004', date: '2024-07-19', description: 'Sale INV-10238', amount: 6.25, type: 'Revenue' },
    { id: 'T005', date: '2024-07-18', description: 'Purchase PO-00125', amount: -345.50, type: 'Expense' },
]

const Finance: React.FC = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-dark">Finance Overview</h1>
      
      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Total Revenue" 
            value="$28,550" 
            icon={<DollarSignIcon style={{width: '32px', height: '32px'}}/>} 
            color="bg-success"
            change="+8.5%"
            changeType="increase"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Total Expense" 
            value="$12,340" 
            icon={<TrendingDownIcon style={{width: '32px', height: '32px'}}/>} 
            color="bg-danger"
            change="+4.2%"
            changeType="increase"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Net Profit" 
            value="$16,210" 
            icon={<ArrowUpIcon style={{width: '32px', height: '32px'}}/>} 
            color="bg-primary"
            change="+12.1%"
            changeType="increase"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Profit Margin" 
            value="56.8%" 
            icon={<ArrowUpIcon style={{width: '32px', height: '32px'}}/>}
            color="bg-info"
            change="+2.1%"
            changeType="increase"
          />
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h2 className="card-title h5 mb-4">Revenue vs. Profit</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={financeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0d6efd" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="profit" stroke="#198754" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
       <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h2 className="card-title h5 mb-3">Recent Transactions</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th className="text-end">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTransactions.map(t => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.date}</td>
                                <td>{t.description}</td>
                                <td className={`text-end fw-bold ${t.type === 'Revenue' ? 'text-success' : 'text-danger'}`}>
                                    {t.type === 'Expense' && '-'}${Math.abs(t.amount).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;