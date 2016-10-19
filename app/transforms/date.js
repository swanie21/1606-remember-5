import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      return moment(serialized).format("YYYY-MM-DD");
    }
    return serialized;
  },

  serialize(deserialized) {
    if(deserialized) {
      return moment(deserialized).toISOString();
    }
    return deserialized;
  }
});
