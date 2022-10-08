import Menu from '../../menu';
import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_CONSTRUCION_MUTATION } from "../../../backend/graphql/mutaciones";


export default function Propietarios() {
  const [form] = Form.useForm();
  const [crearConstruccion, { data, error } ] = useMutation ( CREATE_CONSTRUCION_MUTATION )

  const onFinish = (values) => {    
      const idPredio = parseInt(values.idpredio);
    try {
      crearConstruccion ((        
        {
          variables: {
            idpredio: idPredio,
            numPisos: values.numPisos,
            areaTotal: values.areaTotal,
            tipoCons: values.tipoCons,
            direccion: values.direccion
          }
        }
      ))
      console.log('registro creado correctamente')

    } catch (error) {
      console.log("error al crear el registro", error)
    }

  };


  return (
      <>
          <Menu />
          <h1>Esta es la pagina para CREAR Construcciones</h1>
          <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
          >
              <Form.Item
                  label="id"
                  name="id"
              >
                  <Input disabled />
              </Form.Item>
              <Form.Item
                  label="id Predio"
                  name="idpredio"
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Numero de pisos"
                  name="numPisos"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa el numero de pisos de tu construccion',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Area total de la construccion"
                  name="areaTotal"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa el area total de tu construccion',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Tipo de construccion"
                  name="tipoCons"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa el tipo de construccion',
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
                          message: 'Ingresa la direccion de tu construccion',
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