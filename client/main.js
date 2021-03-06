import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Applause } from '../shared/db';

import { Howl } from 'howler';

const status = ReactiveVar('読み込み中…');
const sounds = [],
    registerTime = [];

Template.body.onCreated(function() {
    Meteor.subscribe('applause', () => {

        this.autorun(() => {

            Applause.find().forEach((doc) => {
                const id = doc._id;
                sounds[id] = new Howl({
                    src: doc.src
                });
                if (registerTime[id]) {
                    if (registerTime[id] < doc.registeredat) {
                        console.log(id);
                        setTimeout(function() {
                            sounds[id].play();
                        }, Math.random() * 1500);
                        registerTime[id] = doc.registeredat;
                    }
                } else {
                    registerTime[id] = new Date().getTime();
                }
            });
            status.set('準備完了');

        });

    });
});

Template.body.helpers({
    status: () => status.get(),
    applause: () => Applause.find()
});

Template.body.events({
    'click .play': (e) => {
        const aid = $(e.target).closest('ons-list-item').attr('id');
        Meteor.call('play', aid);
    }
});