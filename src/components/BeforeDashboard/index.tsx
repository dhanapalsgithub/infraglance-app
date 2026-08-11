import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import './index.scss'

const baseClass = 'before-dashboard'

export default async function BeforeDashboard() {
  const payload = await getPayload({ config })

  // 1. விசாரணைகள் மற்றும் எண்ணிக்கைகளைப் பெறுதல் (collection என்று மாற்றி அமைக்கப்பட்டுள்ளது)
  const inquiriesData = await payload.find({
    collection: 'inquiries',
    limit: 5,
    sort: '-createdAt',
  })

  const newInquiriesCount = await payload.count({
    collection: 'inquiries',
    where: {
      status: {
        equals: 'new',
      },
    },
  })

  const pendingCount = await payload.count({
    collection: 'inquiries',
    where: {
      status: {
        equals: 'pending',
      },
    },
  })

  const convertedCount = await payload.count({
    collection: 'inquiries',
    where: {
      status: {
        equals: 'converted',
      },
    },
  })

  return (
    <div className={baseClass} style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
         Client & Project Dashboard
      </h2>
      
      {/* Quick Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 10px 0' }}>New Inquiries</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
            {newInquiriesCount.totalDocs}
          </p>
        </div>
        
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 10px 0' }}>Pending Follow-ups</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#d97706', margin: 0 }}>
            {pendingCount.totalDocs}
          </p>
        </div>
        
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 10px 0' }}>Converted Projects</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
            {convertedCount.totalDocs}
          </p>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>Recent Inquiries</h3>
        
        {inquiriesData.docs.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No inquiries found yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: '14px' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Company</th>
                <th style={{ padding: '12px' }}>Service</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiriesData.docs.map((inquiry: any) => (
                <tr key={inquiry.id} style={{ borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                  <td style={{ padding: '12px', fontWeight: 500 }}>{inquiry.name}</td>
                  <td style={{ padding: '12px' }}>{inquiry.company || '-'}</td>
                  <td style={{ padding: '12px' }}>{inquiry.service}</td>
                  <td style={{ padding: '12px' }}>
                    <a 
                      href={`/admin/collections/inquiries/${inquiry.id}`} 
                      style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}
                    >
                      View / Reply &rarr;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}