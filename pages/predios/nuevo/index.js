import Menu from '../../menu';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PREDIO_MUTATION } from "../../../backend/graphql/mutaciones";

export default function Predios() {
  //logica
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [crearPredio, { data, error } ] = useMutation ( CREATE_PREDIO_MUTATION)

  const onFinish = (values) => {
    console.log('Success:', values);
    try {
      //crearPredio
      crearPredio ((
        {
          variables: {
            numpre: values.nopredial,
            nombre: values.nombre,
            valor: values.valor,
            depto:  values.depto,
            municipio: values.municipio,
            propietarios: values.propietarios
          }
        }
      ))
      console.log('registro creado correctamente')
    } catch (error) {
      console.log('error al crear registro', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <>
    <Menu/>
      <h1>Esta es la pagina para CREAR predios</h1>
   <Form
       name="basic"
       labelCol={{span: 8}}
       wrapperCol={{ span: 16 }}
       onFinish={onFinish}
       // onFinishFailed={onFinishFailed}
     >
    <Form.Item
         label="Id predio"
         name="idPredio"       
       >
         <Input disabled />
       </Form.Item>
       <Form.Item
         label="Numero Predial"
         name="nopredial"
         rules={[
           {
             required: true,
             message: 'Ingresa el numero predial',
           },
         ]}
       >
         <Input/>
       </Form.Item>
 
       <Form.Item
         label="Avaluo"
         name="valor"
         rules={[
           {
             required: true,
             message: 'Ingrese el avaluo de tu predio',
           },
         ]}
       >
         <Input />
       </Form.Item>


       <Form.Item
         label="Nombre"
         name="nombre"
       
         rules={[
           {
             required: true,
             message: 'Ingrese el nombre de tu predio',
           },
         ]}
       >
         <Input />
       </Form.Item>

       <Form.Item
         label="Departamento"
         name="depto"
         
         rules={[
           {
             required: true,
             message: 'Ingresa el departamento asociado',
           },
         ]}
       >
         <Input />
       </Form.Item>

       <Form.Item
         label="Municipio"
         name="municipio"
         rules={[
           {
             required: true,
             message: 'Ingresa el municipio asociado',
           },
         ]}
       >
         <Input />
       </Form.Item>


       <Form.Item
         label="Propietarios"
         name="propietarios"
         rules={[
           {
             required: true,
             message: 'Ingresa el propietario asociado',
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