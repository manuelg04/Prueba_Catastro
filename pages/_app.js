import '../styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import DisplayUsersData from './displayUsers';
import { Row, Col } from 'antd';

function MyApp({ Component, pageProps }) {

const client = new ApolloClient({
uri: "http://localhost:5000/graphql",
cache: new InMemoryCache(),

});

return (
<>
 <ApolloProvider client={client}>
    <Row justify="space-around">
      <Col span={10}>
          <Component {...pageProps} />
      </Col>
          
      {/* <Col span={10}>
      <br/>
          <DisplayUsersData/>
      </Col> */}
    </Row>

    </ApolloProvider>

</>
)
}

export default MyApp