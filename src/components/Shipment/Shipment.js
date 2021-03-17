import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(watch("example")); // watch input value by passing the name of it
   
    return (
      
      <form  className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    
        
        
        
        <input name="name" defaultValue={LoggedInUser.name} ref={register({ required: true }) }placeholder = "your name" />
        {errors.name &&  <span className="error">Name is required</span>}

        <input name="email" defaultValue={LoggedInUser.email} ref={register({ required: true }) }placeholder = "your email" />
        {errors.email && <span className="error">Name is required</span>}

        <input name="location" defaultValue={LoggedInUser.location} ref={register({ required: true }) }placeholder = "your location" />
        {errors.location && <span className="error">Name is required</span>}

        <input name="number"defaultValue={LoggedInUser.number} ref={register({ required: true }) }placeholder = "your number" />
        {errors.number && <span className="error">Name is required</span>}
        
        <input type="submit" />
      </form>
    );
}

export default Shipment;