/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list', {
  beforeEach() {
    server.createList('reminder', 5);
  },
  afterEach() {
    server.shutdown();
  }
});

test('viewing the homepage', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), Ember.$('.spec-reminder-title').text().trim());
  });
});

test('clicking on "Add reminder" button creates a new reminder', function(assert) {

  visit('/');
  click('.add-new-button');
  fillIn('.reminder-title-input', 'do laundry');
  fillIn('.reminder-date-input', '2016-10-12');
  fillIn('.reminder-notes-input', 'hang clothes up afterwards');

  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(find('.reminder-title-input').val(), 'do laundry');
    assert.equal(find('.reminder-date-input').val(), '2016-10-12');
    assert.equal(find('.reminder-notes-input').val(), 'hang clothes up afterwards');
  });

  click('.save-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'do laundry');
    assert.equal(Ember.$('.reminder-date:last').text().trim(), '2016-10-12');
  });
});

test('clicking on "Edit reminder" button allows the user to edit the reminder', function(assert) {

  visit('/');
  click('.add-new-button');
  fillIn('.reminder-title-input', 'do laundry');

  andThen(function() {
    assert.equal(find('.reminder-title-input').val(), 'do laundry');
  });

  click('.save-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'do laundry');
  });

  click('.spec-reminder-item:last');
  click('.edit-button');
  fillIn('.reminder-title-input', 'feed the dog');

  andThen(function() {
    assert.equal(find('.reminder-title-input').val(), 'feed the dog');
  });

  click('.save-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'feed the dog');
  });
});

test('when in edit mode, clicking the "Revert" button rolls back any changes made to reminder', function(assert) {

  visit('/');
  click('.add-new-button');
  fillIn('.reminder-title-input', 'feed the dog');

  andThen(function() {
    assert.equal(find('.reminder-title-input').val(), 'feed the dog');
  });

  click('.save-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'feed the dog');
  });

  click('.spec-reminder-item:last');
  click('.edit-button');
  andThen(function() {
    assert.equal(find('.reminder-title-input').val(), 'feed the dog');
  });

  fillIn('.reminder-title-input', 'feed the cat');
  andThen(function() {
    assert.equal(find('.reminder-title-input').val(), 'feed the cat');
  });

  click('.revert-button');
  andThen(function() {
    assert.equal(find('.reminder-title-input').val(), 'feed the dog');
  });

});

test('when editing a reminder a warning in the sidebar will display if user has unsaved changes', function(assert) {
  visit('/');
  click('.spec-reminder-item:last');
  click('.edit-button');
  fillIn('.reminder-title-input', 'make coffee');

  andThen(function() {
    assert.equal(Ember.$('.save-cue:visible').length, 1);
  });
});

test('clicking the "delete" button deletes a reminder from the store', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });

  click('.remove-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 4);
  });
});

test('filter reminder to only show that one reminder that is searched for', function(assert) {
  visit('/');
  fillIn('.search-input', 'take a shower');

  andThen(function() {
    assert.equal(find('.spec-reminder-item').length, 1);
  });
});
