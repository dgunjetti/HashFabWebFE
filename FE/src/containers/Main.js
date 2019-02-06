import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Homepage from '../components/home/Homepage'
import ProductList from '../components/shop/ProductList'
import ShoppingCart from '../components/cart/ShoppingCart'
import { removeError } from '../store/actions/errors'
import getPreviewInfo from '../store/actions/preview'
import Navbar from './Navbar'
import PlaceOrder from '../components/order/PlaceOrder'
import Shop from '../components/shop/Shop'
import BillingAddress from '../components/order/BillingAddress'
import DeliveryAddress from '../components/order/DeliveryAddress'
import CategoryPage from '../components/shop/CategoryPage'
import ProductPage from '../components/shop/ProductPage'

import LogIn from '../components/user/LogIn'
import SignUp from '../components/user/SignUp'
import ForgotPassword from '../components/user/ForgotPassword'
import ResetPassword from '../components/user/ResetPassword'

import MyProfile from '../components/user/MyProfile'
import MyOrders from '../components/order/MyOrders'
import EditBillingAddress from '../components/order/EditBillingAddress'

import Spinner from '../components/home/Spinner'

import About from '../components/home/About'
import Blogs from '../components/home/Blogs'
import Contact from '../components/home/Contact'
import Shipping from '../components/home/Shipping'
import Payment from '../components/home/Payment'
import Terms from '../components/home/Terms'



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentWillMount(){
    this.setState({loading: true});
    this.props.getPreviewInfo()
    .then(() => {
      this.setState({loading: false});   
    })
    .catch(() => this.setState({loading: false}));
  }

  render() {
  	const { errors, removeError, currentUser } = this.props;
    const { banners, categories, products } = this.props;

    if (this.state.loading) {
      return(   
        <Spinner />
      );
    }

    console.log(errors);
  	return (
  		<div>
        <Navbar {...this.props} />
  			<Switch>
          <Route exact path="/" render={props => 
            <Homepage 
              {...props}
              currentUser={currentUser}
              banners={banners}
              categories={categories}
              products={products}
              errors={errors}
              removeError={removeError}
            />} 
          />
          <Route path="/shop" render={props => 
            <Shop
              {...props}
            />}
          />
          <Route path="/products/:id" render={props => 
            <ProductPage
              {...props}
            />}
          />
          <Route path="/products" render={props => 
            <ProductList
              {...props}
              products={products}
            />}
          />
          <Route path="/category/:id" render={props => 
            <CategoryPage
              {...props}
            />}
          />
          <Route path="/login" render={props => 
            <LogIn
              {...props}
              errors={errors}
              removeError={removeError}
            />}
          />
          <Route path="/signup" render={props => 
            <SignUp
              {...props}
              errors={errors}
              removeError={removeError}
            />}
          />

          <Route path="/shoppingcart" component={ShoppingCart} />
          <Route path="/checkout/billing-address" component={BillingAddress} />
          <Route path="/checkout/delivery-address" component={DeliveryAddress} />
          <Route path="/order" component={PlaceOrder} /> 

          <Route path="/about" component={About} /> 
          <Route path="/blogs" component={Blogs} /> 
          <Route path="/contact" component={Contact} /> 
          <Route path="/shipping" component={Shipping} /> 
          <Route path="/terms" component={Terms} /> 
          <Route path="/payment" component={Payment} /> 

          <Route path="/forgot-password" component={ForgotPassword} /> 

          <Route path="/reset-password/:token" render={props => 
            <ResetPassword
              {...props}
              mode="reset-password"
            />}
          />

          <Route path="/change-password" render={props => 
            <ResetPassword
              {...props}
              currentUser={currentUser}
              mode="change-password"
            />}
          />

          <Route path="/myprofile" render={props => 
            <MyProfile
              {...props}
            />}
          />
          <Route path="/edit-billing-address" render={props => 
            <EditBillingAddress
              {...props}
            />}
          />
          <Route path="/myorders" render={props => 
            <MyOrders
              {...props}
              currentUser={currentUser}
            />}
          />
  			</Switch>
  		</div>
  	);
  }
}

function mapStateToProps(state) {
  return {
    banners: state.preview.banners,
    products: state.preview.products,
    categories: state.preview.categories,
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, { removeError, getPreviewInfo })(Main));