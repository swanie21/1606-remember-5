import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:reminders', 'Unit | Controller | reminders', {
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('should return the reminder that matches the search input', function(assert) {
  const ctrl = this.subject();
  const reminder = [
    Ember.Object.create({
      title: 'take a shower',
    }),
    Ember.Object.create({
      title: 'watch the debate',
    })
  ];

  ctrl.set('model', reminder);

  assert.equal(ctrl.get('reminders').length, 2, 'starts with two reminders');

  ctrl.set('search', 'watch');
  assert.equal(ctrl.get('reminders').length, 1, 'filters to one reminder matching the search input');
});
