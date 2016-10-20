import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['search'],
  search: null,

  reminders: Ember.computed('search', function() {
    const search = this.get('search');
    let reminders = this.get('model');

    if(search) {
      reminders = reminders.filter(reminder => {
        return reminder.get('title').toLowerCase().match(search);
      });
    }
    return reminders;
  }),

  actions: {
    handleSearch(search) {
      this.set('search', search && search.toLowerCase());
    }
  }
});
