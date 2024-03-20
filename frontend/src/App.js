// frontend/src/App.js

import React from 'react';
import Opportunities from './components/Opportunities';
import OpportunityForm from './components/OpportunityForm';

const App = () => {
  const addOpportunity = async formData => {
    try {
      const response = await fetch('http://localhost:3000/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Refresh opportunities after adding
      window.location.reload();
    } catch (error) {
      console.error('Error adding opportunity:', error.message);
    }
  };

  return (
    <div>
      <h1>CloudPrism</h1>
      <hr></hr>
      <h2>Opportunity Form</h2>
      <OpportunityForm addOpportunity={addOpportunity} />
      <hr></hr>
      <Opportunities />
    </div>
  );
};

export default App;
