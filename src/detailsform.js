import React, { useState } from 'react';
import axios from 'axios';

function DetailsForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: '',
  });

  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [patientId, setPatientId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jsonData = JSON.stringify(formData);
      console.log('JSON Data:', jsonData);
      const response = await axios.post('https://velocityclinicalstage.clinicalconductor.com/CCSWeb/api/v1/patients/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('successful', response.data);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        age: '',
        address: '',
      });
    } catch (error) {
      console.error('error in geeting the response', error);
    }
  };

  const handleGetPatientInfo = () => {
    setShowPatientInfo(true);
  };

  const handleGetInfo = async () => {
    try {
      const response = await axios.get(`https://velocityclinicalstage.clinicalconductor.com/CCSWeb/api/v1/patients/${patientId}`);
      console.log('Patient Info:', response.data);
    } catch (error) {
      console.error('Error fetching patient info', error);
    }
  };

  return (
    <div className="form-container">
      {showPatientInfo ? (
        <div>
          <h2>Get Patient Info</h2>
          <form>
            <div className="form-group">
              <label htmlFor="patientId">Patient ID</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleGetInfo}>Get Info</button>
            </div>
            <div className="form-group">
              <button type="button" onClick={() => setShowPatientInfo(false)}>Previous</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>User Registration</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleGetPatientInfo}>Get Patient Info</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DetailsForm;
