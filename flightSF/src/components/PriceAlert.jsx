import { useState, useForm } from 'react';
import { GoArrowRight } from "react-icons/go";
import { GoX } from "react-icons/go";


function PriceAlert({ setShowAlert } ) {

  function useForm(priceNotification) {
    const [values, setValues] = useState(priceNotification);

    const handleChange = function (e) {
      const [name, value] = [e.target.name, e.target.value];
      const formValues = { ...values, name: value}
      setValues(formValues); // Can use ...values as first key
    };

    return [values, handleChange];
  }



  function createNotification() {
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
      setShowAlert(false);
      } catch(err) {
        console.error('Error creating price notification:', err);
      }
    }
  }
  return (
    <div className="notification">
      <span className="toolbar"><GoX /></span>
      <form onSubmit={createNotification} id="priceAlert">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"/>
        <span id="nameError">Name is required.</span>

        <label for="name">Email:</label>
        <input type="text" id="email" name="email"/>
        <span id="nameError">Email is required.</span>

        <p>Notify me if price goes</p>
        <label>Above</label>
        <input type="radio" name="aboveThreshold" value="aboveThreshold"/>

        <label>Below</label>
        <input type="radio" name="belowThreshold" value="belowThreshold"/>Below
        <div className="alertAmount">
          <span>$</span>
          <input type="text" value="amount" Placeholder="Enter Amount"/>
        </div>
        <label name="amount"></label>
          <button type="submit">Create Notification</button>
      </form>
  </div>
  );
}

export default PriceAlert;