import React,{ Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';



class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            customer: {
                name: 'Siamak',
                address: {
                    street: 'Test2 street',
                    postalCode: 'J2X1R4',
                    country: 'Canada'
                },
                email: 'sss@gmail.com'

            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json',order)
            .then(response =>  {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });

    }
    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>

            </div>
        )
    }
}

export default ContactData;