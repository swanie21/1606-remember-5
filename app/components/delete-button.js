import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeReminder(reminder) {
      reminder.destroyRecord();
    }
  }
});
