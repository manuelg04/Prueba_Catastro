import Menu from '../../menu';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_TERRENO_MUTATION, QUERY_ALL_PREDIOS, QUERY_ALL_TERRENOS, MOSTRAR_TERRENO_MUTATION } from "../../../backend/graphql/mutaciones";

import { useRouter } from 'next/router';
import Predios from '../../predios';


export default function Terrenos() {
  const { Option } = Select;
  const [ form ] = Form.useForm();
  const { data } = useQuery ( QUERY_ALL_PREDIOS);
  const { data: dataTerrenos } = useQuery ( QUERY_ALL_TERRENOS);
  const router = useRouter();
  const [ crearTerreno ] = useMutation ( CREATE_TERRENO_MUTATION );
  const [ mostrarTerrenos ] = useMutation (MOSTRAR_TERRENO_MUTATION)

  const onFinish = (values) => {    
      const idpredioInt = parseInt(values.idpredio);
    try {
      crearTerreno ((        
        {
          variables: {
            id: values.id,
            idpredio: idpredioInt,
            area: values.area,
            valorcomer: values.valorcomer,
            tipoterre: values.tipoterre,
            consdentro: values.consdentro,
            fuenagua: values.fuenagua
          }
        }
      ))
      alert('registro creado correctamente')

    } catch (error) {
      alert("error al crear el registro", error)
    }    
    router.push('http://localhost:3000/terreno');
  };


    const dataTablaTerrenos =
        dataTerrenos?.allTerrenos.edges.map(
            (edge) => {


                return (
                    {
                        id: edge.node.id,
                        idpredio: edge.node.idpredio,
                        area: edge.node.area,
                        valorcomer: edge.node.valorcomer,
                        tipoterre: edge.node.tipoterre,
                        consdentro: edge.node.consdentro,
                        fuenagua: edge.node.fuenagua,

                    }
                )
            }
        )
   // console.log("🚀 ~ dataTablaTerrenos", dataTablaTerrenos)







  return (
      <>
          <Menu />
          <h1>Esta es la pagina para Crear terrenos</h1>
          <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
          >
              <Form.Item
                  label="Predio"
                  name="idpredio"
              >
                <Select defaultValue="Escoja un predio">
                {
                    
                          data?.allPredios.edges.map((edge) => {
                            // if(edge.node.idpredio === dataTablaTerrenos.idpredio){
                                
                                
                            //     console.log("Este terreno ya esta asignado a un predio")
                            // }else{

                            //     console.log("Este terreno no esta asignado a un predio")
                            // }

                              //console.log("Este es el idpredio", idpredio)
                              return (
                                  <Option value={edge.node.idpredio}></Option>

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
                  name="valorcomer"
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
                  name="tipoterre"
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
                  label="¿Tiene construcciones?"
                  name="consdentro"
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
                  label="¿Tiene fuentes de agua?"
                  name="fuenagua"
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
                      Guardar
                  </Button>
              </Form.Item>
          </Form>
      </>
  )
}