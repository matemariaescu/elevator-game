
var Fluxxor = require('fluxxor'),

    constants = require('../constants'),
    Api = require('../Api');


var ActionTypes = constants.ActionTypes;

var AuthStore = Fluxxor.createStore({
    initialize: function() {
      if (localStorage.getItem('user') != null) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = true;
      }
      else {
        this.user = null;
        this.isLoggedIn = false;
      }
      this.isLoggingIn = false;
      this.error = null;

      this.bindActions(ActionTypes.LOGIN, this.onLogin);
      this.bindActions(ActionTypes.LOGOUT, this.onLogout);
    },
    onLogin: function(payload) {
        this.isLoggingIn = true;
        username = payload.username.trim();
        password = payload.password.trim();
        if (username !== '' && password !== '') {
          Api.login(username, password, function(err, res) {
                if (res.status == 200) {
                    this._setLoggedIn(res.body);
                } else {
                    this._setLoggedOut({
                      error: 'Authentication failed'
                    });
                }
          }.bind(this))
        }
        return this.emit('change');
    },
    onLogout: function(payload) {
      Api.logout(function(err, res) {
          this._setLoggedOut();
      }.bind(this));
      return this.emit('change');
    },
    getState: function() {
        return {
            user: this.user,
            isLoggedIn: this.isLoggedIn,
            isLoggingIn: this.isLoggingIn
        };
    },
    _setLoggedOut: function(data) {
        localStorage.removeItem('user');
        this.user = null;
        this.isLoggingIn = false;
        this.isLoggedIn = false;
        if (data)
          this.error = data.error;
        return this.emit('change');
    },
    _setLoggedIn: function(user) {
        if (user != null) {
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
            this.isLoggingIn = false;
            this.isLoggedIn = true;
            this.error = null;
            return this.emit('change');
        } else {
            console.log('errror');
            return _setLoggedOut({
                error: 'There was an error logging in.'
            });
        }
    }           
});

module.exports = AuthStore;
