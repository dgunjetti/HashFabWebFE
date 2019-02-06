import React, { Component } from 'react'
import Category from './Category'
import { connect } from 'react-redux'

class CategoryList extends Component {

	renderCategories = (cs) => {
		return (
			<div className="container-fluid px-5">
				<div className="row">
					{cs}
				</div>
			</div>
		);
	}

  getRenderArr(categories){
    var cs = categories.map(c => (
    		<Category key={c.id} {...this.props} category={c} />
    	));
    return cs;
	}

	render() {
		const { categories } = this.props;
		if (categories === undefined) {
			return (<div>Loading...</div>);
		}
		const cs = this.getRenderArr(categories);

		return (
			this.renderCategories(cs)
		);		
	}
}

export default CategoryList;
