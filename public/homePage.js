'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(data => {
        if (data.success) {   
            location.reload();
        }      
    }); 
};

ApiConnector.current(response => { 
    if (response.success) { 
        ProfileWidget.showProfile(response.data)
    }
}
);

const ratesBoard = new RatesBoard();

ratesBoard.getCurrencyRates = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            console.log(this);
            this.clearTable().bind(this);
            this.fillTable(response.data).bind(this);
        }
    });
}

ratesBoard.getCurrencyRates();