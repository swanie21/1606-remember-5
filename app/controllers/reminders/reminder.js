import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleEditing() {
      console.log('clicked');
      this.toggleProperty('isEditing', true);
    },
    update() {
      this.toggleProperty('isEditing');
      this.attrs.update();
    }
  },
  isEditing: false
});
