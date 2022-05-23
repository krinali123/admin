// import Dialog  from './Dialog'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Doctor() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])

  const handleDelete = (id) =>{
    let localData = JSON.parse(localStorage.getItem('Doctor'));
    let filterData = localData.filter((d,i) => d.id !== id);
    localStorage.setItem("Doctor",JSON.stringify(filterData))
    loadData()

}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  let Doctor = {
    name: yup.string().required('enter name'),
    designation: yup.string().required('please enter designation'),
    salary: yup.string().required('please enter salary'),
  }


  let schema = yup.object().shape(Doctor);

  const formik = useFormik({
    initialValues: {
      name: '',
      designation: '',
      salary: '',
    },
    validationSchema: schema,
    onSubmit: (value, { resetForm }) => {
      handleSubmitdata(value)
      resetForm();
    }
  })

  const handleSubmitdata = (value) => {
    let localdata = JSON.parse(localStorage.getItem("Doctor"))

    let data = {
      id: Math.floor(Math.random() * 1000),
      ...value
    }

    if (localdata === null) {   
      localStorage.setItem("Doctor", JSON.stringify([data]))
    } else {
      localdata.push(data)
      localStorage.setItem("Doctor", JSON.stringify(localdata))
    }

    setOpen(false);
    loadData()

  }

  const columns1 = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'designation', headerName: ' designation', width: 130 },
    { field: 'salary', headerName: 'salary', width: 130 },
    { field: 'action', headerName: 'acton', width: 130 ,
    renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleDelete(params.row.id) } startIcon={<DeleteIcon />}>
            Delete
        </Button>
    )},
  ];

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("Doctor"))

    if (localData !== null) {
      setData(localData)
    }
  }

  useEffect(
    () => {
      loadData()
    },
  [])

  return (

  
    <Box>
      <Container>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Doctor
          </Button>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data}
              columns={columns1}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Doctor</DialogTitle>
            <Formik value={formik}>
              <Form onSubmit={formik.handleSubmit}>
                <DialogContent>

                  <TextField
                    margin="dense"
                    id="name"
                    label="name"
                    type="name"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.name}
                    helperText={formik.errors.name}
                    error={formik.errors.name ? true : false}
                  />
                  <TextField
                    margin="dense"
                    id="designation"
                    label="designation"
                    type="designation"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.designation}
                    helperText={formik.errors.designation}
                    error={formik.errors.designation ? true : false}
                  />
                  <TextField
                    margin="dense"
                    id="salary"
                    label="salary"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.salary}
                    helperText={formik.errors.salary}
                    error={formik.errors.salary ? true : false}

                  />
                  
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                  </DialogActions>
                </DialogContent>
              </Form>
            </Formik>
          </Dialog>
        </div>
      </Container>
    </Box>

  )
}