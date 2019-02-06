import React, { Component } from 'react'
import './Category.css'
import { Link } from 'react-router-dom'

class Category extends Component {

	onClick = () => {
		this.props.history.push(`/category/${this.props.category.id}`)
	}

	render() {
		const {name, img, description} = this.props.category;
		const image = {
			backgroundImage: `url(${img})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			minHeight: "400px",
			backgroundSize: "contain"
		}
		
		return(
			<div className="col-lg-4 col-md-6 col-sm-12 mt-4 category-box">
				<a onClick={this.onClick}>
					<img className="img-fluid pt-3" src={img} alt={name}/>
				</a>				
				<div className="box-text bg-white p-3">
					<p className="box-product" onClick={this.onClick}>{name.toUpperCase()}</p>
					<p className="box-product" onClick={this.onClick}>{description}</p>
				</div>
			</div>
		);
	}
}

export default Category;