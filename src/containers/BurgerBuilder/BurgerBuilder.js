import React ,{Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import thunk from 'redux-thunk';


export class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            // loading: false,
            // error: false

        }
        
    }

    componentDidMount(){
        // console.log(this.props);
        this.props.onInitIngredients();    
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        // this.setState({purchasable: sum > 0});
        return sum > 0; 
    }


    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});

    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // const quaryParams = [];
        // for(let i in this.state.ingredients) {
        //     quaryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // quaryParams.push('price=' + this.props.price)
        // const quaryString = quaryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + quaryString
        // });
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        } else {
            this.props.onSetAuthRedirectPth('/checkout');
            this.props.history.push('/auth');
        }
       
    }

    
    render(){
        // make a copy of ingredients and check if the number of given ingredient is 0 or less
        // , change value to false
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
            // {salad:true , bacon:false, cheese:false, meat: true}
        }
        // console.log("disabled",disabledInfo);

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner />;    
        // }
        return(
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
                
            </Aux>

        );

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initingredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPth: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));