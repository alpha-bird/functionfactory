const ApiUrl = 'https://paymentserver.herokuapp.com/';

function getCardToken( name, cardnumber, exp_month, exp_year, cvc ) {
    var data = {
        cardnumber : cardnumber,
        exp_month : exp_month,
        exp_year : exp_year,
        cvc : cvc,
        name : name
    };
    console.log(data);
    return fetch( ApiUrl + 'get_cardtoken' , {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(resp => resp.json() );
};

function RegisterCustomer( email, description, paysource ) {
    var data = {
        email : email,
        description : description,
        source : paysource
    }

    return fetch( ApiUrl + 'add_customer', {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then((response) => response.json());
}

function SetSubscription( customerid, plan ) {
    var data = {
        customerid : customerid,
        plan : plan
    }

    return fetch( ApiUrl + 'set_subscription', {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response) => response.json());
}
export { getCardToken, RegisterCustomer, SetSubscription };