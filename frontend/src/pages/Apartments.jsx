import {Table,Box,TableHead,TableRow,TablePagination} from"@mui/material"
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer"
import { useEffect, useState } from "react"
import axios from "axios";
import { FormatItalic } from "@mui/icons-material";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";



const Apartments=()=>{
 const [data,setdata]=useState([]);
 const [page,setpage]=useState(0);
 const [rowsperpage,setrowsperpage]=useState(5);
 const [editingid,seteditingid]=useState(null);
 const [editFormData, setEditFormData] = useState({}); 
 const handlepagechange=(e,nextpage)=>{
    setpage(nextpage);
 }
 const navigate=useNavigate() 
 const handledeleteclick=async(id)=>{
    console.log(id);
     await axios.delete(`http://127.0.0.1:8000/api/apartments/${id}`);
     const response =await axios.get("http://127.0.0.1:8000/api/apartments/");
     setdata(response.data);
 }
 const handlechangesrowperpage=(e)=>{
    setrowsperpage(Number.parseInt(e.target.value));
    setpage(0);
 }

 useEffect(()=>{
   const   fetchdata=async()=>{
    try{
        const response=await axios.get("http://127.0.0.1:8000/api/apartments/");
        setdata(response.data);
    }catch(err){
        console.log(err);
    }
}
fetchdata();
},[])
const handleeditclick=(id)=>{
    const currentItem=data.find((item)=>item.id===id);
    seteditingid(id);
    setEditFormData({...currentItem});
}
const handleChange=(e)=>{
setEditFormData((prev)=>({...prev,[e.target.name]:e.target.value}));
}
const handleSubmit=async(e)=>{
  e.preventDefault();
try{
    await axios.put(`http://127.0.0.1:8000/api/apartments/${editingid}/`,editFormData)
    const response=await axios.get("http://127.0.0.1:8000/api/apartments/");
    setdata(response.data);
    seteditingid(null);
    setEditFormData({});
    navigate('/apartments')
    naviget 
}catch(err){
    console.log(err);
}
}
const paginatedData=data.slice((page)*rowsperpage,(page+1)*rowsperpage);

    return (
        <div>
            
        <TableContainer sx={{marginTop:10}}>      
            <Table>
                <TableHead>
                    <TableRow>
                     {Object.keys(data[0] || {}).map((item)=>
                            item !== "id" && item !== "__v"?<TableCell sx={{font:10,fontSize:20,fontWeight:'bold'}} key={item}>{item}</TableCell>:null

                     )}
                     <TableCell sx={{ font:10,fontSize:20,fontWeight:'bold'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        paginatedData.map((item)=>
                            (editingid!==item.id)?
                            <TableRow key={item.id} >
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                  <TableCell>
                                    {item.Rent}
                                </TableCell>
                                  <TableCell>
                                    {item.Bedroom}
                                </TableCell>
 <TableCell>
                                    {item.Posted}
                                </TableCell>
                                <TableCell>
                                    {item.city}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={()=>{handleeditclick(item.id)}}>
                                        Edit
                                    </Button>
                                    <Button onClick={()=>{
                                        handledeleteclick(item.id)
                                    }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>:

    
   <TableRow key={item.id} >
  <TableCell>
    <TextField name="name" label="Name" value={editFormData.name || ''} onChange={handleChange} />
  </TableCell>
  <TableCell>
    <TextField name="Rent" label="Price" value={editFormData.Rent || ''} onChange={handleChange} />
  </TableCell>
  <TableCell>
    <TextField name="Bedroom" label="Bedroom" value={editFormData.Bedroom || ''} onChange={handleChange} />
  </TableCell>
   <TableCell>
    <TextField name="Posted" label="Posted" value={editFormData.Posted || ''} onChange={handleChange} />
  </TableCell>
  <TableCell>
    <Button type="submit" onClick={handleSubmit}>Submit</Button>
  </TableCell>
</TableRow>

                        
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>

                    </TableRow>
                </TableFooter>
             </Table>
        </TableContainer>
        </div>
  
    )
}
export default Apartments;