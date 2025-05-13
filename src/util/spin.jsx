// LoadingSpinner.js
import React from 'react';
import { Spin } from 'antd';
import { ShopTwoTone } from '@ant-design/icons';

const LoadingSpinner = ({ loading }) => {
  const antIcon = (
    <div style={{ position: 'relative', width: 60, height: 60 }}>
      <div
        style={{
          position: 'absolute',
          width: 60,
          height: 60,
          border: '4px solid #f36b27',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      <ShopTwoTone
        twoToneColor="#f36b27"
        style={{ fontSize: 48, position: 'absolute', top: 6, left: 6, zIndex: 1 }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

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
        <Spin
          size="large"
          tip="Đang xử lý..."
          indicator={antIcon}
        />
      </div>
    )
  );
};

export default LoadingSpinner;
