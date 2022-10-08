import Menu from '../../menu';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_TERRENO_MUTATION, QUERY_ALL_PREDIOS } from "../../../backend/graphql/mutaciones";


export default function Terrenos() {
  const { Option } = Select;
  const [ form ] = Form.useForm();
  const { data } = useQuery ( QUERY_ALL_PREDIOS);
  const [ crearTerreno ] = useMutation ( CREATE_TERRENO_MUTATION )

  const onFinish = (values) => {    
      const idPredio = parseInt(values.idpredio);
    try {
      crearTerreno ((        
        {
          variables: {
            id: values.id,
            idpredio: idPredio,
            area: values.area,
            valorComer: values.valorComer,
            tipoTerre: values.tipoTerre,
            consDentro: values.consDentro,
            fuenAgua: values.fuenAgua
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
          <h1>Esta es la pagina para CREAR terrenos</h1>
          <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
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
                <Select defaultValue="Escoja un predio">
                {
                          data?.allPredios.edges.map((edge) => {
                              return (
                                  <Option value={edge.node.idPredio}></Option>
                              )
                          })
                }
                </Select>
              </Form.Item>
              <Form.Item
                  label="Area"
                  name="area"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa el area de tu terreno',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Valor comercial del terreno"
                  name="valorComer"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa el valor comercial del terreno',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Tipo de terreno"
                  name="tipoTerre"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa el tipo de terreno',
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
                          message: 'Ingresa si tiene construcciones dentro de el',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="¿Tiene fuentes de agua dentro de el?"
                  name="fuenAgua"
                  rules={[
                      {
                          required: true,
                          message: 'Ingresa si tiene fuentes de agua  dentro de el',
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