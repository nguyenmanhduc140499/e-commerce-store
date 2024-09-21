import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
export default client