import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import CategorySelector from './CategorySelector';
import * as actions from '../actions';

const initialState = {
    categoryId: '',
    keywords: ''
};

class FindProducts extends React.Component {

    constructor(props) {

        super(props);

        this.state = initialState;

    }

    handleCategoryIdChange(event) {
        this.setState({categoryId: event.target.value});
    }

    handleKeywordsChange(event) {
        this.setState({keywords: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(actions.findProducts(
            {categoryId: this.state.categoryId, 
                keywords: this.state.keywords, page: 0}));
        this.props.history.push('/catalog/find-products-result');
    }

    render () {

        return (

            <form className="form-inline mt-2 mt-md-0" onSubmit={e => this.handleSubmit(e)}>

                <CategorySelector id="categoryId" className="custom-select my-1 mr-sm-2"
                    value={this.state.categoryId} onChange={e => this.handleCategoryIdChange(e)}/>

                <input id="keywords" type="text" className="form-control mr-sm-2"
                    value={this.state.keywords} onChange={e => this.handleKeywordsChange(e)}/>
                
                <button type="submit" className="btn btn-primary my-2 my-sm-0">
                    <FormattedMessage id='project.global.buttons.search'/>
                </button>

            </form>

        );

    }

}

export default withRouter(connect()(FindProducts));
