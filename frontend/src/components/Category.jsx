import React,{useEffect, useState} from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import HomeNav from './HomeNav'
import { addCategory } from '../config/Myservice';

const regForName = RegExp(/^[A-Za-z0-9\s]{3,100}$/);

export default function Category() {
    const [flag,setFlag]=useState(0);
    const [select,setSelect]=useState()
    const [data, setData] = useState();
    const [subCat, setSubCat] = useState([]);
    const [Errors,SetError]=useState({
        cat:'',
        subcat:''
    })

    // useEffect(()=>{
    //     if(subCat!==undefined){
    //         setData({subcat:subCat})
    //     }
    // },[])

    const handleChange=(event)=>{
        const {name,value}=event.target;
        switch (name) {
            case 'cat':
                Errors.cat=regForName.test(value)? '' : 'Category name should be more than 3 characters'
                break;

            case 'subcat':
                Errors.cat=regForName.test(value)? '' : 'Sub-Category name should be more than 3 characters'
                break;
        
            default:
                break;
        }
        setSelect({Errors,[name]:value},()=>{
            console.log(Errors)
          })
          
        setData({...data,[name]:value})
        console.log(data)

    }

    const submitSubCat=()=>{
        console.log(subCat.length);
            setSubCat([...subCat, data.subcat])
            setFlag(false)
            setData({...data,subcat:[...subCat,data.subcat]})
        console.log(subCat);
    }

    const submitCat=(e)=>{
        // e.preventDefault();
        console.log(subCat);
        // setData({subcat:subCat})
        console.log(data);
        if(data === undefined){
            alert('Please fill the input fields.')
        }
        else if(data.cat=== undefined && data.subcat!==undefined){
            alert('Category name field is mandatory!')
        }
        else{
           addCategory(data)
           .then(res=>{
            console.log(res.data)
            alert(res.data.msg)
            })
        }
    }
  return (
    <div>
        <HomeNav/>
        <Container>
            <h3>ADD CATEGORY</h3>
        <Form onSubmit={(e)=>submitCat(e)}>
  <Form.Group className="mb-3" >
    <Form.Label>Category Name</Form.Label>
    <Form.Control type="text" placeholder="Enter category name" name='cat' onChange={handleChange}/>
  </Form.Group>

  <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Sr No</th>
      <th>Sub-category Name</th>
    </tr>
  </thead>
  <tbody>
      {subCat.map((sub,index)=>
        <tr>
            <td>{index + 1}</td>
            <td>{sub}</td>
        </tr>)}
  </tbody>
</Table>
{flag ?
<div>
    <Form.Group className="mb-3" >
    <Form.Label>Sub-Category Name</Form.Label>
    <Form.Control type="text" placeholder="Enter sub-category name" name='subcat' onChange={handleChange}/>
  </Form.Group>

  <Button variant="primary"  onClick={()=>submitSubCat()}>
  Submit Sub-category
</Button>
</div>
:
<Button variant="primary"  onClick={()=> setFlag(true)}>
  Add Sub-category
</Button>
}
<br/>
<br/>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
    </div>
  )
}
