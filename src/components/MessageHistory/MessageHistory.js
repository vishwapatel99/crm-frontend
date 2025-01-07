import React from 'react';
import PropTypes from 'prop-types';
import './MessageHistory.css';

const MessageHistory = ({ msg }) => {
  if (!msg) return null;

  return msg.map((row, i) => (
    <div key={i} className='message-history mt-3'>
      <div className='send'>
        <div className='sender'>{row.sender}</div>
        <div className='date'>{row.msgAT && new Date(row.msgAT).toLocaleString()}</div>
      </div>
      <div className='message'>{row.message}</div>
    </div>
  ));
}

MessageHistory.propTypes = {
  msg: PropTypes.array.isRequired
}

export default MessageHistory;