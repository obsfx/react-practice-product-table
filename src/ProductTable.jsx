import React from 'react';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            showOnlyInStock: false,
        };

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
    }

    handleInputOnChange(event) {
        this.setState({
            searchValue: event.target.value,
        });
    }

    handleCheckboxOnChange(event) {
        this.setState({
            showOnlyInStock: event.target.checked,
        });
    }

    render() {
        return (
            <div className="product-table">
                <ProductTableSearch 
                    searchValue={ this.state.searchValue } 
                    onInputChange={ this.handleInputOnChange }
                    showOnlyInStock={ this.state.showOnlyInStock }
                    onCheckboxChange={ this.handleCheckboxOnChange }/>
                
                <ProductTableBody 
                    data={ this.props.data }
                    searchValue={ this.state.searchValue }
                    showOnlyInStock={ this.state.showOnlyInStock }/>
            </div>
        )
    }
}

const ProductTableSearch = (props) => {
    return ( 
        <div className="product-table-search">
           <div className="input-block">
               <input type="text" placeholder="Search" 
                    value={ props.searchValue }
                    onChange={ props.onInputChange } />
           </div> 
           

           <div className="input-block">
               Only show products in stock 
               <input type="checkbox"
                    checked={ props.showOnlyInStock }
                    onChange={ props.onCheckboxChange } />
           </div> 
       </div>
    )
}

const ProductTableBody = (props) => {
    let data = props.data.filter(obj => obj.name.toLowerCase().includes(props.searchValue));

    if (props.showOnlyInStock) {
        data = data.filter(obj => obj.stocked);
    }

    let organizedData = {};

    data.forEach(obj => {
        if (!organizedData[obj.category]) {
            organizedData[obj.category] = [];
        }

        organizedData[obj.category].push(obj);
    });

    return (
        <div className="product-table-body">
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </tbody>
                
                {
                    Object.keys(organizedData).map((key, index) => (
                            <ProductTableBodyPart
                                key={ index }
                                title={ key } 
                                data={ organizedData[key] } />
                    ))
                }
            </table> 
        </div>
    )
}

const ProductTableBodyPart = (props) => {
    return (
        <tbody>
            <tr>
                <th> { props.title }</th>
            </tr>

            {
                props.data.map((obj, index) => (
                    <ProductItem
                        key={ index }
                        productName={ obj.name }
                        productPrice={ obj.price } 
                        stocked={ obj.stocked } />
                ))
            }
        </tbody>
    )
}

const ProductItem = (props) => {
    return (
        <tr className={ !props.stocked ? 'no-stock' : '' }>
            <td> { props.productName } </td>
            <td> { props.productPrice } </td>
        </tr>
    )
}

export default ProductTable;
