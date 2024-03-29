import { gql } from "apollo-server";

export const typeDefs = gql`
  type Unemployment {
    id: Int
    id_county: Int
    period: String
    total: Int
    females: Int
    males: Int
    paid: Int
    unpaid: Int
    unemployment_rate: Float
    females_unemployment_rate: Float
    males_unemployment_rate: Float
    no_studies: Int
    primar: Int
    gimnazial: Int
    highschool: Int
    post_highschool: Int
    professional: Int
    universitar: Int
    under25: Int
    between25_29: Int
    between30_39: Int
    between40_49: Int
    between50_55: Int
    over55: Int
    urban: Int
    rural: Int
    females_urban: Int
    females_rural: Int
    males_urban: Int
    males_rural: Int
    county_name: String
  }

  input FavouritesInput {
    content: String!
  }

  type Query {
    unemploymentData: [Unemployment]
    getCharts(input: ChartsInput): [ChartsOutput]
    authVerify: String
    getUsers(input: UserPageInput): UserPageOutput
    getFavouriteCharts: [FavChartsOutput]
  }

  type Mutation {
    insertFavourite(input: FavouritesInput!): Int
    deleteFavourite(input: Int): String
  }

  input DateTime {
    year: Int!
    month: Int!
  }

  type Dataset {
    label: String!
    data: [Float]
  }

  type ChartsOutput {
    chartType: String!
    labels: [String]!
    datasets: [Dataset]!
  }

  type FavChartsOutput {
    id : Int
    chartType: String!
    labels: [String]!
    datasets: [Dataset]!
  }

  scalar Date

  input ChartsInput {
    counties: [Int]!
    startDate: Date!
    endDate: Date!
    criteria: [String]!
  }

  input UserPageInput {
    pageNumber: Int!
    pageSize: Int!
  }

  type UserPageOutput {
    users: [User]!
    pageNumber: Int!
    pageSize: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type User {
    id: Int!
    email: String!
    last_time_active: Date!
    created_at: Date!
  }
`;
