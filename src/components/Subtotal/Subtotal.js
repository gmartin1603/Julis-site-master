import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { getCartTotal } from '../context/StateReducer';
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css'
import { useHistory } from 'react-router-dom';

function Subtotal(props) {

    const [{cart}, dispatch] = useStateValue()
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
        value={getCartTotal(cart)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
      
        <button onClick={() => history.push('./CheckOut')}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;