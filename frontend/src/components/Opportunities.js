// frontend/src/components/Opportunities.js

import React, { useEffect, useState } from 'react';
import './Opportunities.css';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/opportunities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setOpportunities(data))
      .catch((error) => console.error('Error fetching opportunities:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/opportunities/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Refresh opportunities after deletion
      const updatedOpportunities = opportunities.filter(
        (opportunity) => opportunity.id !== id
      );
      setOpportunities(updatedOpportunities);
    } catch (error) {
      console.error('Error deleting opportunity:', error.message);
    }
  };

  const handleEdit = (opportunity) => {
    setEditFormData(opportunity);
  };

  const handleCancelEdit = () => {
    setEditFormData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/opportunities/${editFormData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editFormData),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update opportunities state with the edited opportunity
      const updatedOpportunities = opportunities.map((opportunity) => {
        return opportunity.id === editFormData.id ? editFormData : opportunity;
      });
      setOpportunities(updatedOpportunities);
      // Reset editFormData to null
      setEditFormData(null);
    } catch (error) {
      console.error('Error editing opportunity:', error.message);
    }
  };

  return (
    <div>
      <h2>Opportunities</h2>
      {editFormData && (
        <div>
          <form onSubmit={handleSaveEdit}>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={editFormData.name}
              onChange={handleInputChange}
            />
            <label>Value:</label>
            <input
              type='number'
              name='value'
              value={editFormData.value}
              onChange={handleInputChange}
            />
            <label>Stage:</label>
            <input
              type='text'
              name='stage'
              value={editFormData.stage}
              onChange={handleInputChange}
            />
            <label>Close Date:</label>
            <input
              type='date'
              name='close_date'
              value={editFormData.close_date}
              onChange={handleInputChange}
            />
            <label>Customer ID:</label>
            <input
              type='number'
              name='customer_id'
              value={editFormData.customer_id}
              onChange={handleInputChange}
            />
            <label>User ID:</label>
            <input
              type='number'
              name='user_id'
              value={editFormData.user_id}
              onChange={handleInputChange}
            />
            <button type='submit'>Save</button>
            <br></br>
            <button onClick={handleCancelEdit}>Cancel</button>
            <br></br>
          </form>
        </div>
      )}
      {opportunities.length === 0 ? (
        <div class='no_opportunity'>
          <p>No opportunities found</p>
        </div>
      ) : (
        <ul>
          {opportunities.map((opportunity) => (
            <li key={opportunity.id}>
              <strong>Name : {opportunity.name} 
              <br></br>
              Value : {opportunity.value}
              <br></br>
              Stage : {opportunity.stage}
              <br></br>
              Close Date : {opportunity.close_date}
              <br></br>
              Customer ID : {opportunity.customer_id}
              <br></br>
              User ID : {opportunity.user_id}
              </strong>
              <div container='shifting'>
                <button onClick={() => handleEdit(opportunity)}>Edit</button>
                <button onClick={() => handleDelete(opportunity.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Opportunities;
