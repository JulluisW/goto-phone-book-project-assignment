import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export default function useContactAPI() {
  const fetchContactList = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query GetContactList(
            $distinct_on: [contact_select_column!]
            $limit: Int
            $offset: Int
            $order_by: [contact_order_by!]
            $where: contact_bool_exp
          ) {
            contact(
              distinct_on: $distinct_on
              limit: $limit
              offset: $offset
              order_by: $order_by
              where: $where
            ) {
              created_at
              first_name
              id
              last_name
              phones {
                number
              }
            }
          }
        `,
      });
      return data.contact;
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = () => {
    console.log("AAA");
    return "AAA";
  };

  return {
    fetchContactList,
    addContact,
  };
}
