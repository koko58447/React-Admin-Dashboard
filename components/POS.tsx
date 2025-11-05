import React, { useState, useMemo } from 'react';
import { TrashIcon, BarcodeIcon, SearchIcon, ClockIcon } from './Icons';
import InvoiceModal from './InvoiceModal';
import PaymentModal from './PaymentModal';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const productData: Product[] = [
  { id: 1, name: 'Espresso', price: 2.50, image: 'https://images.unsplash.com/photo-1579992312654-20921a4f1346?q=80&w=300', category: 'Coffee' },
  { id: 2, name: 'Latte', price: 3.50, image: 'https://images.unsplash.com/photo-1561882468-91101f2e5f80?q=80&w=300', category: 'Coffee' },
  { id: 3, name: 'Cappuccino', price: 3.50, image: 'https://images.unsplash.com/photo-1557142046-c70420b732d3?q=80&w=300', category: 'Coffee' },
  { id: 4, name: 'Croissant', price: 2.75, image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d194?q=80&w=300', category: 'Pastries' },
  { id: 5, name: 'Muffin', price: 2.25, image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=300', category: 'Pastries' },
  { id: 6, name: 'Iced Tea', price: 2.00, image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=300', category: 'Drinks' },
  { id: 7, name: 'Sandwich', price: 5.50, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907910?q=80&w=300', category: 'Food' },
  { id: 8, name: 'Salad', price: 6.00, image: 'https://images.unsplash.com/photo-1546793663-3d8b556f8949?q=80&w=300', category: 'Food' },
];

const categories = ['All', ...new Set(productData.map(p => p.category))];

const POS: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [heldCarts, setHeldCarts] = useState<CartItem[][]>([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return productData.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);
  
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: number, amount: number) => {
     setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity + amount <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + amount } : item
      );
    });
  }

  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);

  const handleHold = () => {
    if (cart.length === 0) return;
    setHeldCarts(prev => [...prev, cart]);
    setCart([]);
  };

  const handleRetrieveCart = (index: number) => {
    if (cart.length > 0) {
        alert("Please hold or clear the current cart before retrieving another.");
        return;
    }
    setCart(heldCarts[index]);
    setHeldCarts(prev => prev.filter((_, i) => i !== index));
  }

  const handlePayNow = () => {
    if (cart.length === 0) return;
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentDetails: {paid: number, change: number}) => {
    setShowPayment(false);
    setInvoiceDetails({ items: [...cart], subtotal, tax, total, ...paymentDetails });
    setShowInvoice(true);
    setCart([]);
  }
  
  return (
    <>
    <div className="d-flex flex-column flex-lg-row h-100 gap-3">
      {/* Product Grid */}
      <div className="flex-grow-1 d-flex flex-column">
        <div className="bg-white p-3 rounded shadow-sm mb-3">
            <div className="input-group mb-3">
                <span className="input-group-text"><SearchIcon /></span>
                <input type="text" className="form-control" placeholder="Search by item name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" title="Scan Barcode"><BarcodeIcon /></button>
            </div>
            <div className="d-flex flex-wrap gap-2">
                {categories.map(category => (
                    <button key={category} onClick={() => setActiveCategory(category)} className={`btn btn-sm ${activeCategory === category ? 'btn-primary' : 'btn-outline-secondary'}`}>
                        {category}
                    </button>
                ))}
            </div>
        </div>
        <div className="flex-grow-1 overflow-auto">
          <div className="row g-3">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-6 col-md-4 col-xl-3">
                <div className="card h-100 shadow-sm border-0" role="button" onClick={() => addToCart(product)}>
                  <img src={product.image} className="card-img-top" alt={product.name} style={{height: '120px', objectFit: 'cover'}} />
                  <div className="card-body text-center p-2">
                    <h6 className="card-title small fw-bold mb-1">{product.name}</h6>
                    <p className="card-text text-muted">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded shadow-sm p-3 d-flex flex-column" style={{ minWidth: '300px', width: '100%', maxWidth: '400px' }}>
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-3">Current Order</h5>
            <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={heldCarts.length === 0}>
                    <ClockIcon style={{width: '16px', height: '16px'}}/>
                    <span className="badge bg-primary ms-1">{heldCarts.length}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {heldCarts.map((heldCart, index) => (
                        <li key={index}>
                            <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleRetrieveCart(index); }}>
                                Held Order #{index + 1} ({heldCart.reduce((sum, item) => sum + item.quantity, 0)} items)
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="flex-grow-1 overflow-auto">
          {cart.length === 0 ? (
            <p className="text-muted text-center mt-5">Your cart is empty.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {cart.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <h6 className="my-0 small">{item.name}</h6>
                     <div className="d-flex align-items-center mt-1">
                        <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
                     </div>
                  </div>
                  <div className="text-end">
                    <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="btn btn-sm btn-link text-danger p-0 ms-2" onClick={() => removeFromCart(item.id)}>
                        <TrashIcon style={{width: '16px', height: '16px'}}/>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="pt-3 mt-auto border-top">
           <div className="d-flex justify-content-between small mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary btn-lg" disabled={cart.length === 0} onClick={handlePayNow}>Pay Now</button>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary w-100" onClick={handleHold} disabled={cart.length === 0}>Hold</button>
                <button className="btn btn-outline-danger w-100" onClick={() => setCart([])}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaymentModal 
        show={showPayment} 
        handleClose={() => setShowPayment(false)} 
        totalAmount={total}
        onPaymentSuccess={handlePaymentSuccess}
    />
    {invoiceDetails && <InvoiceModal show={showInvoice} handleClose={() => setShowInvoice(false)} details={invoiceDetails} />}
    </>
  );
};

export default POS;