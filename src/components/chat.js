import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { getAllMessages, sendMessage } from '../actions';
import {Field, reduxForm} from 'redux-form';
import Input from './input';

class Chat extends Component {
    componentDidMount(){
        if(!localStorage.getItem('chat_name')){
            return this.props.history.push('/set-name');
        }
       this.dbRef = this.props.getAllMessages();
    }

    componentWillUnmaunt(){
        if(this.dbRef){
            this.dbRef.off();
        }
    }

    handleSendMessage = ({message}) => {
        console.log('send message', message);
        this.props.sendMessage(message);

        this.props.reset();
    }

    render(){
        const { handleSubmit, messages} = this.props;
        console.log('chat messages', this.props.messages);

        const messageElements = Object.keys(messages).map(key => {
            const message= messages[key];
            return(
                <li key={key} className="collection-item">
                   <b>{message.name}</b> {message.message}
               </li>
            )
        })


        return(
            <div>
                <div className="right-align">Logged in as: {localStorage.getItem('chat_name')}</div>
                <h1 className="center">Chat Room</h1>
                <ul className="collection">
                    {messageElements}

                </ul>
                <form onSubmit={handleSubmit(this.handleSendMessage)}>
                    <div className="row">
                        <Field name="message" label="message" component={Input} />
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        messages: state.chat.messages
    }
}

const validate = ({message}) =>message ? { } : {message: 'Please enter message'}
export default reduxForm({
    form: 'new-message',
    validate
}) (connect(mapStateToProps, {
    getAllMessages,
    sendMessage
}) (Chat));


// export default reduxForm() (connect(mapStateToProps, {
//     getAllMessages
// }) (Chat));