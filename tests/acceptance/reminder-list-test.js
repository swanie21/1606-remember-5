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

  click('.submit-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'do laundry');
    assert.equal(Ember.$('.reminder-date:last').text().trim(), 'Tue Oct 11 2016 18:00:00 GMT-0600 (MDT)');
  });
});
