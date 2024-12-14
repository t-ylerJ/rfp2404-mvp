import { useState, useEffect, useForm } from 'react';
import { createPortal } from 'react-dom';
import { GoArrowRight } from "react-icons/go";
import { GoX } from "react-icons/go";



function PriceAlert({ setShowModal, selectedCity, airportCodeLookup, closeModal }) {
  const [modalState, setModalState] = useState('form');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const city = airportCodeLookup[selectedCity];

  const [formData, handleChange] = useForm({
    name: '', email: '', price: ''
  })
  useEffect(() => {
  }, [selectedCity]);

  function useForm(priceNotification) {
    const [values, setValues] = useState(priceNotification);

    const handleChange = function (e) {
      const { name, value } = e.target
      const formValues = { ...values, [name]: value }
      setValues(formValues);
    };
    return [values, handleChange];
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage1('');
    setErrorMessage2('');
    setErrorMessage3('');
    let isValid = true;

    if (!formData.name.trim() || !formData.email.trim() || formData.price.trim()) {

      if (!formData.name.trim()) {
        setErrorMessage1('Please enter a valid name.');
      }
      if (!formData.email.trim()) {
        setErrorMessage2('Please enter a valid email address.');
      }
      if (!formData.price.trim()) {
        setErrorMessage3('Please enter an amount.');
      }
      isValid = false;
      setModalState('form');
      return;
    }
    if (isValid) {
      setModalState('loading');
    }
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
  }
  console.log(selectedCity)
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
              {errorMessage1 && (
                <span className="errorMessage">{errorMessage1}</span>
              )}
            </div>

            <div className="fields">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errorMessage2 && (
                <span className="errorMessage">{errorMessage2}</span>
              )}
            </div>

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
                    {errorMessage3 && (
                      <span className="errorMessage">{errorMessage3}</span>
                    )}
                </div>
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