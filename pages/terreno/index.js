import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DELETE_TERRENO_MUTATION, QUERY_ALL_TERRENOS , QUERY_ALL_PREDIOS, REFRESH_QUERY_TERRENOS, UPDATE_TERRENO_MUTATION } from "../../backend/graphql/mutaciones";
import Menu from '../menu';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';

export default function Predios() {
  //logica
  const { Option } = Select;
  const { data, loading, error } = useQuery ( QUERY_ALL_TERRENOS );
  const { data: dataPredios } = useQuery ( QUERY_ALL_PREDIOS);
  const [ updateTerreno ] = useMutation ( UPDATE_TERRENO_MUTATION, REFRESH_QUERY_TERRENOS )
  const [ deleteTerreno ] = useMutation ( DELETE_TERRENO_MUTATION, REFRESH_QUERY_TERRENOS );
  const [ ModalAbierto, setModalAbierto ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const handleCancel = () => {
    setModalAbierto(false);
  };  

  const onBorrarTerreno = (values) => {
    try {
      deleteTerreno((
        {
          variables: {
            id: values.id,
          }
        }
      ));
      console.log('registro eliminado con exito');
    } catch (error) {
      console.log('error al eliminar registro', error);
      
    }

  }
  const editTerreno = (values) => {
    try {
      updateTerreno((
        {
          variables: {
            id: values.id,
            idpredio: values.idpredio,
            area: values.area,
            valorcomer: values.valorcomer,
            tipoterre: values.tipoterre,
            consdentro: values.consdentro,
            fuenagua: values.fuenagua
          }
        }
      ))
      console.log('registro actualizado exitosamente');
    } catch (error) { 
      console.log("error al actualizar el registro")      
    }
    handleCancel();
  }
  const selectTerreno = (terreno) => {
    
    setModalAbierto(true);
    modalForm.setFieldsValue({
      id: terreno.id,
      idpredio: terreno.idpredio,      
      area: terreno.area,
      valorcomer: terreno.valorcomer,
      tipoterre: terreno.tipoterre,
      consdentro: terreno.consdentro,
      fuenagua: terreno.fuenagua

    });    
  }


  const dataTabla =   
  data?.allTerrenos.edges.map(
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
                )}
    )
    
    const columns = [
        
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'idPredio',
        dataIndex: 'idpredio',
        key: 'idpredio',
      },
      {
        title: 'Area del terreno',
        dataIndex: 'area',
        key: 'area',
      },
      {
        title: 'Valor comercial',
        dataIndex: 'valorcomer',
        key: 'valorcomer',
      },
      {
        title: 'Tipo de terreno',
        dataIndex: 'tipoterre',
        key: 'tipoterre',
      },
      {
        title: 'Construcciones dentro',
        dataIndex: 'consdentro',
        key: 'consdentro',
      },
      {
        title: 'Fuentes de agua cerca',
        dataIndex: 'fuenagua',
        key: 'fuenagua',
      },

      
      {
        title: 'Acciones',
        dataIndex: 'acciones',
        key: 'acciones',
        render: (x, terreno) => {
          return (
            <>
            
              <EditOutlined      
              onClick={() => {
                selectTerreno(terreno);
              }}
              />

              <DeleteOutlined
                onClick={() => {
                  onBorrarTerreno(terreno);
                }}
                style={{ color: "red", marginLeft: 20 }}
              />
            </>
          );
        },
      },
    ];  

  return (
    <>
      <Menu />
      <Button type="primary">
        <Link href="/terreno/nuevo"> Agregar nuevo terreno </Link>
      </Button>
      <Table
        dataSource={dataTabla}
        columns={columns}
        size='large' />
      <Modal
        title="Editando terreno"
        cancelText="Cancelar"
        okText="Guardar"
        visible={ModalAbierto}
        onOk={modalForm.submit}
        onCancel={handleCancel}>

        <Form
          form={modalForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={editTerreno}
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
                          dataPredios?.allPredios.edges.map((edge) => {
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
                          message: 'Ingresa el area del terreno',
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
                  label="Tiene construcciones"
                  name="consdentro"
                  rules={[
                      {
                          required: true,
                          message: 'Indica si tu terreno tiene construcciones dentro',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Tiene fuentes de agua"
                  name="fuenagua"
                  rules={[
                      {
                          required: true,
                          message: 'Indica si tu terreno tiene fuentes de agua cerca',
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
