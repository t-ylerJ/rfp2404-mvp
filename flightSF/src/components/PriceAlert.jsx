import { useState, useForm } from 'react';

function PriceAlert() {

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

  function CreateNotification() {
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
        }),
      } catch(err) {
        console.error('Error creating price notification:', err);
      }
    }
  }
  return (
    <form>
      <label>Notify me if price goes</label>
      <label>Above</label>
        <input type="radio" name="aboveThreshold" value="aboveThreshold"></input>
      <label>Below</label>
          <input type="radio" name="belowThreshold" value="belowThreshold">Below</input>
          $
          <input type="text" value="amount">Below</input>
        <label name="amount"></label>
      </input>
    </form>
  );
}

export default PriceAlert;