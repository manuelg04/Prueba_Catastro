import Menu from "../../menu";
import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useMutation } from '@apollo/client';
import { CREATE_PROPIETARIO_MUTATION } from "../../../backend/graphql/mutaciones";


export default function Propietarios() {

  const [crearPropietario, { data, error } ] = useMutation ( CREATE_PROPIETARIO_MUTATION)

  const onFinish = (values) => {
    console.log('Success:', values);
    try {
      crearPropietario ((
        
        {
          variables: {
            tipoprop: values.tipoprop,
            tipodoc: values.tipodoc,
            nodoc: values.numdoc,
            nombre: values.nombre,
            direccion: values.direccion,
            telefono: values.telefono,
            email: values.email

          }
        }
      ))
      console.log('registro creado correctamente')

    } catch (error) {
      console.log("error al crear el registro", error)
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



    const onRequiredTypeChange = ({ requiredMarkValue }) => {
      setRequiredMarkType(requiredMarkValue);
    };

    const formSuccess=(datos)=>{

      console.log("Formulario enviado exitosamente ", datos)
    }
    const formFailed=(error)=>{
  
      console.log("Error : ", error)
    }


  return (
   <>
   <Menu/>
   <h1>Esta es la pagina de propietarios</h1>



   <Form
      name="basic"
      labelCol={{span: 8}}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
    >



  
  <Form.Item
         label="Id predio"
         name="idPredio"
         
       >
         <Input />
       </Form.Item>



       <Form.Item
        label="tipo de propietario"
        name="tipoprop"
        rules={[
          {
            required: true,
            message: 'Digita el tipo de propietario!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      
      <Form.Item
        label="Tipo de documento"
        name="tipodoc"
        rules={[
          {
            required: true,
            message: 'Digita el tipo de documento',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="numero de documento"
        name="numdoc"
        rules={[
          {
            required: true,
            message: 'Digita numero de su documento',
          },
        ]}
      >
        <Input />
      </Form.Item>

       <Form.Item
        label="Nombre / razon social"
        name="nombre"
        rules={[
          {
            required: true,
            message: 'Digita el nombre!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      

      <Form.Item
        label="direccion"
        name="direccion"
        rules={[
          {
            required: true,
            message: 'ingresa tu direccion',
          },
        ]}
      >
        <Input />
      </Form.Item>

  
      <Form.Item
        label="telefono"
        name="telefono"
        rules={[
          {
            required: true,
            message: 'Digita tu telefono',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Ingresa tu correo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>  
   </>
  )
}