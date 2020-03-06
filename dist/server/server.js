"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require("apollo-server"), ApolloServer = _a.ApolloServer, gql = _a.gql;
// The GraphQL schema
var typeDefs = gql(__makeTemplateObject(["\n  type Query {\n    \"A simple type for getting started!\"\n    hello: String\n  }\n"], ["\n  type Query {\n    \"A simple type for getting started!\"\n    hello: String\n  }\n"]));
// A map of functions which return data for the schema.
var resolvers = {
    Query: {
        hello: function () { return "world"; }
    }
};
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("🚀 Server ready at ", url);
});
