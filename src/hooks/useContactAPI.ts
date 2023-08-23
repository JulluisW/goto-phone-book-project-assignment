import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export default function useContactAPI() {
  const fetchContactList = async (page: number) => {
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
        variables: {
          limit: 10,
          offset: page * 10 - 10,
          order_by: [
            {
              last_name: "asc",
            },
          ],
        },
      });
      return data.contact;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPaginationData = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query Contact_aggregate {
            contact_aggregate {
              aggregate {
                count
              }
            }
          }
        `,
      });
      return data.contact_aggregate.aggregate.count;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContactByPk = async (id: number) => {
    try {
      const { data } = await client.query({
        query: gql`
          query Contact_by_pk($contactByPkId: Int!) {
            contact_by_pk(id: $contactByPkId) {
              first_name
              id
              last_name
              phones {
                number
                id
                created_ad
              }
            }
          }
        `,
        variables: {
          contactByPkId: id,
        },
      });
      return data.contact_by_pk;
    } catch (error) {
      console.log("error", error);

      return "Contact's not found!";
    }
  };

  const addContact = async ({
    first_name,
    last_name,
    phones,
  }: {
    first_name: string;
    last_name: string;
    phones: any;
  }) => {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation AddContactWithPhones(
            $first_name: String!
            $last_name: String!
            $phones: [phone_insert_input!]!
          ) {
            insert_contact(
              objects: {
                first_name: $first_name
                last_name: $last_name
                phones: { data: $phones }
              }
            ) {
              returning {
                first_name
                last_name
                id
                phones {
                  number
                }
              }
            }
          }
        `,
        variables: {
          first_name: first_name,
          last_name: last_name,
          phones: phones,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (contactId: number) => {
    try {
      const { data } = await client.query({
        query: gql`
          mutation Delete_contact_by_pk($deleteContactByPkId: Int!) {
            delete_contact_by_pk(id: $deleteContactByPkId) {
              first_name
              id
              last_name
              created_at
            }
          }
        `,
        variables: {
          deleteContactByPkId: contactId,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchContactList,
    fetchPaginationData,
    fetchContactByPk,
    addContact,
    deleteContact,
  };
}
