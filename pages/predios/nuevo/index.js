import Menu from '../../menu';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PREDIO_MUTATION } from "../../../backend/graphql/mutaciones";
import { useRouter } from 'next/router';

export default function Predios() {
  //logica
  const [form] = Form.useForm();
  const router = useRouter();
  const [crearPredio, { data, error } ] = useMutation ( CREATE_PREDIO_MUTATION)

  const onFinish = (values) => {
    try {
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
      alert('registro creado correctamente')
    } catch (error) {
      alert('error al crear registro', error);
    }
    router.push('http://localhost:3000/predios');
  };
  
  return (
    <>
      <Menu />
      <h1>Esta es la pagina para Crear predios</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        
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
          <Input />
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
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
   )
}
