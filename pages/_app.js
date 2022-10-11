import '../styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
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
      <Col span={15}>
          <Component {...pageProps} />
      </Col>
          
    </Row>

    </ApolloProvider>

</>
)
}

export default MyApp