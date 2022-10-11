import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DELETE_CONSTRUCCION_MUTATION, QUERY_ALL_CONSTRUCCIONES, QUERY_ALL_PREDIOS, REFRESH_QUERY_CONSTRUCCIONES, UPDATE_CONSTRUCCION_MUTATION } from "../../backend/graphql/mutaciones";
import Menu from '../menu';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';

export default function Predios() {
  //logica
  const { Option } = Select;
  const { data, loading, error } = useQuery ( QUERY_ALL_CONSTRUCCIONES );
  const { data: dataPredios } = useQuery ( QUERY_ALL_PREDIOS);
  const [ updateConstruccion ] = useMutation (UPDATE_CONSTRUCCION_MUTATION, REFRESH_QUERY_CONSTRUCCIONES)
  const [ deleteConstruccion ] = useMutation ( DELETE_CONSTRUCCION_MUTATION, REFRESH_QUERY_CONSTRUCCIONES);
  const [ ModalAbierto, setModalAbierto ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const handleCancel = () => {
    setModalAbierto(false);
  };  

  const onBorrarConstruccion = (values) => {
    try {
      deleteConstruccion((
        {
          variables: {
            id: values.id,
          }
        }
      ));
      alert('registro eliminado con exito');
    } catch (error) {
      alert('error al eliminar registro', error);
      
    }

  }
  const editConstruccion = (values) => {
    try {
      updateConstruccion((
        {
          variables: {
            id: values.id,
            idpredio: values.idpredio,
            numpisos: values.numpisos,
            areatotal: values.areatotal,
            tipocons: values.tipocons,
            direccion: values.direccion
          }
        }
      ))
      alert('registro actualizado exitosamente');
    } catch (error) { 
      alert("error al actualizar el registro")      
    }
    handleCancel();
  }
  const selectPredio = (construccion) => {
    
    setModalAbierto(true);
    modalForm.setFieldsValue({
      id: construccion.id,
      idpredio: construccion.idpredio,      
      numpisos: construccion.numpisos,
      areatotal: construccion.areatotal,
      tipocons: construccion.tipocons,
      direccion: construccion.direccion

    });    
  }


  const dataTabla =   
  data?.allConstrucciones.edges.map(
    (edge) => {
        return (                        
                  {
                    id: edge.node.id,
                    idpredio: edge.node.idpredio,
                    numpisos: edge.node.numpisos,
                    areatotal: edge.node.areatotal,
                    tipocons: edge.node.tipocons,
                    direccion:  edge.node.direccion,
                  
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
        title: 'id Predio',
        dataIndex: 'idpredio',
        key: 'idpredio',
      },
      {
        title: 'Numero de pisos',
        dataIndex: 'numpisos',
        key: 'numpisos',
      },
      {
        title: 'Area total',
        dataIndex: 'areatotal',
        key: 'areatotal',
      },
      {
        title: 'Tipo de construccion',
        dataIndex: 'tipocons',
        key: 'tipocons',
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
        render: (x, construccion) => {
          return (
            <>
            
              <EditOutlined      
              onClick={() => {
                selectPredio(construccion);
              }}
              />

              <DeleteOutlined
                onClick={() => {
                  onBorrarConstruccion(construccion);
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
        <Link href="/construcciones/nuevo"> Agregar nueva construccion </Link>
      </Button>
      <Table
        dataSource={dataTabla}
        columns={columns}
        size='large' />
      <Modal
        title="Editando predio"
        cancelText="Cancelar"
        okText="Guardar"
        visible={ModalAbierto}
        onOk={modalForm.submit}
        onCancel={handleCancel}>

        <Form
          form={modalForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={editConstruccion}
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

        </Form>
      </Modal>
    </>
   )
}
