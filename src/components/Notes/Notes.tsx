import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core';
import { ContactForm } from '../ContactForm';
import {Navbar} from '../Navbar'

const columns: GridColDef[] = [
    { field: 'date', headerName: 'date ', width: 90, hide: true },
    { field: 'date', headerName: 'date', flex: 1 },
    { field: 'title', headerName: 'title', flex: 1 },
    { field: 'comments', headerName: 'comments', flex: 1 },
];

interface gridData {
    data: {
        id?:string
    }
}

export const Notes = () => {

    let { contactData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}});
    const [selectionModel, setSelectionModel] = useState<any>([]);
    console.log(contactData)

    let handleOpen = () => {
        setOpen(true)
    };
    let handleClose = () => {
        setOpen(false)
    };

    let deleteData = () => {
        server_calls.delete(selectionModel);
        console.log(gridData.data.id);
        getData();
        setTimeout( () => { window.location.reload(); }, 1000)
    }

    console.log(gridData.data.id!);
    console.log(`testing for data ${contactData}`)

    return (
        
        <div style={{ height: 400, width: '100%' }}>
            <Navbar/>
            <br></br>
            <h2>My NASA Notes</h2>
            <br></br>

        <DataGrid rows={ contactData } columns={ columns } pageSize={ 5 } checkboxSelection={true} 
        onSelectionModelChange={ (item) => {
            setSelectionModel(item)
						console.log(item)
          }}
        />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

        {/* Dialog pop-up */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Note</DialogTitle>
            <DialogContent>
                <DialogContentText>Update Note</DialogContentText>
                    <ContactForm id={selectionModel!}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">Done</Button>
            </DialogActions>
        </Dialog>
            
        </div>
    )
}