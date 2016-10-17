import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createReminder() {
      let reminder = this.get('model').getProperties('title', 'date', 'notes');
      reminder.date = new Date(reminder.date);
      this.get('store').createRecord('reminder', reminder).save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
