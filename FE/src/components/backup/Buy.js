import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PaySelect from './PaySelect'
import PlaceOrder from './PlaceOrder'
import OrderComplete from './OrderComplete'

const Buy = () => {
  return (
    <Switch>
      <Route path="/buy/payselect" component={PaySelect} />
      <Route path="/buy/placeorder" component={PlaceOrder} />
      <Route path="/buy/ordercomplete" component={OrderComplete} />
      <Route exact path="/buy" render={() => <Redirect to="/buy/payselect" />} />
    </Switch>
  );
}

export default Buy;

/*
  buy button -> 
  check state, is a product selected.
  connect -> guest/cust -> clicked buy
  buy -> payselect (cust/buyCart)
*/