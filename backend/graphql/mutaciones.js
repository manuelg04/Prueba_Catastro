
import { gql } from "@apollo/client";

export const QUERY_ALL_PREDIOS = gql `
  query Predios {
      allPredios {
        edges {
          node {
              idpredio
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
      $idpredio: Int!
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
        idpredio: $idpredio
      }
    ) {
      predio {
        idpredio
        numpre
      }
    }
  }
`

export const DELETE_PREDIO_MUTATION = gql `

    mutation deletePredioByIdPredio (
      $idpredio: Int!
    ) {
      deletePredioByIdPredio (
        input: {
          idpredio: $idpredio
        }
      ) {
        predio {
          idpredio
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

export const QUERY_ALL_CONSTRUCCIONES = gql `
  query Construcciones {
      allConstrucciones {
        edges {
          node {
            id
            idpredio
            numpisos
            areaTotal
            tipoCons
            direccion
          }
        }
      }
    }
  `

export const CREATE_CONSTRUCION_MUTATION  = gql `  

    mutation createConstruccione (
                $idpredio: Int!,
                $numpisos: String,
                $areaTotal: String,
                $tipoCons: String,
                $direccion: String,
    ) {
      createConstruccione (
      input: {
        construccione: {
                idpredio: $idpredio,
                numpisos: $numpisos,
                areaTotal: $areaTotal,
                tipoCons: $tipoCons,
                direccion: $direccion
        }
      }
    ) {
      construccione {
        id
      }
    }
  }
`

export const UPDATE_CONSTRUCCION_MUTATION = gql `

  mutation updateConstruccioneById (
                $id: Int!
                $idpredio: Int!,
                $numpisos: String,
                $areaTotal: String,
                $tipoCons: String,
                $direccion: String,
  ) {
    updateConstruccioneById (
      input: {
        construccionePatch: {
                idpredio: $idpredio,
                numpisos: $numpisos,
                areaTotal: $areaTotal,
                tipoCons: $tipoCons,
                direccion: $direccion
        },
        id: $id
      }
    ) {
      construccione {
        id
      }
    }
  }
`

export const DELETE_CONSTRUCCION_MUTATION = gql `

    mutation deleteConstruccioneById (
      $id: Int!
    ) {
      deleteConstruccioneById (
        input: {
          id: $id
        }
      ) {
        construccione {
          id
        }
      }
    }
`

export const QUERY_ALL_TERRENOS = gql `
  query Terrenos {
      allTerrenos {
        edges {
          node {
            id
            idpredio
            area
            valorcomer  
            tipoterre
            consdentro
            fuenagua
  
          }
        }
      }
    }
  `
export const CREATE_TERRENO_MUTATION  = gql `  

    mutation createTerreno (
            $idpredio: Int!,
            $area: String,
            $valorcomer: String,
            $tipoterre: String,
            $consdentro: String,
            $fuenagua: String          
    ) {
      createTerreno (
      input: {
        terreno: {
                idpredio: $idpredio,
                area: $area,
                valorcomer: $valorcomer,
                tipoterre: $tipoterre,
                consdentro: $consdentro,
                fuenagua: $fuenagua
        }
      }
    ) {
      terreno {
        id
      }
    }
  }
`

export const UPDATE_TERRENO_MUTATION = gql `

  mutation updateTerrenoById (
      $id: Int!
      $area: String,
      $valorcomer: String!,
      $tipoterre: String,
      $consdentro: String,
      $fuenagua: String,
      
  ) {
    updateTerrenoById (
      input: {
        terrenoPatch: {
            area: $area,
            valorcomer: $valorcomer,
            tipoterre: $tipoterre,
            consdentro: $consdentro,
            fuenagua: $fuenagua
          
        },
        id: $id
      }
    ) {
      terreno {
        area
      }
    }
  }
`

export const DELETE_TERRENO_MUTATION = gql `

    mutation deleteTerrenoById (
      $id: Int!
    ) {
      deleteTerrenoById (
        input: {
          id: $id
        }
      ) {
        terreno{
          id
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
export const UPDATE_PROPIETARIO_MUTATION = gql `

  mutation updatePropietarioById (
              $id: Int!
              $tipoprop: String,
              $tipodoc: String,
              $numdoc: String!,
              $nombre: String,
              $direccion: String,
              $telefono: String,
              $email: String
  ) {
    updatePropietarioById (
      input: {
        propietarioPatch: {
              tipoprop: $tipoprop,
              tipodoc: $tipodoc, 
              numdoc: $numdoc,
              nombre: $nombre,
              direccion: $direccion,
              telefono: $telefono,
              email: $email
        },
        id: $id
      }
    ) {
      propietario {
        id
      }
    }
  }
`

export const DELETE_PROPIETARIO_MUTATION = gql `

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

export const REFRESH_QUERY_TERRENOS = {
  refetchQueries: [{ 
    query: QUERY_ALL_TERRENOS
  }]
}

export const REFRESH_QUERY_CONSTRUCCIONES = {
  refetchQueries: [{ 
    query: QUERY_ALL_CONSTRUCCIONES
  }]
}




