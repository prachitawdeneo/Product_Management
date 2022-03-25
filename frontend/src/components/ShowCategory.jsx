import React,{useState,useEffect} from 'react'
import { Tab,Row,Col,Nav, Container,Button, Table,Modal,Form} from 'react-bootstrap'
import HomeNav from './HomeNav'
import { deleteSubCategory, getCategory, getSubcategory,updateSubCategory,deleteCategory } from '../config/Myservice'
import {useNavigate} from 'react-router'



const regForName = RegExp(/^[A-Za-z0-9\s]{3,100}$/);

export default function ShowCategory() {
  const navigate=useNavigate()
  const[category,setCategory]=useState()
    const[subCategory,setSubCategory]=useState()
    const [show, setShow] = useState(false);
    const [index,setIndex]=useState(0);
    const [data, setData] = useState();
    const [Errors,SetError]=useState({
      subcat:''
  })
  const [select,setSelect]=useState()

  const handleClose = () => setShow(false);
  const handleShow = (index) =>{ setShow(true)
    setIndex(index)
  console.log(index);};

    useEffect(()=>{
        const getCat=async()=>{
            try{
              const {data:res}= await getCategory()
              // console.log(res.categories);
              setCategory(res.categories)
            }
            catch(err){
              console.log(err);
            }
            }
            
            getCat()
    },[category])
    
    useEffect(()=>{
            const getSubCat=async()=>{
              try{
                const {data:res}= await getSubcategory()
                // console.log(res.sub_categories);
                setSubCategory(res.sub_categories)
              }
              catch(err){
                console.log(err);
              }
            }
            getSubCat()
    },[subCategory])

    const deleteSubCat=(id)=>{
      console.log(id);
      deleteSubCategory({id:id})
      .then(res=>{
        console.log(res.data);
      })
    }
    const deleteCat=(id)=>{
      console.log(id);
      deleteCategory({id:id})
      .then(res=>{
        if(res.data.err===0){
          alert(res.data.msg)
        }
        else{
          alert(res.data.msg)
        }
      })
    }

    const handleChange=(event)=>{
      const {name,value}=event.target;
        switch (name) {
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

    const editSub=(id)=>{
      console.log(data);
      console.log(id);
      updateSubCategory({subcat:data.subcat,id:id})
      .then(res=>{
        if(res.data.err===0){
          alert(res.data.msg)
          handleClose()
        }
        else{
          alert(res.data.msg)
        }
      })

    }
  return (
    <div>
      <HomeNav/>
      
      <Container>
      <Tab.Container id="left-tabs-example"  >
        
  {category!==undefined && category!==[] ? 
  category.map(cat=>
        <Row style={{height:"auto"}} className='mb-3'>
    
    
        <Col sm={3} >
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey={cat._id} >{cat.category_name}</Nav.Link>
        </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
    
      <Tab.Content>
        <Tab.Pane eventKey={cat._id}>
          <Table responsive>
            <thead>
              <tr>
                <th>Sub-category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
        {subCategory!==undefined && subCategory.map((sub,index)=>
        sub.category_id.toString()=== cat._id.toString() &&
              <tr>
                <td>{sub.sub_category_name}</td>
                <td> <Button className='btn btn-warning' onClick={()=>handleShow(index)}>Update</Button> | <Button className='btn btn-danger' type='submit' onClick={()=>deleteSubCat(sub._id)}>Delete</Button></td>
              </tr>
        )}
            </tbody>
          </Table>
        </Tab.Pane>
        
    <Button className='btn btn-secondary' onClick={()=>deleteCat(cat._id)}>Delete Category</Button>
      </Tab.Content>
  
    </Col>
   

  </Row>
  )
  :
  <div>
  <h1>No Categories Added</h1>
  <Button >Add Category</Button>
  </div>
  }
</Tab.Container>
</Container>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Sub-category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Sub-category name</Form.Label>
              <Form.Control
                name="subcat"
                type="text"
                // {subCategory!==undefined ? defaultValue=subCategory[index].sub_category_name :defaultValue=''}
                // defaultValue={subCategory !== undefined && subCategory[index].sub_category_name!==undefined && subCategory[index].sub_category_name}
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>editSub(subCategory !== undefined && subCategory[index]._id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}








// import React, { useContext, useEffect, useState } from 'react'
// import { Accordion, AccordionContext, Button, Card, Container, Table, useAccordionButton } from 'react-bootstrap'
// import { deleteSubCategory, getCategory, getSubcategory } from '../config/Myservice'
// import HomeNav from './HomeNav'

// function ContextAwareToggle({ children, eventKey, callback }) {
//   const { activeEventKey } = useContext(AccordionContext);

//   const decoratedOnClick = useAccordionButton(
//     eventKey,
//     () => callback && callback(eventKey),
//   );

//   const isCurrentEventKey = activeEventKey === eventKey;

//   return (
//     <button
//       type="button"
//       style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
//       onClick={decoratedOnClick}
//     >
//       {children}
//     </button>
//   );
// }

// export default function ShowCategory() {
//     const[category,setCategory]=useState()
//     const[subCategory,setSubCategory]=useState()
//     useEffect(()=>{
//         const getCat=async()=>{
//             try{
//               const {data:res}= await getCategory()
//               console.log(res.categories);
//               setCategory(res.categories)
//             }
//             catch(err){
//               console.log(err);
//             }
//             }
            
//             getCat()
//           },[])
//           useEffect(()=>{
//             const getSubCat=async()=>{
//               try{
//                 const {data:res}= await getSubcategory()
//                 console.log(res.sub_categories);
//                 setSubCategory(res.sub_categories)
//               }
//               catch(err){
//                 console.log(err);
//               }
//             }
//             getSubCat()
//     },[])

//     const deleteSubCat=(id)=>{
//       console.log(id);
//       deleteSubCategory({id:id})
//       .then(res=>{
//         console.log(res.data);
//       })
//     }
//   return (
//     <div>
//        <HomeNav/>
//        <Container>
//        {category!==undefined && category.map(cat=>
//          <Accordion defaultActiveKey="0">
//          <Card>
//            <Card.Header>
//              <ContextAwareToggle eventKey="0" className='btn'>{cat.category_name}</ContextAwareToggle>
//            </Card.Header>
//            <Accordion.Collapse eventKey="0">
//              <Card.Body>
//            {subCategory!==undefined && subCategory.map(sub=>
//       sub.category_id.toString()=== cat._id.toString() &&
// <div>
//         <p>{sub.sub_category_name}</p>
//         <Button>Update</Button>
//         <Button type='submit' onClick={()=>deleteSubCat(sub._id)}>Delete</Button>
//         </div>
        
//         )}
//         </Card.Body>
//       </Accordion.Collapse>
             
//          </Card>
//          </Accordion>
//         )}
//         </Container>
//     </div>
//   )
// }

// // <div>
// //   <tbody>
// //     <tr>
// //   <th>{cat.category_name}</th>
// //   <th><Button>Delete</Button></th>
// //     </tr>
// //   {subCategory!==undefined && subCategory.map(sub=>
// //       sub.category_id.toString()=== cat._id.toString() &&
// //       <tr>
// //         <td><p>{sub.sub_category_name}</p></td>
// //         <td><Button>Update</Button></td>
// //         <td><Button type='submit' onClick={()=>deleteSubCat(sub._id)}>Delete</Button></td>
// //       </tr>
// //   )}
// //   </tbody>
// // </div>