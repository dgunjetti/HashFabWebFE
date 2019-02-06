import React, { Component } from 'react'
import ProductList from '../shop/ProductList'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryPage extends Component {
	componentDidMount() {
	  window.scrollTo(0, 0)
	}
	render() {
		const id = parseInt(this.props.match.params.id);
		const { categories, products } = this.props;

		if (categories === undefined) {
			return(<div>Loading...</div>);
		}

		const category = categories.filter(c => c.id === id);
		const ps = products.filter(p => p.category === category[0].name);

		if (ps.length) {
			return (

				<div className="container-fluid mt-3 px-5">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb mb-0">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to="/shop">Shop</Link>
							</li>
						</ol>
					</nav>
					<div className="d-flex flex-row">
					{/*
						<div classNmae="d-flex flex-column">
							<div>Filter</div>
							<a data-toggle="collapse" href="#collapseExample" 
								role="button" aria-expanded="false" aria-controls="collapseExample">
    						Age
  						</a>
  						<div class="collapse" id="collapseExample">
							<form>
						    <div className="form-check">
						      <label className="form-check-label" for="radio1">
						        <input type="radio" className="form-check-input" id="radio1" 
						        	name="optradio" value="option1" />Option 1
						      </label>
						    </div>
						    <div class="form-check">
						      <label className="form-check-label" for="radio2">
						        <input type="radio" className="form-check-input" id="radio2" 
						        	name="optradio" value="option2" />Option 2
						      </label>
						    </div>
						    <div class="form-check">
						      <label className="form-check-label" for="radio3">
						        <input type="radio" className="form-check-input" id="radio3"
						        	name="optradio" value="option2" />Option 3
						      </label>
						    </div>
						  </form>
						  </div>
  						<div className="collapse" id="collapseExample">
  							 <input type="radio" aria-label="Radio button for following text input "/>
							</div>
							<div>Delivery Time</div>
							<div>Brands</div>

						</div>
					*/}
						<div>
							<ProductList {...this.props} products={ps}/>
						</div>				
					</div>
					
				</div>			
			);
		}
		 
	}
}

function mapStateToProps(state) {
	return {
		categories: state.preview.categories,
		products: state.preview.products
	};
}

export default connect(mapStateToProps, null)(CategoryPage);