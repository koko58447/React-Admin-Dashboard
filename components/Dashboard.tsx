import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import { DollarSignIcon, ShoppingBagIcon, TrendingDownIcon, UsersIcon } from './Icons';

const salesData = [
  { name: 'Jan', Sales: 4000, Expenses: 2400 },
  { name: 'Feb', Sales: 3000, Expenses: 1398 },
  { name: 'Mar', Sales: 2000, Expenses: 9800 },
  { name: 'Apr', Sales: 2780, Expenses: 3908 },
  { name: 'May', Sales: 1890, Expenses: 4800 },
  { name: 'Jun', Sales: 2390, Expenses: 3800 },
  { name: 'Jul', Sales: 3490, Expenses: 4300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-dark">Dashboard</h1>
      
      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Today's Sale" 
            value="$1,250" 
            icon={<DollarSignIcon style={{width: '32px', height: '32px'}}/>} 
            color="bg-success"
            change="+12%"
            changeType="increase"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Today's Expense" 
            value="$350" 
            icon={<TrendingDownIcon style={{width: '32px', height: '32px'}}/>} 
            color="bg-danger"
            change="-5%"
            changeType="decrease"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="Total Orders" 
            value="82" 
            icon={<ShoppingBagIcon style={{width: '32px', height: '32px'}}/>} 
            color="bg-primary"
            change="+2"
            changeType="increase"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard 
            title="New Customers" 
            value="15" 
            icon={<UsersIcon style={{width: '32px', height: '32px'}}/>}
            color="bg-warning"
            change="+3"
            changeType="increase"
          />
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h2 className="card-title h5 mb-4">Sales & Expenses Overview</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(33, 37, 41, 0.8)', 
                    borderColor: '#6c757d',
                    color: '#ffffff'
                  }} 
                />
                <Legend />
                <Bar dataKey="Sales" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#dc3545" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;