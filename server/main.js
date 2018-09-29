import { Meteor } from 'meteor/meteor';
import { Applause } from '../shared/db';

Meteor.startup(() => {});

Meteor.publish('applause', () => Applause.find());

const Api = new Restivus({
    enableCors: true
});
Api.addCollection(Applause, {
    path: 'sounds'
});
Api.addRoute('intent', {}, {
    post: function() {
        console.log(this.bodyParams);
    }
});