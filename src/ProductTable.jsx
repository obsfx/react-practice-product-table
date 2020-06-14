import React from 'react';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            showOnlyInStock: false,
            data: props.data
        };

        this.allData = props.data;
        this.searchedPool = props.data; 

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this);
    }

    handleInputOnChange(event) {
        this.searchedPool = event.target.value !== '' ? this.getSearchedProducts() : this.allData;

        this.setState({
            inputValue: event.target.value,
            data: this.searchedPool 
        });
    }

    handleCheckboxOnChange(event) {
        this.setState({
            showOnlyInStock: event.target.checked,
            data: event.target.checked ? this.getStockedProducts() : this.searchedPool 
        });
    }

    getStockedProducts() {
        return this.searchedPool.filter(obj => obj.stocked);
    }

    getSearchedProducts() {
        return this.allData.filter(obj => obj.name.toLowerCase()
            .includes(this.state.inputValue.toLowerCase()));
    }

    render() {
        return (
            <div className="product-table">
                <ProductTableSearch 
                    inputValue={ this.state.inputValue } 
                    onInputChange={ this.handleInputOnChange }
                    showOnlyInStock={ this.state.showOnlyInStock }
                    onCheckboxChange={ this.handleCheckboxOnChange }/>
                
                <ProductTableBody data={ this.state.data } />
            </div>
        )
    }
}

const ProductTableSearch = (props) => {
    return ( 
        <div className="product-table-search">
           <div className="input-block">
               <input type="text" placeholder="Search" 
                    value={ props.inputValue }
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
    let organizedData = {};

    props.data.forEach(obj => {
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
