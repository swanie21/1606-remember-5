import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      replace: true
    }
  },

  model() {
    return this.get('store').findAll('reminder');
  }
});
