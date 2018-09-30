import { Meteor } from 'meteor/meteor';
import { Applause } from '../shared/db';

Meteor.startup(() => {});

Meteor.publish('applause', () => Applause.find());

const Api = new Restivus({
    enableCors: true,
    defaultHeaders: {
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'X-CSRF-TOKEN, Content-type'
    }
});
Api.addCollection(Applause, {
    path: 'sounds'
});
Api.addRoute('intent', {}, {
    post: function() {
        const param = this.bodyParams;
        const user = param.args.utterance;
        const msg = user;
        return {
            'bot_id': param.bot_id,
            'user_id': param.user_id,
            lang: 'ja-JP',
            'error_code': 'success',
            status: 'true',
            params: {
                status: 'true',
                message: msg
            }
        };
    }
});