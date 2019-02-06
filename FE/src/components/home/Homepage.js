import React from 'react'
import Banner from './Banner'
import HrWithText from './HrWithText'
import ProductList from '../shop/ProductList'
import CategoryList from '../shop/CategoryList'
import Footer from './Footer'

const Homepage = (props) => {
	const { history, removeError, banners, products, categories, errors } = props;
	const hr1 = "New Arrivals";

  history.listen(() => {
    removeError();
  });

  console.log('Homepage called');

	if (banners !== undefined) {
		const ps = products.filter(p => p.tag === "new");
		return (
			<div>
				<Banner banner={banners[0]} />
				<CategoryList {...props} categories={categories}/>
				<Footer />			
			</div>
		);
	}
	console.log(errors);
	
	if (errors && errors.message) {
		return(<div className="alert alert-danger text-center">{errors.message}</div>);
	}
	return(<div>Loading...</div>);
}


export default Homepage;
