import Menu from "../menu";
import { Button, Form, Input} from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';



export default function Home() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();  
  const [requiredMark, setRequiredMarkType] = useState('optional');
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
     <h1>Esta es la pagina de terrenos</h1>
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
        label="tipo de terreno"
        name="tipo"
        rules={[
          {
            required: true,
            message: 'Digita el tipo del terreno!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Area"
        name="username"
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
        label="Valor Comercial"
        name="valorcomercial"
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
        label="¿Tiene cerca fuentes de agua?"
        name="fuentesAgua"
        rules={[
          {
            required: true,
            message: '¿Tiene cerca fuentes de agua?',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="¿Tiene construcciones dentro de el?"
        name="consDentro"
        rules={[
          {
            required: true,
            message: '¿Tiene construcciones dentro de el?',
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