import { useState, useEffect, useForm } from 'react';
import { createPortal } from 'react-dom';
import { GoArrowRight } from "react-icons/go";
import { GoX } from "react-icons/go";



function PriceAlert({ setShowModal, selectedCity, airportCodeLookup, closeModal }) {
  const [modalState, setModalState] = useState('form');
  const city = airportCodeLookup[selectedCity];

  useEffect(() => {
  }, [selectedCity]);

  function useForm(priceNotification) {
    const [values, setValues] = useState(priceNotification);

    const handleChange = function (e) {
      const [name, value] = [e.target.name, e.target.value];
      const formValues = { ...values, name: value}
      setValues(formValues);
    };
    return [values, handleChange];
  }



  const createNotification = async (e) => {
    const [formData, handleChange] = useForm({
      name: '', email: '', upperPrice: 0, lowerPrice: 0
    })
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // const response = await axios.post('http://localhost:5173', {
        //   headers {
        //     'Content-Type': 'application/json',
        //   }, {
        //     body: JSON.stringify(formData),
        //   }
        // })

        setShowModal(false);
      } catch(err) {
        console.error('Error creating price notification:', err);
      }
    }
  }
  console.log(selectedCity)
  return (
    <div className="priceAlertContainer">
      <div className="modalContent">
        <form onSubmit={createNotification}>

          <div className="toolbar">
            <span className="selectedCity">
              {selectedCity}
              <GoArrowRight
                className="arrow"
              />
              SFO
            </span>
            <GoX className="x" onClick={closeModal}/>
          </div>
          <div className="fields">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <span id="nameError">Name is required.</span>
          </div>

          <div className="fields">
            <label htmlFor="name">Email:</label>
            <input type="text" id="email" name="email" />
            <span id="nameError">Email is required.</span>
          </div>

          <p>Notify me if price goes:</p>
          <div>
            <label>
              <input type="radio" name="threshold" value="aboveThreshold" />
              Above
            </label>
            <label>
              <input type="radio" name="threshold" value="belowThreshold" />Below
              <div>$
                <input id="priceAmount" className="alertAmount" type="text" placeholder="Enter Amount" />
              </div>
            </label>
          </div>

          <button type="submit" id="submitNotification">Create Notification</button>
        </form>
      </div>
    </div>
  );
}

export default PriceAlert;