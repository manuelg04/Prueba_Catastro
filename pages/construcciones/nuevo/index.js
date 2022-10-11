import Menu from '../../menu';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_CONSTRUCION_MUTATION, QUERY_ALL_PREDIOS } from "../../../backend/graphql/mutaciones";


export default function Propietarios() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { data } = useQuery ( QUERY_ALL_PREDIOS);
  const [crearConstruccion ] = useMutation ( CREATE_CONSTRUCION_MUTATION )

  const onFinish = (values) => {    
      const idpredioInt = parseInt(values.idpredio);
    try {
      crearConstruccion ((        
        {
          variables: {
            idpredio: idpredioInt,
            numpisos: values.numpisos,
            areatotal: values.areatotal,
            tipocons: values.tipocons,
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
                  label="Numero de pisos"
                  name="numpisos"
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
                  name="areatotal"
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
                  name="tipocons"
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