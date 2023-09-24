import React, { useState, useEffect } from 'react';

function Card({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [approvalDetails, setApprovalDetails] = useState(null);

  const handleMouseEnter = async () => {
    if (item.requestStatus === 'Approved') {
      // Fetch approval details from your API
      try {
        const response = await fetch(`/api/approvalDetails/${item.requestId}`);
        if (response.ok) {
          const data = await response.json();
          setApprovalDetails(data);
        }
      } catch (error) {
        console.error('Error fetching approval details:', error);
      }
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setApprovalDetails(null);
  };

  const cardClass = `card ${isHovered && 'hovered-card'}`;

  return (
    <div
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-header">
        <h3>Item ID: {item.itemId}</h3>
      </div>
      <div className="card-body">
        <p>Description: {item.itemDescription}</p>
        <p>Make: {item.itemMake}</p>
        <p>Category: {item.itemCategory}</p>
        <p>Valuation: {item.itemValuation}</p>
        <p>Request ID: {item.requestId}</p>
        <p>Employee ID: {item.employeeId}</p>
        <p>Request Date: {item.requestDate}</p>
        <p>Request Status: {item.requestStatus}</p>
        <p>Return Date: {item.returnDate}</p>
        <p>Loan ID: {item.loanId}</p>
        <p>Duration (Years): {item.durationInYears}</p>
        {isHovered && approvalDetails && (
          <div className="approval-details">
            {/* Display approval details fetched from API */}
            <p>Approval Details:</p>
            <ul>
              <li>Approval Date: {approvalDetails.approvalDate}</li>
              <li>Approver: {approvalDetails.approver}</li>
              {/* Add more approval details as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function CardList({ items }) {
  return (
    <div className="card-list">
      {items.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
}

function App() {
  const data = [
    // Your array of objects here
    // ...
  ];

  return (
    <div className="App">
      <h1>Items</h1>
      <CardList items={data} />
    </div>
  );
}

export default App;
