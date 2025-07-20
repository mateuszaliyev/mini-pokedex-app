import { API_BASE_URL } from "@/configuration";
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(API_BASE_URL);
