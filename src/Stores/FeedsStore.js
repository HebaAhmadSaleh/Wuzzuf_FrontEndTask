import * as React from "react";
import { EventEmitter } from "events";
import dispatcher from '../Dispatcher';

import axios from 'axios';

class FeedsStore extends EventEmitter {
    constructor() {
        super()
        this.loading = false;
        this.feedData = [];
    }

    getAll() {
        console.log('getAllFeeds');

        let temp = [];
        let filteredData = [];
        var promise = axios.get('http://localhost:3000/feeds')


        return promise;
    }
    getFeeds() {
        console.log('getFeeds');

        var promise = axios.get('http://localhost:4000/feedsData')
        return promise;
    }

    handleActions(action) {
        let self = this;
        if (action.type === "CREATE_FEED") {
            console.log(action);
            axios.post('http://localhost:3000/feeds', {
                id: action.createdObj.id,
                obj: action.createdObj
            })
                .then((response) => { 
                    console.log('this',this)
                    self.emit('change') })
                .catch();
        }
        else if (action.type === "GET_FEEDS") {
            console.log(action.type);
            let temp = [];
            let filteredData = [];
            var promise = axios.get('http://localhost:3000/feeds')
                .then((response) => { response.data.map(item => { temp.push(item.obj.url) }) })
                .then(() => {
                    axios.get('http://localhost:4000/feedsData')
                        .then((response) => {
                            response.data.map(item => {
                                for (let i = 0; i < temp.length; i++) {
                                    if (item.url === temp[i]) {
                                        self.feedData.push(item);
                                    }
                                }
                                // self.emit('change');
                                //  return self.feedData;  
                            })
                        })
                });
            return promise;
        }
        else if (action.type === "REMOVE_FeedUrl") {
            axios.delete('http://localhost:4000/feedsData/' + action.id, {
                id: action.id
            })
                .then(function (response) {
                    self.emit('change');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                });
        }
        else if (action.type === "REMOVE_Feed") {
            axios.delete('http://localhost:3000/feeds/' + action.id, {
                id: action.id
            })
                .then(function (response) {
                    self.emit('change');
                    console.log(response);
                })
                .catch(function (error) {
                });
        }

    }
}

const feedsStore = new FeedsStore;
dispatcher.register(feedsStore.handleActions.bind(feedsStore))
export default feedsStore




