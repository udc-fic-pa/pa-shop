import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import * as actions from '../actions';

class CategorySelector extends React.Component {

    componentDidMount() {
        this.props.findAllCategories();
    }

    render() {

        const {categories, findAllCategories, ...remainingProps} = this.props;

        return (

            <select {...remainingProps}>

                <FormattedMessage id='project.catalog.CategorySelector.allDepartments'>
                    {message => (<option value="">{message}</option>)}
                </FormattedMessage>

                {categories && categories.map(category => 
                    <option key={category.id} value={category.id}>{category.name}</option>
                )}

            </select>

        );

    }

}

const mapStateToProps = state => ({
    categories: selectors.getCategories(state)
});

const mapDispatchToProps = {
    findAllCategories: actions.findAllCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
