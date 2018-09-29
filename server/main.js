import { Meteor } from 'meteor/meteor';
import { Applause } from '../shared/db';

Meteor.startup(() => {});

Meteor.publish('applause', () => Applause.find());

const Api = new Restivus();
Api.addCollection(Applause, {
    path: 'sounds'
});