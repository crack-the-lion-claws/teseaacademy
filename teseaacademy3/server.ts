import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface Transaction {
  id: string;
  plan: string;
  cycle: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  accountNumber: string;
  status: 'COMPLETED' | 'PENDING_PUSH' | 'FAILED';
  createdAt: string;
}

interface SchoolInquiry {
  id: string;
  schoolName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

// In-memory data store
const transactions: Transaction[] = [];
const schoolInquiries: SchoolInquiry[] = [];

// Plans configuration
const PLANS = [
  {
    id: 'Explorer',
    eyebrow: 'Get started',
    name: 'Explorer',
    description: 'Build a focused study habit with the essentials.',
    monthlyPrice: '9,900',
    annualPrice: '7,920',
    currency: 'TZS',
    popular: false,
    features: [
      { text: '3 subjects of your choice', included: true },
      { text: '200+ practice questions monthly', included: true },
      { text: 'Study notes & video lessons', included: true },
      { text: 'AI Tutor access', included: false }
    ]
  },
  {
    id: 'Achiever',
    eyebrow: 'Best value',
    flag: 'MOST POPULAR',
    name: 'Achiever',
    description: 'The complete companion for serious secondary learners.',
    monthlyPrice: '19,900',
    annualPrice: '15,920',
    currency: 'TZS',
    popular: true,
    features: [
      { text: 'All NECTA secondary subjects', included: true },
      { text: 'Unlimited quizzes & mock exams', included: true },
      { text: 'Ask Rafiki AI Tutor', included: true },
      { text: 'Progress insights & certificates', included: true }
    ]
  },
  {
    id: 'Scholar',
    eyebrow: 'For future leaders',
    name: 'Scholar',
    description: 'Go further with both NECTA and Cambridge learning tracks.',
    monthlyPrice: '34,900',
    annualPrice: '27,920',
    currency: 'TZS',
    popular: false,
    features: [
      { text: 'Everything in Achiever', included: true },
      { text: 'Cambridge learning pathway', included: true },
      { text: 'Premium puzzle studio', included: true },
      { text: 'Priority learner support', included: true }
    ]
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'TESEA Academy Subscriptions Backend' });
  });

  // Get available subscription plans
  app.get('/api/plans', (req, res) => {
    res.json({ plans: PLANS });
  });

  // Process checkout/payment request
  app.post('/api/subscriptions/checkout', (req, res) => {
    const { plan, cycle, amount, paymentMethod, accountNumber } = req.body;

    if (!plan || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all payment details.'
      });
    }

    const transactionId = 'TSA-' + Math.floor(100000 + Math.random() * 900000);
    const status = (paymentMethod === 'M-Pesa' || paymentMethod === 'Airtel Money') 
      ? 'PENDING_PUSH' 
      : 'COMPLETED';

    const newTransaction: Transaction = {
      id: transactionId,
      plan: plan || 'Achiever',
      cycle: cycle || 'monthly',
      amount: amount || '19,900',
      currency: 'TZS',
      paymentMethod: paymentMethod || 'M-Pesa',
      accountNumber: String(accountNumber),
      status,
      createdAt: new Date().toISOString()
    };

    transactions.unshift(newTransaction);

    let clientMessage = '';
    if (paymentMethod === 'M-Pesa' || paymentMethod === 'Airtel Money') {
      clientMessage = `Payment request of TZS ${newTransaction.amount} for the ${newTransaction.plan} plan sent to ${accountNumber}. Please enter your PIN on your mobile device to complete. (Ref: ${transactionId})`;
    } else if (paymentMethod === 'Card') {
      clientMessage = `Card payment of TZS ${newTransaction.amount} for the ${newTransaction.plan} plan completed successfully. (Ref: ${transactionId})`;
    } else {
      clientMessage = `Bank instructions for the ${newTransaction.plan} plan sent to ${accountNumber}. (Ref: ${transactionId})`;
    }

    res.json({
      success: true,
      transaction: newTransaction,
      message: clientMessage
    });
  });

  // School Inquiry Endpoint
  app.post('/api/school-inquiry', (req, res) => {
    const { schoolName, contactName, email, phone } = req.body || {};
    const inquiry: SchoolInquiry = {
      id: 'SCH-' + Math.floor(10000 + Math.random() * 90000),
      schoolName,
      contactName,
      email,
      phone,
      createdAt: new Date().toISOString()
    };

    schoolInquiries.unshift(inquiry);

    res.json({
      success: true,
      inquiry,
      message: 'School plans inquiry received. Our education team will be in touch shortly.'
    });
  });

  // Get transaction history
  app.get('/api/subscriptions/transactions', (req, res) => {
    res.json({
      count: transactions.length,
      transactions
    });
  });

  // Vite development vs production static serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
