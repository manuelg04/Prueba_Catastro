import Menu from '../../menu';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PROPIETARIO_MUTATION, QUERY_ALL_PREDIOS } from "../../../backend/graphql/mutaciones";


export default function Propietarios() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { data } = useQuery ( QUERY_ALL_PREDIOS);
  const [ crearPropietario ] = useMutation ( CREATE_PROPIETARIO_MUTATION)

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

  return (
    <>
      <Menu />
      <h1>Esta es la pagina para CREAR propietarios</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
      >
        <Form.Item
                  label="id Predio"
                  name="idpredio"
              >
                <Select defaultValue="Escoja un predio">
                {
                          data?.allPredios.edges.map((edge) => {
                              return (
                                  <Option value={edge.node.idpredio}></Option>
                              )
                          })
                }
                </Select>
              </Form.Item>
        <Form.Item
          label="Tipo de propietario"
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
          label="Direccion"
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
          label="Telefono"
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
          label="Email"
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