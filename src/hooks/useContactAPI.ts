import client from "@/lib/apollo-client";
import { gql, useMutation } from "@apollo/client";
//Query
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FETCH_CONTACTS,
  FETCH_CONTACT_BY_PK,
  FETCH_PAGINATION_DATA,
} from "@/query";

// const client = getClient();
export default function useContactAPI() {
  const [deleteContactMutation] = useMutation(DELETE_CONTACT);
  const [editContactMutation] = useMutation(EDIT_CONTACT);
  const [addContactMutation] = useMutation(ADD_CONTACT);

  const fetchContactList = async (
    page: number = 1,
    searchQuery: string | null = null
  ) => {
    let whereClauses = null;
    if (searchQuery) {
      whereClauses = {
        _or: [
          {
            last_name: {
              _ilike: searchQuery,
            },
          },
          {
            first_name: {
              _ilike: searchQuery,
            },
          },
        ],
      };
    }

    const res: any = await client.query({
      query: FETCH_CONTACTS,
      variables: {
        limit: 10,
        offset: page * 10 - 10,
        order_by: [
          {
            last_name: "asc",
          },
        ],
        where: whereClauses,
        distinctOn: [],
      },
    });
    return res.data.contact;
  };

  const fetchPaginationData = async () => {
    try {
      const { data } = await client.query({
        query: FETCH_PAGINATION_DATA,
      });
      return data.contact_aggregate.aggregate.count;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContactByPk = async (id: number) => {
    try {
      const { data } = await client.query({
        query: FETCH_CONTACT_BY_PK,
        variables: {
          contactByPkId: id,
        },
      });
      return data.contact_by_pk;
    } catch (error) {
      return "Contact's not found!";
    }
  };

  const fetchContactByName = async ({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }) => {
    try {
      const { data } = await client.query({
        query: gql`
          query Contact($where: contact_bool_exp) {
            contact(where: $where) {
              first_name
              last_name
            }
          }
        `,
        variables: {
          where: {
            _and: [
              {
                _and: [
                  {
                    first_name: {
                      _like: first_name,
                    },
                    last_name: {
                      _like: last_name,
                    },
                  },
                ],
              },
            ],
          },
        },
      });
      return data.contact;
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
      const { data } = await addContactMutation({
        variables: {
          first_name: first_name,
          last_name: last_name,
          phones: phones,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  };

  const editContact = async ({
    id,
    first_name,
    last_name,
  }: {
    id: any;
    first_name: string;
    last_name: string;
  }) => {
    try {
      const { data } = await editContactMutation({
        variables: {
          id: id,
          _set: {
            first_name: first_name,
            last_name: last_name,
          },
        },
      });

      // const { data } = await client.mutate({
      //   mutation: EDIT_CONTACT,
      //   variables: {
      //     id: id,
      //     _set: {
      //       first_name: first_name,
      //       last_name: last_name,
      //     },
      //   },
      // });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (contactId: number) => {
    try {
      const { data } = await deleteContactMutation({
        variables: {
          deleteContactByPkId: contactId,
        },
        // update: (cache) => {
        //   // Remove the deleted contact from the cache
        //   cache.modify({
        //     fields: {
        //       contact(existingContacts = [], { readField }) {
        //         return existingContacts.filter(
        //           (contactRef: any) => contactId !== readField("id", contactRef)
        //         );
        //       },
        //     },
        //   });
        // },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getContactByIds = async (array: []) => {
    try {
      const { data } = await client.query({
        query: gql`
          query Contact($where: contact_bool_exp) {
            contact(where: $where) {
              first_name
              id
              last_name
            }
          }
        `,
        variables: {
          where: {
            id: {
              _in: array,
            },
          },
        },
      });
      return data;
    } catch (error) {
      console.log("error", error);

      return "Contact's not found!";
    }
  };

  return {
    fetchContactList,
    fetchPaginationData,
    fetchContactByPk,
    fetchContactByName,
    addContact,
    editContact,
    deleteContact,
    getContactByIds,
  };
}
