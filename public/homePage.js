'use strict';



/*Выход из личного кабинета*/

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(data => {
        if (data.success) {   
            location.reload();
        }
    }); 
};



/*Получение информации о пользователе*/

ApiConnector.current(response => { 
    if (response.success) { 
        ProfileWidget.showProfile(response.data)
    }
}
);



/*Получение текущих курсов валюты*/

const ratesBoard = new RatesBoard();

function getCurrencyRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

setTimeout(function interval() {
        getCurrencyRates();
        setTimeout(interval, 1000);
    }, 1000);



/*Пополнение баланса*/

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (money) => { 
    ApiConnector.addMoney(money, (response) => {
        const message = new FavoritesWidget();
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            message.setMessage(response.success, "Баланс пополнен" );
        } else {
            message.setMessage(response.success, response.error);
        }
    });
}



/*Конвертирование валюты*/

moneyManager.conversionMoneyCallback = (moneyToConvert) => {
    ApiConnector.convertMoney(moneyToConvert, (response) => {
        const message = new FavoritesWidget();
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            message.setMessage(response.success, "Обмен выполнен" );
        } else {
            message.setMessage(response.success, response.error);
        }
    });
}



/*Перевод валюты*/

moneyManager.sendMoneyCallback = (moneyToTransfer) => {
    ApiConnector.transferMoney(moneyToTransfer, (response) => {
        const message = new FavoritesWidget();
        // updateUsersList();
        if (response.success) {
            console.log(response);
            ProfileWidget.showProfile(response.data);
            message.setMessage(response.success, "Перевод выполнен" );
        } else {
            message.setMessage(response.success, response.error);
        }
    });
}



/*Запрос начального списка избранного*/

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) { 
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (userToFavorites) => {
    ApiConnector.addUserToFavorites(userToFavorites, (response) => {
        const message = new FavoritesWidget();
        if (response.success) { 
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message.setMessage(response.success, "Пользователь добавлен" );
        } else {
            message.setMessage(response.success, response.error);
        }
    });
}



/*Удаление пользователя из избранного*/

favoritesWidget.removeUserCallback = (userToRemove) => {
    ApiConnector.removeUserFromFavorites(userToRemove, (response) => {
        const message = new FavoritesWidget();
        if (response.success) { 
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message.setMessage(response.success, "Пользователь удален" );
        } else {
            message.setMessage(response.success, response.error);
        }
    });
}

