// frontend/src/components/OpportunityForm.js

import React, { useState } from 'react';
import './Opportunities.css';

const OpportunityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    stage: '',
    close_date: '',
    customer_id: '',
    user_id: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Reset form fields after successful submission
      setFormData({
        name: '',
        value: '',
        stage: '',
        close_date: '',
        customer_id: '',
        user_id: ''
      });
    } catch (error) {
      console.error('Error adding opportunity:', error.message);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Value:</label>
          <input type="number" name="value" value={formData.value} onChange={handleChange} />
        </div>
        <div>
          <label>Stage:</label>
          <input type="text" name="stage" value={formData.stage} onChange={handleChange} />
        </div>
        <div>
          <label>Close Date:</label>
          <input type="date" name="close_date" value={formData.close_date} onChange={handleChange} />
        </div>
        <div>
          <label>Customer ID:</label>
          <input type="number" name="customer_id" value={formData.customer_id} onChange={handleChange} />
        </div>
        <div>
          <label>User ID:</label>
          <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} />
        </div>
        <button type="submit">Add Opportunity</button>
      </form>
    </div>
  );
};

export default OpportunityForm;
