import types from './types';
import {db} from '../firebase';

export function getAllMessages(){
    return async function(dispatch){

        const dbRef = db.ref('/message');

        db.ref('/message').on('value', (snapshot)=>{
            

            dispatch({
                type: types.GET_CHAT_MESSAGES,
                messages: snapshot.val()
            })

        } );
        return dbRef;
    }
}

export const sendMessage = msg => async dispatch => {
    return db.ref('/message').push({
        message: msg,
        name: localStorage.getItem('chat_name')
    })
}