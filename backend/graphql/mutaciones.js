
import { gql } from "@apollo/client";

export const QUERY_ALL_PREDIOS = gql `
  query Predios {
      allPredios {
        edges {
          node {
              idPredio
              numpre
              nombre
              valor
              depto
              municipio
          }
        }
      }
    }
  `

  export const CREATE_PREDIO_MUTATION  = gql `  
     mutation createPredio (
            $numpre: String!,
            $nombre: String!,
            $valor: String,
            $depto: String, 
            $municipio: String
  ) {
      createPredio (
        input: {
          predio: {
            numpre: $numpre,
            nombre: $nombre,
            valor:  $valor,
            depto: $depto, 
            municipio: $municipio
          }
        }
      ) {
        predio{
          numpre
        }
      }
    }
  `

export const QUERY_ALL_PROPIETARIOS = gql `
query Propietarios {
    allPropietarios {
      edges {
        node {
            id
            nit
            cedula
            tipodoc
            numdoc
            personatu 
            persojuri
            nombre
            apellido
            razonsocial
            direccion 
            telefono
            email

        }
      }
    }
  }
`

export const CREATE_PROPIETARIO_MUTATION  = gql `  

mutation createPropietario (
      
       $nombre: String!,
       $apellido: String,
       $razonsocial: String, 
       $cedula: String,
       $nit: String,
       $personatu: String,
       $persojuri: String,
       $direccion: String,
       $telefono: String,
       $email: String
) {
 createPropietario (
   input: {
     propietario: {
       nombre:$nombre,
       apellido:$apellido,
       razonsocial:$razonsocial, 
       cedula: $cedula,
       nit: $nit,
       personatu: $personatu,
       persojuri: $persojuri,
       direccion:$direccion,
        telefono:$telefono,
       email:$email
     }
   }
 ) {
   propietario{
     nombre

   }
 }
}
`





