import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Radio, Table } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DELETE_PREDIO_MUTATION, QUERY_ALL_CONSTRUCCIONES, REFRESH_QUERY_PREDIOS, UPDATE_PREDIO_MUTATION, } from "../../backend/graphql/mutaciones";
import Menu from '../menu';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';

export default function Predios() {
  //logica
  const { data, loading, error } = useQuery ( QUERY_ALL_CONSTRUCCIONES );
  const [ deletePredio ] = useMutation ( DELETE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [ updatePredio ] = useMutation (UPDATE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS)
  const [ ModalAbierto, setModalAbierto ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const handleCancel = () => {
    setModalAbierto(false);
  };  

  const onBorrarPredio = (values) => {
    try {
      deletePredio((
        {
          variables: {
            idPredio: values.idPredio,
          }
        }
      ));
      console.log('registro eliminado con exito');
    } catch (error) {
      console.log('error al eliminar registro', error);
      
    }

  }
  const editPredio = (values) => {
    console.log("🚀 ~ values", values)
    try {
      updatePredio((
        {
          variables: {
            idPredio: values.idPredio,
            numpre: values.nopredial,
            nombre: values.nombre,
            valor: values.valor,
            depto:  values.depto,
            municipio: values.municipio,
            propietarios: values.propietarios
          }
        }
      ))
      console.log('registro actualizado exitosamente');
    } catch (error) { 
      console.log("error al actualizar el registro")      
    }
    handleCancel();
  }
  const selectPredio = (predio) => {
    console.log("🚀 ~ record", predio.propietarios)
    
    setModalAbierto(true);
    modalForm.setFieldsValue({
      idPredio: predio.idPredio,      
      nopredial: predio.numpre,
      valor: predio.valor,
      nombre: predio.nombre,
      depto: predio.depto,
      municipio: predio.municipio,
      propietario: predio.propietario,
      construcciones: predio.construcciones,
      terreno: predio.terreno,
      propietarios: predio.propietarios

    });    
  }


  const dataTabla =   
  data?.allConstrucciones.edges.map(
    (edge) => {
        return (                        
                  {
                    id: edge.node.id,
                    idPredio: edge.node.idPredio,
                    numPisos: edge.node.numPisos,
                    areaTotal: edge.node.areaTotal,
                    tipoCons: edge.node.tipoCons,
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
        title: 'idPredio',
        dataIndex: 'idPredio',
        key: 'idPredio',
      },
      {
        title: 'Numero de pisos',
        dataIndex: 'numPisos',
        key: 'numPisos',
      },
      {
        title: 'Area total',
        dataIndex: 'areaTotal',
        key: 'areaTotal',
      },
      {
        title: 'Tipo de construccion',
        dataIndex: 'tipoCons',
        key: 'tipoCons',
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
        render: (x, predio) => {
          return (
            <>
            
              <EditOutlined      
              onClick={() => {
                selectPredio(predio);
              }}
              />

              <DeleteOutlined
                onClick={() => {
                  onBorrarPredio(predio);
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
        <Link href="/predios/nuevo"> Agregar nuevo predio </Link>
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
          onFinish={editPredio}
        >
          <Form.Item label="ID" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Id predio"
            name="idPredio"
          >
            <Input disabled />
          </Form.Item>
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
                message: 'Ingrese el nombre del predio',
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
                message: 'Ingrese el departamento asociado a tu predio',
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
                message: 'Ingrese el municipio asociado a tu predio',
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
                message: 'Ingresa el propietario del predio',
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
