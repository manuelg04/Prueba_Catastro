import Menu from "../../menu";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';




export default function Construcciones() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const { Option } = Select;
  //logica
  return (
   <>
   <Menu/>
   <h1>Esta es la pagina de construcciones</h1>


   <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder="Tipo de construccion"
    optionFilterProp="children"
    filterOption={(input, option) => option.children.includes(input)}
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="1">Industrial</Option>
    <Option value="2">Comercial</Option>
    <Option value="2">Residencial</Option>
   
  </Select>


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



        
     <Form.Item label="Numero de pisos" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
     
      <Form.Item label="Direccion" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Area total" 
        tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
   
   </>
  )
}