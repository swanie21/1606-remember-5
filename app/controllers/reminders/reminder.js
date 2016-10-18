import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,

  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing', true);
    },

    update() {
      this.get('model').save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
      this.toggleProperty('isEditing');
    },

    revertChanges(id) {
      this.get('store').findRecord('reminder', id).then((reminder) => {
        reminder.rollbackAttributes();
      });
    }
  }
});
