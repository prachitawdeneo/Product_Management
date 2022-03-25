import React,{useState,useEffect} from 'react'
import HomeNav from './HomeNav'
import {Form,Container,Row,Col, } from 'react-bootstrap'
import { getCategory,getSpecSub,getSubcategory } from '../config/Myservice'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Enter Product Details', 'Enter Sub-Images', 'Add Product'];
export default function Product() {
  const[category,setCategory]=useState()
  const[subCategory,setSubCategory]=useState()
  const [id,setId]=useState()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };



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

const getSub=(id)=>{
  console.log(id);
  getSpecSub({id:id})
  .then(res=>{
    if(res.data.err===0){
      alert(res.data.msg)
      setSubCategory(res.data.sub_categories)
    }
    else{
      alert(res.data.msg)
    }
  })
}
  const handleChange=(event)=>{
    const {name,value}=event.target;
    switch (name) {
      case 'cat':
        getSub(value)
        
        break;
    
      default:
        break;
    }

  }
  return (
    <div>
      <HomeNav/>
      <h2>Add Product</h2>
      <Container>
      <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && 
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Form>
    <Form.Group className="mb-3" >
     <Form.Label>Product Name</Form.Label>
     <Form.Control type="text" placeholder="Enter Product name" name='product_name' onChange={handleChange}/>
   </Form.Group>
      <Form.Group className="mb-3" >
     <Form.Label>Product Description</Form.Label>
    <Form.Control as="textarea" placeholder="Enter product description" name='product_desc' onChange={handleChange}/>
   </Form.Group>
   <Row className="mb-3">
       <Form.Group as={Col} className="mb-3" >
     <Form.Label>Product Stock</Form.Label>
     <Form.Control type="text" placeholder="Enter product stock" name='product_stock' onChange={handleChange}/>
   </Form.Group>
   <Form.Group as={Col} className="mb-3" >
     <Form.Label>Product Rating</Form.Label>
     <Form.Control type="text" placeholder="Enter product rating" name='product_rating' onChange={handleChange}/>
   </Form.Group>
   </Row>
   <Row className="mb-3">
   <Form.Group as={Col}>
       <Form.Label>Category</Form.Label>
       <Form.Select defaultValue="Choose..." name='cat' onChange={handleChange}>
         <option>Choose...</option>
         {category!==undefined &&
        category.map(cat=>
        <option value={cat._id}>{cat.category_name}</option>
        )}
      </Form.Select>
    </Form.Group>
  <Form.Group as={Col}>
      <Form.Label>Sub-Category</Form.Label>
      <Form.Select defaultValue="Choose...">
        <option>Choose...</option>
        {subCategory!==undefined &&
        subCategory.map(sub=>
        <option>{sub.sub_category_name}</option>
        )}
      </Form.Select>
    </Form.Group>
  </Row>
  <Form.Group className="mb-3" >
    <Form.Label>Product Image</Form.Label>
    <Form.Control type="file"/>
  </Form.Group>
    {/* <Button type='submit'>Save</Button> */}
      </Form>
          </Typography>
          }
          {activeStep ===1 &&
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Form>
            <Form.Group className="mb-3" >
            <Form.Label>Product Sub-Images</Form.Label>
            <Form.Control type="file" multiple/>
            </Form.Group>
            </Form>
          </Typography>
          }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
      </Container>
    </div>
  )
}
  //     
