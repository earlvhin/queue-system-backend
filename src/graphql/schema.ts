import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import { getUserById, getAllUsers } from '../services/User.service';
import { User } from '../model/User.model';

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLString},
            },
            async resolve(parentValue, args) {
                return await getUserById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parentValue, args){
                return getAllUsers();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})