import React, { useState } from "react";
import "./BookingForm.css";

const MultiStepFormModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    petName: "",
    petType: "",
    breed: "",
    age: "",
    illnessPeriod: "",
    problem: "",
    selectedDate: "",
    selectedTime: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleClose = () => {
    onClose();
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      address: "",
      petName: "",
      petType: "",
      breed: "",
      age: "",
      illnessPeriod: "",
      problem: "",
      selectedDate: "",
      selectedTime: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>

        <div className="step-indicator">
          <span className={step === 1 ? "active" : ""}>1. Booking Details</span>
          <span className={step === 2 ? "active" : ""}>2. Select Date & Time</span>
          <span className={step === 3 ? "active" : ""}>3. Confirmation</span>
        </div>

        {step === 1 && (
          <div className="form-step">
           
            
            <h3>Personal Information</h3>
            <div className="input-personal-Names"> 
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
           </div>
           <div className="input-personal-address"> 
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
            </div>
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        
            
            <div>
            <h3>Pet Information</h3>
            <input name="petName" placeholder="Pet Name" value={formData.petName} onChange={handleChange} />
            <input name="petType" placeholder="Pet Type" value={formData.petType} onChange={handleChange} />
            <input name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} />
            <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            <textarea name="problem" placeholder="Problem description" value={formData.problem} onChange={handleChange} />
            <button onClick={nextStep}>Next →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Select Date & Time</h3>
            <input name="selectedDate" type="date" value={formData.selectedDate} onChange={handleChange} />
            <input name="selectedTime" type="time" value={formData.selectedTime} onChange={handleChange} />
            <button onClick={prevStep}>← Back</button>
            <button onClick={nextStep}>Next →</button>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Confirmation</h3>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.mobileNumber}</p>
            <p><strong>Pet Name:</strong> {formData.petName}</p>
            <p><strong>Date:</strong> {formData.selectedDate}</p>
            <p><strong>Time:</strong> {formData.selectedTime}</p>
            <button onClick={prevStep}>← Back</button>
            <button className="confirm-btn" onClick={handleClose}>Confirm Booking</button>
          </div>
        )}
      </div>
    </div>
  );
};


export default MultiStepFormModal;