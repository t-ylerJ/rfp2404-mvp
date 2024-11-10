import { useState, useForm } from 'react';

function PriceAlert({ setShowAlert } ) {

  function useForm(priceNotification) {
    const [values, setValues] = useState(priceNotification);

    const handleChange = (e) => {
      setValues({
        ...values,
        e.target.name: e.target.value,
      });
    };

    return [values, handleChange];
  }



  function createNotification() {
    const [formData, handleChange] = useForm({
      name: '', email: '', upperPrice: 0, lowerPrice: 0;
    })
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:5432', {
          headers {
            'Content-Type': 'application/json',
          }, {
            body: JSON.stringify(formData),
          }
        })
      setShowAlert(false);
      } catch(err) {
        console.error('Error creating price notification:', err);
      }
    }
  }
  return (
    <div className="notification">
      <form onSubmit={createNotification}>
          <input type="text" value="amount" Placeholder="Enter Amount"></input>
        <label>Notify me if price goes</label>
        <label>Above</label>
          <input type="radio" name="aboveThreshold" value="aboveThreshold"></input>
        <label>Below</label>
          <input type="radio" name="belowThreshold" value="belowThreshold">Below  $</input>
        <input type="text" value="amount" Placeholder="Enter Amount"></input>
        <label name="amount"></label>
          <button type="submit">Create Notification</button>
        </input>
      </form>
  </div >
  );
}

export default PriceAlert;