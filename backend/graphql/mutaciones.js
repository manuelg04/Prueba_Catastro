
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
              propietarios
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
            $municipio: String,
            $propietarios: String
  ) {
      createPredio (
        input: {
          predio: {
            numpre: $numpre,
            nombre: $nombre,
            valor:  $valor,
            depto: $depto, 
            municipio: $municipio,
            propietarios: $propietarios
          }
        }
      ) {
        predio{
          numpre
        }
      }
    }
  `
export const UPDATE_PREDIO_MUTATION = gql `

  mutation updatePredioByIdPredio (
      $idPredio: Int!
      $numpre: String!,
      $nombre: String!,
      $valor: String,
      $depto: String,
      $municipio: String,
      $propietarios: String
  ) {
    updatePredioByIdPredio (
      input: {
        predioPatch: {
            numpre: $numpre,
            nombre: $nombre,
            valor: $valor,
            depto: $depto,
            municipio: $municipio,
            propietarios: $propietarios
        },
        idPredio: $idPredio
      }
    ) {
      predio {
        idPredio
        numpre
      }
    }
  }
`

export const DELETE_PREDIO_MUTATION = gql `

    mutation deletePredioByIdPredio (
      $idPredio: Int!
    ) {
      deletePredioByIdPredio (
        input: {
          idPredio: $idPredio
        }
      ) {
        predio {
          idPredio
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
            tipoprop
            tipodoc
            numdoc
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
              $numdoc: String!,
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
              numdoc: $numdoc,
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

export const DELETE_PROPITARIO_MUTATION = gql `

    mutation deletePropietarioById (
      $id: Int!
    ) {
      deletePropietarioById (
        input: {
          id: $id
        }
      ) {
        propietario {
          id
        }
      }
    }
`

export const REFRESH_QUERY_PREDIOS = {
  refetchQueries: [{ 
    query: QUERY_ALL_PREDIOS 
  }]
}

export const REFRESH_QUERY_PROPIETARIOS = {
  refetchQueries: [{ 
    query: QUERY_ALL_PROPIETARIOS
  }]
}

// export const REFRESH_QUERY_TERRENOS = {
//   refetchQueries: [{ 
//     query: QUERY_ALL_TERRENOS
//   }]
// }

// export const REFRESH_QUERY_CONSTRUCCIONES = {
//   refetchQueries: [{ 
//     query: QUERY_ALL_CONSTRUCCIONES
//   }]
// }




