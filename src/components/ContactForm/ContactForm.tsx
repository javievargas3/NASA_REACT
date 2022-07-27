import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseTitle, chooseDate, chooseComments } from '../../Redux/slices/RootSlice';
import { Input } from '../SharedComponents';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

interface ContactFormProps {
    id?:string;
    data?:{}
}

interface ContactState {
    date: string;
    comments: string;
    title: string;
}

export const ContactForm = (props:ContactFormProps) => {
    const dispatch = useDispatch();
    const store = useStore();
    const date = useSelector<ContactState>(state => state.date);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
    
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            dispatch(chooseDate(data.date));
            dispatch(chooseTitle(data.title));
            dispatch(chooseComments(data.comments));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                {/* <div>
                    <label htmlFor="name">Notes</label>
                    <Input {...register('author')} name="author" placeholder='Name'/>
                </div> */}
                <div>
                    <label htmlFor="date">Date</label>
                    <Input {...register('date')} name="date" placeholder='date'/>
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <Input {...register('title')} name="title" placeholder='title'/>
                </div>
                <div>
                    <label htmlFor="comments">Comments</label>
                    <Input {...register('comments')} name="comments" placeholder='comments'/>
                </div>
                <Button type ='submit'>Submit</Button>
            </form>
        </div>
    )
}