import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Radio, Table, Space} from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PREDIO_MUTATION, QUERY_ALL_CONSTRUCCIONES, DELETE_PREDIO_MUTATION, QUERY_ALL_PREDIOS, REFRESH_QUERY_PREDIOS, UPDATE_PREDIO_MUTATION, MOSTRAR_CONSTRUCCION_MUTATION,  } from "../../backend/graphql/mutaciones";
import Menu from '../menu';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from 'next/link';

export default function Predios() {
  //logica
  const { data, loading, error } = useQuery ( QUERY_ALL_PREDIOS, QUERY_ALL_CONSTRUCCIONES);
  const { data: dataConstrucciones } = useQuery ( QUERY_ALL_CONSTRUCCIONES , QUERY_ALL_PREDIOS);
  const [ deletePredio ] = useMutation ( DELETE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [ updatePredio ] = useMutation (UPDATE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [mostrarConstruccione ] = useMutation (MOSTRAR_CONSTRUCCION_MUTATION)
  const [ ModalAbierto, setModalAbierto, setModalAbierto2, ModalAbierto2 ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const [loadings, setLoadings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen(false);
  }; 


   const verConstruccion = (values) => {
     try {
       mostrarConstruccione((
         {
           variables: {
             id: values.id,
             dpredio: values.idpredio,
             numpisos: values.numpisos,
             areatotal: values.areatotal,
             tipocons: values.tipocons,
             direccion: values.direccion
           }
         }
       ))
       alert('Esta viendo la tabla de construccion exitosamente');
     } catch (error) {
       alert("No esta viendo la tabla de construiccion fallo") 
    }
    
   }
   
              const handleCancel = () => {
                setModalAbierto(false);
              };  
              
              const onBorrarPredio = (values) => {
                try {
                  deletePredio((
                    {
                      variables: {
                        idpredio: values.idpredio,
          }
        }
      ));
      alert('registro eliminado con exito');
    } catch (error) {
      alert('error al eliminar registro', error);
      
    }
  }
  const editPredio = (values) => {
    try {
      updatePredio((
        {
          variables: {
            idpredio: values.idpredio,
            numpre: values.nopredial,
            nombre: values.nombre,
            valor: values.valor,
            depto:  values.depto,
            municipio: values.municipio,
            propietarios: values.propietarios
          }
        }
      ))
      alert('registro actualizado exitosamente');
    } catch (error) { 
      alert("error al actualizar el registro");     
    }
    handleCancel();
  }
  const selectPredio = (predio) => {
    setModalAbierto(true);
    modalForm.setFieldsValue({
      idpredio: predio.idpredio,      
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

  const selectConstruccion = (predio) => {
       showModal();
  
      console.log("Id del select construccion " , predio.idpredio)
      console.log("data tabla 2", dataTablaConstrucciones)
      
  }

  const dataTablaConstrucciones =   
  dataConstrucciones?.allConstrucciones.edges.map(    
    (edge) => {
      return (                        
              {
              id: edge.node.id,
              idpredio: edge.node.idpredio,
              numpisos: edge.node.numpisos,
              areatotal: edge.node.areatotal,
              tipocons: edge.node.tipocons,
              direccion:  edge.node.direccion
              
            }                        
        )}
        )

    const columnsConstrucciones = [
        
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


  const dataTabla =   
  data?.allPredios.edges.map(
    (edge) => {
        return (        
                  {
                    idpredio: edge.node.idpredio,
                    numpre: edge.node.numpre,
                    nombre: edge.node.nombre,
                    valor: edge.node.valor,
                    depto:  edge.node.depto,
                    municipio: edge.node.municipio,
                    propietarios: edge.node.propietarios
                    
                  }                        
                )}
    )

    const columns = [
        
      {
        title: 'id',
        dataIndex: 'idpredio',
        key: 'idpredio',
      },
      {
        title: 'Numero Predial',
        dataIndex: 'numpre',
        key: 'numpre',
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      },
      {
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor',
      },
      {
        title: 'Depto',
        dataIndex: 'depto',
        key: 'depto',
      },
      {
        title: 'Municipio',
        dataIndex: 'municipio',
        key: 'municipio',
      },  
      {
        title: 'Propietarios',
        dataIndex:  'propietarios',
        key: 'propietarios',
      },    

      {
        title: 'Construcciones',
        dataIndex:  'construcciones',
        key: 'construcciones',
        render:(x, construccion) => {
          return(
            <>

           <PlusCircleOutlined  
            onClick={() => {
              selectConstruccion(construccion);
            }}/>

            </>
          )

        }
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
 
        <Modal 

        title="Aqui se mostraria la tabla de construcciones"
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel2}
        width={616}

        
        onClick={() => {
          verConstruccion(construccion);
        }}

        

        cancelText="Cancelar"
        okText="Guardar"
        visible={isModalOpen}
       
        
        >
        <Table
        
        dataSource={dataTablaConstrucciones}
        columns={columnsConstrucciones}
        size='large' />
        
       

      </Modal>

             
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
        size='large'
        />


      <Modal
        title="YENDO HACIA CONSTRUICCIONES"
        cancelText="Cancelar"
        okText="Guardar"
        visible={ModalAbierto2}
        onOk={modalForm.submit}
        >



      </Modal>
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
            name="idpredio"
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
