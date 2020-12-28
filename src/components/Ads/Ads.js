import React from 'react';
import './Ads.css'
import Ad from '../Ad/Ad';

function Ads(props) {
    return (
        <div className="ads">
            <Ad
            title="Venus Razors"
            price="$12.62"
            rating="4.5"
            image="https://images-na.ssl-images-amazon.com/images/I/81fD64QH7yL._AC_UL200_SR200,200_.jpg"
            url="https://www.amazon.com/Gillette-Venus-Sensitive-Disposable-Packaging/dp/B0039LMTBU/ref=zg_bs_13269991011_3?_encoding=UTF8&psc=1&refRID=D14FPBQ4GV9NSGNWECK5"
            />
            <Ad
            title="Proactive Treatment"
            price="$12.62"
            rating="4.5"
            image="https://images-na.ssl-images-amazon.com/images/I/71w9QOQ862L._SL1500_.jpg"
            url="https://www.amazon.com/Proactiv-Solution-3-Step-Treatment-System/dp/B084YD7Z6Q?ref_=Oct_s9_apbd_omwf_hd_bw_b8VN6bb&pf_rd_r=QQ5TPY6XW6J9W7NE0M57&pf_rd_p=f43c2dca-e137-5816-a874-d0c0d36fdaf8&pf_rd_s=merchandised-search-10&pf_rd_t=BROWSE&pf_rd_i=7792636011"
            />
        </div>
    );
}

export default Ads;