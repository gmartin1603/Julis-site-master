import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { getCartTotal } from '../context/StateReducer';
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css'
import { useHistory } from 'react-router-dom';

function Subtotal(props) {

    const [{cart, user}, dispatch] = useStateValue()
    const history = useHistory()

    

    return (
        <div className="subtotal">
            <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({cart.length} items): <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
      
        <button onClick={() => user? history.push('./CheckOut') : history.push('./Log In') & alert("Please create an account to checkout")}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;