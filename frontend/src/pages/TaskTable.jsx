import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Checkbox,
  Paper,
  TableFooter,
  TablePagination,
} from '@mui/material';
import axios from 'axios';
import { data } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

const TaskTable = () => {
    const [formdata,setformdata]=useState({
    title:'',
    description: '',
    due_date: '',
    priority: '',
    });
    const [rowsperpage,setrowsperpage]=useState(5);
    const [page,setpage]=useState(0);
    const handlepage=(e,newpage)=>{
        setpage(newpage);
    }
    const handleOnRowsPerPageChange=(e)=>{
setrowsperpage(Number.parseInt(e.target.value,5));
    }

 
    useEffect(()=>{
      const fetchdata=async()=>{
        try{
        const data=await axios.get(API_URL);
        if(data){
            setformdata(data);
        }
        }catch(err){
            console.log(err);
        }
    }
    fetchdata();
    },[]);
    return(
        <TableContainer>
            <Table>
                <TableHead>
                        {
                        Objects.keys(formdata[0])
                        .map((item)=>
                        item!=='id'?
                        <TableHead>
                            {item}
                        </TableHead>:null
                    )}
                    
                </TableHead>
                <TableBody>
{
    data.map((item)=>{
        <TableRow key={item.id}>
            <TableCell>
                {item.title}
            </TableCell>
             <TableCell>
                {item.description}
            </TableCell>
             <TableCell>
                {item.due_date}
            </TableCell>
             <TableCell>
                {item.priority}
            </TableCell>
             <TableCell>
                {item.completed}
            </TableCell>
        </TableRow>
    })
}
    </TableBody>
    <TableFooter>
        <TableRow>
            <TablePagination
            page={page}
            onRowsPerPageChange={handleOnRowsPerPageChange}
            rowsPerPageOptions={[5,10,15]}
            count={data.length}
            onPageChange={handlepage}
            rowsPerPage={rowsperpage}>

            </TablePagination>
        </TableRow>

    </TableFooter>
</Table>
        </TableContainer>
    )
};

export default TaskTable;
