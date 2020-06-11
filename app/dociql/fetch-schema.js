const graphql = require('graphql')
const request = require("sync-request")

const converter = require('graphql-2-json-schema');

module.exports = function (graphUrl) {

    const requestBody = {
        query: graphql.introspectionQuery
    };

    const responseBody = request("POST", graphUrl, {
        'headers': {
            'authorization': 'Basic ' + Buffer("hm_dev_92c234926daf527846999a15d4142f50b0810ac5d14a52520d8fd7988ccbb748" + ':' + '').toString('base64')
        },
        json: requestBody
    }).getBody('utf8');

    const introspectionResponse = JSON.parse(responseBody);

    const jsonSchema = converter.fromIntrospectionQuery(introspectionResponse.data);
    const graphQLSchema = graphql.buildClientSchema(introspectionResponse.data, { assumeValid: true});

    return {
        jsonSchema,
        graphQLSchema
    }
}
