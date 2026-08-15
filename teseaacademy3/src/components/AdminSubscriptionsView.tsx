import React, { useState, useEffect } from 'react';
import { 
  SubscriptionPlanItem, 
  LearnerSubscriptionRecord, 
  fetchSubscriptionPlans, 
  saveSubscriptionPlan, 
  fetchLearnerSubscriptions 
} from '../lib/learningService';

interface AdminSubscriptionsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function AdminSubscriptionsView({ showToast }: AdminSubscriptionsViewProps) {
  const [plans, setPlans] = useState<SubscriptionPlanItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<LearnerSubscriptionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [billingPeriod, setBillingPeriod] = useState<'Monthly' | 'Per term' | 'Annual'>('Monthly');
  const [planPrice, setPlanPrice] = useState('15000');

  const loadData = async () => {
    try {
      const [fetchedPlans, fetchedSubs] = await Promise.all([
        fetchSubscriptionPlans(),
        fetchLearnerSubscriptions()
      ]);
      setPlans(fetchedPlans);
      setSubscriptions(fetchedSubs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = planName.trim() || 'New subscription plan';
    const priceNum = parseInt(planPrice.replace(/\D/g, ''), 10) || 12000;

    try {
      const created = await saveSubscriptionPlan({
        name: nameToUse,
        period: billingPeriod,
        priceTzs: priceNum
      });

      setPlans([created, ...plans]);
      setIsModalOpen(false);
      setPlanName('');
      showToast(`“${nameToUse}” created as a draft.`);
      await loadData();
    } catch (err) {
      showToast('Failed to create subscription plan.');
    }
  };

  const photoColors = ['#7b98b3', '#bb7284', '#548a70', '#7b98b3', '#9768a8'];

  const activeSubsCount = subscriptions.filter(s => s.status === 'Active').length;
  const mrrValue = subscriptions.length * 15000;
  const renewalRatePct = subscriptions.length > 0 ? Math.round((activeSubsCount / subscriptions.length) * 100) : 0;
  const paymentAttentionCount = subscriptions.filter(s => s.status === 'Due soon' || s.status === 'Payment failed').length;

  return (
    <div className="main" style={{ maxWidth: '1540px', padding: '33px 43px 55px' }}>
      <section className="intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
        <div>
          <span className="eye" style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>COMMERCIAL OPERATIONS</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, letterSpacing: '-.035em', margin: '5px 0' }}>Subscriptions</h1>
          <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Monitor membership growth, plan performance, payments and learner renewals.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="primary" 
          style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, boxShadow: '0 8px 18px rgba(150,44,74,.18)', cursor: 'pointer' }}
        >
          ＋ Create subscription plan
        </button>
      </section>

      {/* Metrics Row */}
      <section className="metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '25px' }}>
        <article className="metric wine" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#fbf0f3', color: '#962c4a', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>◉</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Active subscriptions</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{activeSubsCount.toLocaleString()}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: activeSubsCount > 0 ? '#15956c' : '#63707d', fontWeight: 700 }}>{activeSubsCount > 0 ? '↑ 100%' : '0%'}</span> vs last month
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>₮</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Monthly recurring revenue</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>TZS {mrrValue > 0 ? mrrValue.toLocaleString() : '0'}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: mrrValue > 0 ? '#15956c' : '#63707d', fontWeight: 700 }}>{mrrValue > 0 ? '↑ 100%' : '0%'}</span> this period
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>↻</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Renewal rate</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{renewalRatePct}%</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Last 30-day cohort</small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>!</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Payment attention</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{paymentAttentionCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Failed or past-due payments</small>
        </article>
      </section>

      {/* Main Grid */}
      <section className="grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.86fr', gap: '22px' }}>
        <div>
          {/* Subscription Activity Chart Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Subscription activity</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>New and renewed subscriptions over the last six months</p>
              </div>
              <button 
                onClick={() => showToast('Revenue report exported successfully.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Export
              </button>
            </div>

            <div style={{ height: '185px', display: 'flex', alignItems: 'flex-end', gap: '10px', background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 46px, #eef1f4 47px)', padding: '0 4px', borderBottom: '1px solid #e3e8ed' }}>
              {[
                { label: 'Feb', height: '42%' },
                { label: 'Mar', height: '54%' },
                { label: 'Apr', height: '47%' },
                { label: 'May', height: '66%' },
                { label: 'Jun', height: '72%' },
                { label: 'Jul', height: '87%' }
              ].map((bar) => (
                <div key={bar.label} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <i style={{ width: '24px', background: '#962c4a', borderRadius: '5px 5px 0 0', display: 'block', height: bar.height }}></i>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#929ba5', fontSize: '10px', padding: '8px 5px' }}>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </article>

          {/* Recent Subscriptions Table Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Recent subscriptions</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Latest learner billing activity</p>
              </div>
              <button 
                onClick={() => showToast('All subscription records opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                View all
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>LEARNER</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>PLAN</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>RENEWAL</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>STATUS</th>
                    <th style={{ borderBottom: '1px solid #e3e8ed' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '30px 8px', textAlign: 'center', color: '#909aa5', fontSize: '12px' }}>
                        {loading ? 'Loading subscription records...' : 'No subscriptions recorded.'}
                      </td>
                    </tr>
                  ) : (
                    subscriptions.map((sub, idx) => {
                      const initials = sub.learnerName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';
                      const color = photoColors[idx % photoColors.length];

                      return (
                        <tr key={sub.id}>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                            <div style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
                              <span style={{ height: '29px', width: '29px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', background: color, fontSize: '10px', fontWeight: 700 }}>
                                {initials}
                              </span>
                              <span>
                                <b style={{ color: '#17222e', fontSize: '12px', display: 'block' }}>{sub.learnerName}</b>
                                <small style={{ fontSize: '10px', color: '#8d97a2' }}>{sub.learnerEmail}</small>
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                            {sub.planName}
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                            {sub.renewalDate}
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 7px',
                              borderRadius: '12px',
                              fontSize: '9px',
                              fontWeight: 700,
                              background: sub.status === 'Active' ? '#eaf8f3' : sub.status === 'Due soon' ? '#fff6e5' : '#fff0f2',
                              color: sub.status === 'Active' ? '#11805d' : sub.status === 'Due soon' ? '#a36b06' : '#bf3151'
                            }}>
                              {sub.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', textAlign: 'right' }}>
                            <button 
                              onClick={() => showToast(`${sub.learnerName} subscription record opened.`)}
                              style={{ border: 0, background: 'none', color: '#87929c', fontSize: '16px', cursor: 'pointer' }}
                            >
                              ⋯
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <aside>
          {/* Subscription Plans Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Subscription plans</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Active products and adoption</p>
              </div>
              <button 
                onClick={() => showToast('Plan settings opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Manage
              </button>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {plans.map((p) => (
                <div key={p.id} style={{ border: '1px solid #e3e8ed', borderRadius: '9px', padding: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <b style={{ fontSize: '12px' }}>{p.name}</b>
                    <strong style={{ fontSize: '14px', color: '#962c4a' }}>TZS {p.priceTzs.toLocaleString()}</strong>
                  </div>
                  <small style={{ display: 'block', fontSize: '10px', color: '#63707d', margin: '4px 0 10px' }}>
                    {p.subscribersCount.toLocaleString()} active subscribers
                  </small>
                  <div style={{ height: '5px', background: '#e9edf1', borderRadius: '7px', overflow: 'hidden' }}>
                    <i style={{ display: 'block', height: '100%', background: '#962c4a', borderRadius: '7px', width: `${p.barPct}%` }}></i>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Renewal Actions Card */}
          <article className="card renew" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Renewal actions</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Time-sensitive subscription work</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid #edf0f3', alignItems: 'center' }}>
              <span style={{ width: '29px', height: '29px', background: '#fff2da', color: '#a76b08', borderRadius: '7px', display: 'grid', placeItems: 'center', fontSize: '14px', fontWeight: 700 }}>↻</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>284 plans expire within 7 days</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Prepare a renewal reminder campaign.</small>
              </span>
              <button 
                onClick={() => showToast('Renewal campaign drafted.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Notify
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid #edf0f3', alignItems: 'center' }}>
              <span style={{ width: '29px', height: '29px', background: '#fff2da', color: '#a76b08', borderRadius: '7px', display: 'grid', placeItems: 'center', fontSize: '14px', fontWeight: 700 }}>!</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>41 payment retries are pending</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Follow up or retry via payment provider.</small>
              </span>
              <button 
                onClick={() => showToast('Payment retry queue opened.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Review
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', padding: '10px 0', alignItems: 'center' }}>
              <span style={{ width: '29px', height: '29px', background: '#eaf8f3', color: '#11805d', borderRadius: '7px', display: 'grid', placeItems: 'center', fontSize: '14px', fontWeight: 700 }}>✓</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>18 annual upgrades this month</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Review upgrade conversion performance.</small>
              </span>
              <button 
                onClick={() => showToast('Upgrade report opened.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                View
              </button>
            </div>
          </article>
        </aside>
      </section>

      {/* Modal: Create Subscription Plan */}
      {isModalOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,33,0.5)', zIndex: 50, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{ width: 'min(600px, 100%)', background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 28px 70px rgba(10,16,24,.24)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>PLAN CONFIGURATION</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, margin: '5px 0' }}>Create subscription plan</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ border: 0, background: 'none', color: '#85909a', fontSize: '22px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Define the access period and price for a new TESEA Academy offering.</p>

            <form onSubmit={handleCreatePlan}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px', marginTop: '18px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Plan name</label>
                  <input 
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="e.g. Form 6 Revision Pass"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Billing period</label>
                  <select 
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value as any)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', background: '#fff' }}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Per term">Per term</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Price (TZS)</label>
                  <input 
                    type="number"
                    value={planPrice}
                    onChange={(e) => setPlanPrice(e.target.value)}
                    placeholder="0"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '9px', marginTop: '19px' }}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ border: 0, background: 'none', color: '#667381', fontSize: '12px', fontWeight: 700, padding: '10px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Create plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
