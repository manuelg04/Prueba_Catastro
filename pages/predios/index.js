import Menu from "../menu";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';

export default function Predios() {
  //logica
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onFinish = (values) => {
    console.log('Success:', values);
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
      <h1>Esta es la pagina de predios</h1>
   <Form
       name="basic"
       labelCol={{span: 8}}
       wrapperCol={{ span: 16 }}
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
     >
    <Form.Item
         label="Id predio"
         name="idPredio"
         rules={[
           {
             required: true,
             message: 'Digita el numero predial!',
           },
         ]}
       >
         <Input />
       </Form.Item>
       <Form.Item
         label="Numero Predial"
         name="nopredial"
         rules={[
           {
             required: true,
             message: 'Please input your username!',
           },
         ]}
       >
         <Input />
       </Form.Item>
 
       <Form.Item
         label="Avaluo"
         name="valor"
         rules={[
           {
             required: true,
             message: 'Ingrese el avaluo',
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
             message: 'Ingrese el nombre',
           },
         ]}
       >
         <Input />
       </Form.Item>

       <Form.Item
         label="Departamento"
         name="dpto"
         
         rules={[
           {
             required: true,
             message: 'Ingrese el dpto',
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
             message: 'Ingrese el municipio',
           },
         ]}
       >
         <Input />
       </Form.Item>


       <Form.Item
         label="Propietario"
         name="propietario"
         initialValue="Aqui se cargan el propietario"
         rules={[
           {
             required: true,
             message: 'Digita el valor comercial el terreno!',
           },
         ]}
       >
         <Input />
       </Form.Item>

       <Form.Item
         label="Construcciones"
         name="construcciones"
         initialValue="Aqui se cargan las construcciones"
         rules={[
           {
             required: true,
             message: 'Terrenos',
           },
         ]}
       >
         <Input />
       </Form.Item>
 
       <Form.Item
         label="Terreno"
         name="terreno"
         initialValue="Aqui se cargan el terreno"
         rules={[
           {
             required: true,
             message: 'Ingrese terreno',
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
