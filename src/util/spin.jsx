// LoadingSpinner.js
import React from 'react';
import { ShopTwoTone } from '@ant-design/icons';

const LoadingSpinner = ({ loading, tip }) => {
  return (
    loading && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            position: 'relative',
          }}
        >
          {/* Vòng quay */}
          <div
            style={{
              width: 60,
              height: 60,
              border: '4px solid #000000',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              position: 'absolute',
              top: 0,
              left: 0,
              boxSizing: 'border-box',
            }}
          />
          {/* Logo giữa vòng */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 60,
              height: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ShopTwoTone twoToneColor="#f36b27" style={{ fontSize: 32 }} />
          </div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
        <div style={{ marginTop: 16, position: 'absolute', top: 'calc(50% + 50px)', color: '#f36b27' }}>
          {tip || "Đang xử lý..."}
        </div>
      </div>
    )
  );
};


export default LoadingSpinner;
