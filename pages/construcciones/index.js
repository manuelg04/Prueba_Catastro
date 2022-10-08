import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Radio, Table } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PROPIETARIO_MUTATION, DELETE_PROPIETARIO_MUTATION, QUERY_ALL_PROPIETARIOS, REFRESH_QUERY_PROPIETARIOS, UPDATE_PROPIETARIO_MUTATION,  } from "../../backend/graphql/mutaciones";
import Menu from "../menu";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';





export default function Construcciones() {

  const [requiredMark, setRequiredMarkType] = useState('optional');
  //const { data, loading, error } = useQuery ( QUERY_ALL_PROPIETARIOS );
  //const [ updatePropietario ] = useMutation ( UPDATE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS );
  //const [ deletePropietario ] = useMutation ( DELETE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS );
  const [ ModalAbierto, setModalAbierto ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const handleCancel = () => {
    setModalAbierto(false);
  };  


  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const { Option } = Select;


  const dataTabla =   
  data?.allPropietarios.edges.map(
    (edge) => {
  return (

    {
      id: edge.node.id,
      tipoprop: edge.node.tipoprop,
      nombre: edge.node.nombre,
      tipodoc: edge.node.tipodoc,
      numdoc:  edge.node.numdoc,
      telefono: edge.node.telefono,
      email: edge.node.email,
      direccion: edge.node.direccion
    }                        
  )}
)

const columns = [
        
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Numero de pisos',
    dataIndex: 'numpisos',
    key: 'numpisos',
  },
  {
      title: 'Area total',
      dataIndex:  'areatotal',
      key: 'areatotal',
    },    
  {
    title: 'Tipo de construccion',
    dataIndex: 'tipocons',
    key: 'tipocns',
  },
  {
    title: 'Direccion',
    dataIndex: 'direccion',
    key: 'direccion',
  },
  {
    title: 'Acciones',
    dataIndex: 'acciones',
    key: 'acciones',
    render: (x, propietario) => {
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
             message: 'Ingresa el numero predial',
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