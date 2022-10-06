import Menu from "../menu";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd'



export default function Propietarios() {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
  
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
      setRequiredMarkType(requiredMarkValue);
    };
    const { Option } = Select;
  return (
   <>
   <Menu/>
   <h1>Esta es la pagina de propietarios</h1>

   <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder="Tipo de persona"
    optionFilterProp="children"
    filterOption={(input, option) => option.children.includes(input)}
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="1">Persona Natural</Option>
    <Option value="2">Persona Juridica</Option>
 
  </Select>

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





   <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
        

      <Form.Item
        label="Tipo de documento"
        tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input placeholder="input placeholder" />
        <Form.Item label="Numero de documento" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>

      </Form.Item>
      <Form.Item label="Nombres Y Apellidos" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item label="Direccion" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item label="Telefono" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item label="Email" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>

      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
   
   </>
  )
}