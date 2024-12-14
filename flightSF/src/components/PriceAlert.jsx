import { useState, useEffect, useForm } from 'react';
import { createPortal } from 'react-dom';
import { GoArrowRight } from "react-icons/go";
import { GoX } from "react-icons/go";



function PriceAlert({ setShowModal, selectedCity, airportCodeLookup, closeModal }) {
  const [modalState, setModalState] = useState('form');
  const [errors, setErrors] = useState({});
  const city = airportCodeLookup[selectedCity];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    price: ''
  })
  useEffect(() => {
  }, [selectedCity]);

  // function useForm(priceNotification) {
  //   const [values, setValues] = useState(priceNotification);
  //   return [values, handleChange];
  // }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter a valid name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Please enter an amount.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setModalState('form');
      return;
    }
    setModalState('loading');
    try {
      // const response = await axios.post('http://localhost:5173', {
      //   headers {
      //     'Content-Type': 'application/json',
      //   }, {
      //     body: JSON.stringify(formData),
      //   }
      // })
      setTimeout(() => {
        setModalState('success'); // Transition to success state
      }, 3000);

    } catch (err) {
      console.error('Error creating price notification:', err);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContent">
        {modalState === 'form' && (
          <form onSubmit={handleSubmit}>
            <div className="toolbar">
              <span className="selectedCity">
                {selectedCity}
                <GoArrowRight
                  className="arrow"
                />
                SFO
              </span>
              <GoX className="x" onClick={closeModal} />
            </div>
            <div className="fields">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
              {errors.name && <div className="errorMessage">{errors.name}</div>}

            <div className="fields">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
              {errors.email && <div className="errorMessage">{errors.email}</div>}

            <p>Notify me if price goes below:</p>
            <div>
              <label>
                <div>$
                  <input
                    id="priceAmount"
                    name="price"
                    type="text"
                    placeholder="Enter Amount"
                    value={formData.price}
                    onChange={handleChange}
                    />
                </div>
                  {errors.price && <div className="errorMessage">{errors.price}</div>}
              </label>
            </div>
            <button
              type="submit"
              id="submitNotification"
            >
              Create Notification
            </button>
          </form>
        )}

        {modalState === 'loading' && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {modalState === 'success' && (
          <div className="sucess">
            <p>Notification Created!</p>
            <p>You will be notified if your trip falls below the specified amount.</p>
            <button onClick={closeModal}>Close Window</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceAlert;