
import { gql } from "@apollo/client";

export const QUERY_ALL_PREDIOS = gql `
  query MyQuery {
      allPredios {
        edges {
          node {
            valor
            depto
            municipio
          }
        }
      }
    }
  `

  export const create_predio_mutation  = gql `
  
  mutation crearpredio {
      createPredio(
        input: {
          predio: {
            numpre: "1234",
            nombre: "elsharawi",
            depto: "antioquia", 
            municipio: "siloe"}
        }
      ) {
        predio{
          nombre
        }
      }
    }
  `