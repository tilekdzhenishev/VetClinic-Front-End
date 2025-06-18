import React, { useState } from "react";
import "./BookingForm.css";

const MultiStepFormModal = ({ isOpen = true, onClose = () => { } }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }


      const userRes = await fetch("https://vetclinic-back-end.onrender.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await userRes.json();

      if (!user.id) {
        throw new Error("User ID not found");
      }


      const requestBody = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.mobileNumber,
        email: formData.email,
        address: formData.address,
        pet_name: formData.petName,
        pet_type: formData.petType,
        breed: formData.breed,
        pet_age: formData.age,
        illness_period: formData.illnessPeriod,
        problem: formData.problem,
        date: formData.selectedDate.toISOString().split("T")[0],
        time: formData.selectedTime,
        user_id: user.id,
      };


      const res = await fetch("https://vetclinic-back-end.onrender.com/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create appointment");
      }

      alert("Appointment created successfully!");
      handleClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Error: " + error.message);
    }
  };

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
    selectedDate: new Date(),
    selectedTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid phone number format";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.petType.trim()) {
      newErrors.petType = "Pet type is required";
    }

    if (!formData.breed.trim()) {
      newErrors.breed = "Breed is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!formData.problem.trim()) {
      newErrors.problem = "Problem description is required";
    }

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.selectedTime) {
      newErrors.selectedTime = "Appointment time is required";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.selectedDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.selectedDate = "Cannot select a past date";
    }

    return newErrors;
  };

  const nextStep = () => {
    let validationErrors = {};

    if (step === 1) {
      validationErrors = validateStep1();
    } else if (step === 2) {
      validationErrors = validateStep2();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setErrors({});
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
      selectedDate: new Date(),
      selectedTime: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-booking">
        <div className="step-indicator">
          <span className={step === 1 ? "active" : ""}>1. Booking Details</span>
          <span className={step === 2 ? "active" : ""}>
            2. Choose Date and Time
          </span>
          <span className={step === 3 ? "active" : ""}>3. Confirmation</span>
        </div>
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>

        {step === 1 && (
          <div className="form-step">
            <h3>Personal Information</h3>
            <div className="input-personal-Names">
              <div className="input-group">
                <input
                  name="firstName"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="input-group">
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="input-personal-address">
              <div className="input-group">
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="input-group">
                <input
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={errors.mobileNumber ? "error" : ""}
                />
                {errors.mobileNumber && (
                  <span className="error-message">{errors.mobileNumber}</span>
                )}
              </div>
            </div>
            <div className="input-group">
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div>
              <h3>Pet Information</h3>

              <div className="input-pet-info">
                <div className="input-group">
                  <input
                    name="petName"
                    placeholder="Pet Name"
                    value={formData.petName}
                    onChange={handleChange}
                    className={errors.petName ? "error" : ""}
                  />
                  {errors.petName && (
                    <span className="error-message">{errors.petName}</span>
                  )}
                </div>
                <div className="input-group">
                  <input
                    name="petType"
                    placeholder="Pet Type"
                    value={formData.petType}
                    onChange={handleChange}
                    className={errors.petType ? "error" : ""}
                  />
                  {errors.petType && (
                    <span className="error-message">{errors.petType}</span>
                  )}
                </div>
              </div>

              <div className="input-pet-info">
                <div className="input-group">
                  <input
                    name="breed"
                    placeholder="Breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className={errors.breed ? "error" : ""}
                  />
                  {errors.breed && (
                    <span className="error-message">{errors.breed}</span>
                  )}
                </div>
                <div className="input-group">
                  <input
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className={errors.age ? "error" : ""}
                  />
                  {errors.age && (
                    <span className="error-message">{errors.age}</span>
                  )}
                </div>
              </div>
              <div className="input-pet-info">
                <div className="input-group">
                  <input
                    name="illnessPeriod"
                    placeholder="Illness Period"
                    value={formData.illnessPeriod}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <input
                    name="problem"
                    placeholder="Problem Description"
                    value={formData.problem}
                    onChange={handleChange}
                    className={errors.problem ? "error" : ""}
                  />
                  {errors.problem && (
                    <span className="error-message">{errors.problem}</span>
                  )}
                </div>
              </div>
            </div>

            <button className="btn-step-1" onClick={nextStep}>
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Choose Date and Time</h3>

            <div className="date-time-container">
              <div className="calendar-container">
                <div className="custom-calendar">
                  <input
                    type="date"
                    value={formData.selectedDate.toISOString().split("T")[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    min={new Date().toISOString().split("T")[0]}
                    className={errors.selectedDate ? "error" : ""}
                  />
                  {errors.selectedDate && (
                    <span className="error-message">{errors.selectedDate}</span>
                  )}
                </div>
              </div>

              <div className="time-container">
                <input
                  name="selectedTime"
                  type="time"
                  value={formData.selectedTime}
                  onChange={handleChange}
                  className={errors.selectedTime ? "error" : ""}
                />
                {errors.selectedTime && (
                  <span className="error-message">{errors.selectedTime}</span>
                )}
              </div>
            </div>

            <div className="btns-step-2">
              <button onClick={prevStep}>← Back</button>
              <button onClick={nextStep}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3 className="step-3-title">Confirmation</h3>
            <div className="data-form">
              <p>
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Mobile Number:</strong> {formData.mobileNumber}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
              <p>
                <strong>Pet:</strong> {formData.petName}
              </p>
              <p>
                <strong>Type:</strong> {formData.petType}
              </p>
              <p>
                <strong>Breed:</strong> {formData.breed}
              </p>
              <p>
                <strong>Age:</strong> {formData.age}
              </p>
              {formData.illnessPeriod && (
                <p>
                  <strong>Illness Period:</strong> {formData.illnessPeriod}
                </p>
              )}
              <p>
                <strong>Problem:</strong> {formData.problem}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {formData.selectedDate.toLocaleDateString("ru-RU")}
              </p>
              <p>
                <strong>Time:</strong> {formData.selectedTime}
              </p>
            </div>
            <div className="btns-step-3">
              <button onClick={prevStep}>← Back</button>
              <button className="confirm-btn" onClick={handleSubmit}>
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepFormModal;
