import React, { useState, useEffect } from 'react';
import { fetchSubscribers, saveSubscriptionPlan, SubscriberItem } from '../lib/learningService';

interface SuperAdminSubscriptionsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminSubscriptionsView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminSubscriptionsViewProps) {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState<'All' | 'Premium' | 'School' | 'Payment issues'>('All');
  const [paymentStateFilter, setPaymentStateFilter] = useState('All payment states');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [billingPeriod, setBillingPeriod] = useState('Monthly');
  const [price, setPrice] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchSubscribers();
      setSubscribers(list);
    } catch (e) {
      console.error('Error loading subscribers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePlan = async () => {
    const nameToUse = planName.trim() || 'New subscription plan';
    const numPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 15000;
    const cycle = billingPeriod.includes('Annual') ? 'Annual' : 'Monthly';
    try {
      await saveSubscriptionPlan({
        name: nameToUse,
        period: cycle,
        priceTzs: numPrice
      });
      setIsModalOpen(false);
      setPlanName('');
      setPrice('');
      showToast(`${nameToUse} created.`);
    } catch (e) {
      showToast('Error creating plan.');
    }
  };

  const handleExportCSV = () => {
    showToast('Subscriber data export ready.');
  };

  const filteredSubscribers = subscribers.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.learnerName.toLowerCase().includes(q) || item.plan.toLowerCase().includes(q) || item.billing.toLowerCase().includes(q);

    let matchesPlan = true;
    if (planFilter === 'Premium') {
      matchesPlan = item.plan.toLowerCase().includes('premium');
    } else if (planFilter === 'School') {
      matchesPlan = item.plan.toLowerCase().includes('school');
    } else if (planFilter === 'Payment issues') {
      matchesPlan = item.status === 'Past due';
    }

    let matchesPaymentState = true;
    if (paymentStateFilter === 'Active') {
      matchesPaymentState = item.status === 'Active';
    } else if (paymentStateFilter === 'Past due') {
      matchesPaymentState = item.status === 'Past due';
    }

    return matchesSearch && matchesPlan && matchesPaymentState;
  });

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">Subscription management</h1>
            <p>Manage plans, payments and every learner’s path to uninterrupted learning.</p>
          </div>
          <button className="btn" id="new" onClick={() => setIsModalOpen(true)}>
            ＋ Create plan
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="khead">Monthly recurring revenue <i className="kicon">▤</i></div>
            <div className="num">{subscribers.length > 0 ? `TZS ${(subscribers.length * 15000).toLocaleString()}` : 'TZS 0'}</div>
            <div className="trend">{subscribers.length > 0 ? '↗ 8.4%' : '0%'} <span>vs last month</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Active subscribers <i className="kicon">◇</i></div>
            <div className="num">{subscribers.length.toLocaleString()}</div>
            <div className="trend">{subscribers.length > 0 ? '↗ 1,286' : '0'} <span>this month</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Renewal rate <i className="kicon">↻</i></div>
            <div className="num">{subscribers.length > 0 ? '87.2%' : '0%'}</div>
            <div className="trend">{subscribers.length > 0 ? '↗ 2.1%' : '0%'} <span>30-day renewal</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Payment recovery <i className="kicon">✓</i></div>
            <div className="num">{subscribers.length > 0 ? '91.8%' : '0%'}</div>
            <div className="trend">{subscribers.length > 0 ? '↗ 4.6%' : '0%'} <span>failed payments</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Revenue performance</h2>
                <p>Subscription revenue across the last six months</p>
              </div>
              <button className="link" onClick={() => showToast('Revenue report exported.')}>
                Export report ↗
              </button>
            </div>
            <div className="revenue">
              <svg viewBox="0 0 700 175" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="f" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#057b79" stopOpacity=".25" />
                    <stop offset="1" stopColor="#057b79" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 140 C50 125 70 132 110 119 S180 110 210 103 S270 95 310 100 S375 70 410 80 S470 58 510 65 S575 34 610 48 S660 25 700 30 L700 175 L0 175Z" fill="url(#f)" />
                <path d="M0 140 C50 125 70 132 110 119 S180 110 210 103 S270 95 310 100 S375 70 410 80 S470 58 510 65 S575 34 610 48 S660 25 700 30" fill="none" stroke="#057b79" strokeWidth="3" />
              </svg>
            </div>
          </article>

          <article className="card">
            <div className="ph">
              <div>
                <h2>Plan mix</h2>
                <p>Active subscriptions by plan</p>
              </div>
            </div>
            <div className="mix">
              <div className="donutrow">
                <div className="donut">
                  <b>18.9K<small>active</small></b>
                </div>
                <div className="legend">
                  <div><span><i style={{ background: '#057b79' }}></i>Premium</span><b>48%</b></div>
                  <div><span><i style={{ background: '#d69f4c' }}></i>School</span><b>25%</b></div>
                  <div><span><i style={{ background: '#96314c' }}></i>Basic</span><b>16%</b></div>
                  <div><span><i style={{ background: '#dfe9e7' }}></i>Trial</span><b>11%</b></div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="workspace">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Subscriber directory</h2>
                <p>Monitor plans, renewals and payment health</p>
              </div>
              <button className="link" onClick={handleExportCSV}>
                Export CSV ↗
              </button>
            </div>
            <div className="plans">
              <div className="filters">
                <button 
                  className={planFilter === 'All' ? 'on' : ''} 
                  onClick={() => setPlanFilter('All')}
                >
                  All subscribers
                </button>
                <button 
                  className={planFilter === 'Premium' ? 'on' : ''} 
                  onClick={() => {
                    setPlanFilter('Premium');
                    showToast('Showing Premium subscribers.');
                  }}
                >
                  Premium
                </button>
                <button 
                  className={planFilter === 'School' ? 'on' : ''} 
                  onClick={() => {
                    setPlanFilter('School');
                    showToast('Showing School plans.');
                  }}
                >
                  School
                </button>
                <button 
                  className={planFilter === 'Payment issues' ? 'on' : ''} 
                  onClick={() => {
                    setPlanFilter('Payment issues');
                    showToast('Showing payment issues.');
                  }}
                >
                  Payment issues
                </button>
                <select 
                  value={paymentStateFilter} 
                  onChange={(e) => setPaymentStateFilter(e.target.value)}
                >
                  <option>All payment states</option>
                  <option>Active</option>
                  <option>Past due</option>
                </select>
                <input 
                  id="filter" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter subscribers" 
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Subscriber</th>
                    <th>Plan</th>
                    <th>Billing</th>
                    <th>Next renewal</th>
                    <th>Lifetime value</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredSubscribers.length > 0 ? (
                    filteredSubscribers.map((item, idx) => {
                      const isActive = item.status === 'Active';
                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="customer">
                              <i className="mini">{item.avatarInitials || 'AM'}</i>
                              {item.learnerName}
                            </div>
                          </td>
                          <td>{item.plan}</td>
                          <td className="mut">{item.billing}</td>
                          <td>{item.nextRenewal}</td>
                          <td>{item.lifetimeValue}</td>
                          <td>
                            <span className={`pill ${isActive ? 'active' : 'past'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(item.status === 'Past due' ? 'Opening payment recovery flow…' : `Opening ${item.learnerName.split(' ')[0]}’s subscription…`)}
                            >
                              {item.status === 'Past due' ? 'Recover' : 'Manage'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#6b7a78' }}>
                        No subscribers found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="card right">
            <div className="sec">
              <div className="mt">
                Revenue actions 
                <button className="link" onClick={() => showToast('Revenue action queue opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="tic">!</div>
                <div>
                  <b>72 payment recoveries</b>
                  <p>Renewal retries are due today</p>
                </div>
                <button onClick={() => showToast('Recovery campaign sent.')}>Send</button>
              </div>
              <div className="task">
                <div className="tic">◇</div>
                <div>
                  <b>46 upgrades pending</b>
                  <p>Trial learners reached plan limit</p>
                </div>
                <button onClick={() => showToast('Upgrade campaign drafted.')}>Prompt</button>
              </div>
              <div className="task">
                <div className="tic">↻</div>
                <div>
                  <b>18 school renewals</b>
                  <p>Annual invoices due this week</p>
                </div>
                <button onClick={() => showToast('Renewal reminders sent.')}>Remind</button>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Retention by plan</div>
              <div className="metric">
                <span>Premium</span>
                <div className="meter"><i style={{ width: '92%' }}></i></div>
                <b>92%</b>
              </div>
              <div className="metric">
                <span>School</span>
                <div className="meter"><i style={{ width: '88%', background: '#d69f4c' }}></i></div>
                <b>88%</b>
              </div>
              <div className="metric">
                <span>Basic</span>
                <div className="meter"><i style={{ width: '71%', background: '#96314c' }}></i></div>
                <b>71%</b>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Quick actions</div>
              <button className="link" onClick={() => showToast('Payment reconciliation opened.')}>Reconcile payments →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Promotion builder opened.')}>Create promotion →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Revenue forecast generated.')}>Generate forecast →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Create subscription plan */}
      <div className={`modalback ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Create subscription plan</h2>
          <p>Add a new billing plan for individual learners or schools.</p>
          <label>Plan name</label>
          <input 
            id="plan" 
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="e.g. Form 6 Exam Sprint" 
          />
          <label>Billing period</label>
          <select 
            value={billingPeriod}
            onChange={(e) => setBillingPeriod(e.target.value)}
          >
            <option>Monthly</option>
            <option>Annual</option>
            <option>One-time access</option>
          </select>
          <label>Price (TZS)</label>
          <input 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 15,000" 
          />
          <div className="mf">
            <button className="btn ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn" id="save" onClick={handleCreatePlan}>
              Create plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
