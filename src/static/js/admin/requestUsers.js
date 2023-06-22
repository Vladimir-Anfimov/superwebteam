import { coreRequestHandler } from "../common/requestHandler.js";

const requestUsers = (pageNumber, pageSize) => {
  const body = {
    query: `
          query GetUsers($input: UserPageInput) {
            getUsers(input: $input) {
              hasNextPage,
              hasPreviousPage,
              pageNumber,
              pageSize,
              users {
                created_at,
                email,
                id,
                last_time_active
              }
            }
          }
        `,
    variables: {
      input: {
        pageNumber,
        pageSize,
      },
    },
  };

  return coreRequestHandler(body);
};

export { requestUsers };
