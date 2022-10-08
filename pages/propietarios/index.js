import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Radio, Table } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PROPIETARIO_MUTATION, QUERY_ALL_PROPIETARIOS,  } from "../../backend/graphql/mutaciones";
import Menu from "../menu";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';


export default function Propietarios() {

  
  const { data, loading, error } = useQuery ( QUERY_ALL_PROPIETARIOS );
  console.log("🚀 ~ data", data)
  const [ ModalAbierto, setModalAbierto ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const handleCancel = () => {
    setModalAbierto(false);
  };  
  const editPropietario = (values) => {
    console.log("🚀 ~ values", values)
  }

  const selectPropietario = (propietario) => {
    console.log("🚀 ~ record", propietario.nombre)
    
    setModalAbierto(true);
    modalForm.setFieldsValue({
        tipodoc: propietario.tipodoc,
        tipoprop: propietario.tipoprop,
        nombre: propietario.nombre,
        numdoc: propietario.numdoc,
        telefono: propietario.telefono,
        email: propietario.email,
        direccion: propietario.direccion
 
    });    
  }

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
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
        },
        {
            title: 'Tipo de documento',
            dataIndex:  'tipodoc',
            key: 'tipodoc',
          },    
        {
          title: 'Numero de documento',
          dataIndex: 'numdoc',
          key: 'numdoc',
        },
        {
          title: 'Telefono',
          dataIndex: 'telefono',
          key: 'telefono',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },  
        {
          title: 'Direccion',
          dataIndex:  'direccion',
          key: 'direccion',
        },    
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          key: 'acciones',
          render: (x, propietario) => {
            return (
              <>
              
                <EditOutlined      
                onClick={() => {
                  selectPropietario(propietario);
                }}
                />
  
                <DeleteOutlined
                  onClick={() => {
                    onDeletePropietario(propietario);
                  }}
                  style={{ color: "red", marginLeft: 20 }}
                />
              </>
            );
          },
        },
      ]; 
                  


  const onFinish = (values) => {
    console.log('Success:', values);
    try {
      crearPropietario ((
        
        {
          variables: {
            tipoprop: values.tipoprop,
            tipodoc: values.tipodoc,
            numdoc: values.numdoc,
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
<Button type="primary">
        <Link href="/propietarios/nuevo"> Agregar nuevo propietario </Link>
        </Button>

  <Table
      dataSource={dataTabla}
      columns={columns}
      size='large' />
<Modal
        title="Editando propietario"
        cancelText="Cancelar"
        okText="Guardar"
        visible={ModalAbierto}
        onOk={modalForm.submit}
        onCancel={handleCancel}>

   <Form
      form={modalForm}
      labelCol={{span: 8}}
      wrapperCol={{ span: 16 }}
      onFinish={editPropietario}
      //onFinishFailed={onFinishFailed}
    >

  <Form.Item label="ID" name="id" hidden>
                    <Input />
                  </Form.Item>                  
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
            message: 'Ingresa el tipo de propietario, puede ser Persona natural o Juridica',
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
            message: 'Ingresa tipo de documento, NIT Ó CC',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Numero de documento"
        name="numdoc"
        rules={[
          {
            required: true,
            message: 'Ingresa el numero de documento',
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
            message: 'Ingresa el nombre o razon social',
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
            message: 'Ingresa tu direccion',
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
            message: 'Ingresa tu telefono',
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
            message: 'Ingresa tu correo',
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Form>  
      </Modal>
   </>
  )
}