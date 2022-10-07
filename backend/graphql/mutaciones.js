
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
            tipoprop
            tipodoc
            nodoc
            nombre
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
      
            $tipoprop: String,
            $tipodoc: String,
            $nodoc: String!,
            $nombre: String,
            $direccion: String,
            $telefono: String,
            $email: String
) {
 createPropietario (
   input: {
     propietario: {
            tipoprop: $tipoprop,
            tipodoc: $tipodoc, 
            nodoc: $nodoc,
            nombre: $nombre,
            direccion: $direccion,
            telefono: $telefono,
            email: $email
     }
   }
 ) {
   propietario{
     nombre

   }
 }
}
`





