
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Radio, Table } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { CREATE_PREDIO_MUTATION, QUERY_ALL_PREDIOS,  } from "../../backend/graphql/mutaciones";
import Menu from '../menu';

export default function Predios() {
  //logica
  const { data, loading, error } = useQuery ( QUERY_ALL_PREDIOS );


  const dataTabla =   
  data?.allPredios.edges.map(
    (edge) => {
        return (                        
                  {
                    idPredio: edge.node.idPredio,
                    numpre: edge.node.numpre,
                    nombre: edge.node.nombre,
                    valor: edge.node.valor,
                    depto:  edge.node.depto,
                    municipio: edge.node.municipio
                  }                        
                )}
    )

    const columns = [
        
      {
        title: 'idPredio',
        dataIndex: 'idPredio',
        key: 'idPredio',
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
      
      // {
      //   title: 'Acciones',
      //   dataIndex: 'acciones',
      //   key: 'acciones',
      //   render: (_: any, record:any) => {
      //     return (
      //       <>
      //         <EditOutlined      
      //         onClick={() => {
      //           selectUser(record);
      //         }}
      //         />

      //         <DeleteOutlined
      //           onClick={() => {
      //             onDeleteUser(record);
      //           }}
      //           style={{ color: "red", marginLeft: 20 }}
      //         />
      //       </>
      //     );
      //   },
      // },
    ];  

  const onFinish = (values) => {
    console.log('Success:', values);
    try {
      //crearPredio
      crearPredio ((
        {
          variables: {
            numpre: values.nopredial,
            nombre: values.nombre,
            valor: values.valor,
            depto:  values.depto,
            municipio: values.municipio
          }
        }
      ))
      console.log('registro creado correctamente')
    } catch (error) {
      console.log('error al crear registro', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
                      <Table 
                        dataSource={dataTabla} 
                        columns={columns}
                        size='large'
                      />
   )
}
