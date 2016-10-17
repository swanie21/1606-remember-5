import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleEditing() {
      console.log('clicked');
      this.toggleProperty('isEditing', true);
    },
    update() {
      let reminder = this.get('model').getProperties('date');
      reminder.date = new Date(reminder.date);
      this.get('model').save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
        });
      this.toggleProperty('isEditing');
    }
  },
  isEditing: false
});
