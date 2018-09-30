import { Meteor } from 'meteor/meteor';
import { Applause } from '../shared/db';

Meteor.startup(() => {});

Meteor.publish('applause', () => Applause.find());

const Api = new Restivus();
Api.addCollection(Applause, {
    path: 'sounds'
});
Api.addRoute('intent/:title', {}, {
    post: function() {
        const title = this.urlParams.title;
        return { updated: Applause.update({ title: title }, { $set: { registeredat: new Date().getTime() } }) };
    }
});

Meteor.methods({
    play: (id) => {
        Applause.update(id, { $set: { registeredat: new Date().getTime() } });
    }
});