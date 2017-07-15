import dispatcher from '../Dispatcher';



export function GetFeedsbyUrls(){
    dispatcher.dispatch({type:'GET_FEEDS',})

}
export function createFeed(obj){
    let FeedObj={};
    FeedObj.id = (Math.random()*1e16).toString(36),
    FeedObj.name=obj.feedName,
    FeedObj.url=obj.feedUrl;

    dispatcher.dispatch({type:'CREATE_FEED',createdObj:
        FeedObj})
}



export function deleteFeedUrl(id){

    dispatcher.dispatch({type:'REMOVE_FeedUrl',id:
    id})
}
export function deleteFeed(id){

    dispatcher.dispatch({type:'REMOVE_Feed',id:
    id})
}