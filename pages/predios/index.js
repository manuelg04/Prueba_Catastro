import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Modal, Table} from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { QUERY_ALL_CONSTRUCCIONES, DELETE_PREDIO_MUTATION, QUERY_ALL_PREDIOS, REFRESH_QUERY_PREDIOS, UPDATE_PREDIO_MUTATION, MOSTRAR_CONSTRUCCION_MUTATION, MOSTRAR_TERRENO_MUTATION, QUERY_ALL_TERRENOS } from "../../backend/graphql/mutaciones";
import Menu from '../menu';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from 'next/link';
import styles from "../../styles/menu.module.css";


export default function Predios() {
  //logica
  const { data } = useQuery ( QUERY_ALL_PREDIOS, QUERY_ALL_CONSTRUCCIONES);
  const { data: dataConstrucciones } = useQuery ( QUERY_ALL_CONSTRUCCIONES , QUERY_ALL_PREDIOS);
  const { data: dataTerrenos } = useQuery ( QUERY_ALL_TERRENOS , QUERY_ALL_PREDIOS);
  const [ deletePredio ] = useMutation ( DELETE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [ updatePredio ] = useMutation (UPDATE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [ mostrarConstruccione ] = useMutation (MOSTRAR_CONSTRUCCION_MUTATION);
  const [ mostrarTerrenos ] = useMutation (MOSTRAR_TERRENO_MUTATION)
  const [ ModalAbierto, setModalAbierto ] = useState(false); 
  const [ modalForm ] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [ construccionActual, setConstruccionActual ] = useState();
  const [ terrenoActual, setTerrenoActual ] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen(false);
  }; 

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen2(false);
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

    const verTerreno = (values) => {
    
    
    
   
      try {
        mostrarTerrenos((
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
          alert('Esta viendo la tabla de terrenos exitosamente');
        } catch (error) {
          alert("No esta viendo la tabla de terrenos fallo") 
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
          const arrConstruccionesFiltered = [];
           dataTablaConstrucciones.map((construccion) => {

            if(construccion.idpredio === predio.idpredio){
              arrConstruccionesFiltered.push(construccion);
            }
            
            setConstruccionActual(arrConstruccionesFiltered);
          })
          showModal();
        }

        const selectTerreno = (predio) => {
          const arrTerrenosFiltered = [];
           dataTablaTerrenos.map((terreno) => {

            if(terreno.idpredio === predio.idpredio){
              arrTerrenosFiltered.push(terreno);
            }
            
      
            setTerrenoActual(arrTerrenosFiltered);
          })
          showModal2();
        }


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
                )}
    )


    const columnsTerrenos = [
        
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
                  onBorrarTerreno(terreno);
                }}
                style={{ color: "red", marginLeft: 20 }}
              />
            </>
          );
        },
      },
    ];  
          


 
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
            direccion: edge.node.direccion

          }
        )
      }
    )
      
     // console.log("🚀 ~ dataTablaConstrucciones", dataTablaConstrucciones)

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
           className={styles.circuloinfo}
            onClick={() => {
              selectConstruccion(construccion);
              
            }}/>

            </>
          )

        }
      }, 
      {
        title: 'Terrenos',
        dataIndex:  'terreno',
        key: 'terreno',
        render:(x, terreno) => {
          return(
            <>

           <PlusCircleOutlined  
           className={styles.circuloinfo}
            onClick={() => {
              selectTerreno(terreno);
              
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

                title="Aqui se mostraria la tabla de terrenos"
                open={isModalOpen2}
                onOk={handleOk2}
                onCancel={handleCancel3}
                width={816}


                onClick={() => {
                  verTerreno(terreno);
                }}

                cancelText="Cancelar"
                okText="Guardar"
                visible={isModalOpen2}

              >
                <Table

                  // dataSource={dataTablaTerrenos}
                  dataSource={terrenoActual}
                  columns={columnsTerrenos}
                  size='large'

                />

              </Modal>

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
        
        // dataSource={dataTablaConstrucciones}
        dataSource={construccionActual}
        columns={columnsConstrucciones}
        size='large' 
        
        />
        
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
