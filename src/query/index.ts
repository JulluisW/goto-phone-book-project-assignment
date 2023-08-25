import { gql } from "@apollo/client";

export const FETCH_CONTACTS = gql`
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
`;

export const FETCH_PAGINATION_DATA = gql`
  query Contact_aggregate {
    contact_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const FETCH_CONTACT_BY_PK = gql`
  query Contact_by_pk($contactByPkId: Int!) {
    contact_by_pk(id: $contactByPkId) {
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

export const ADD_CONTACT = gql`
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
`;

export const EDIT_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation Delete_contact_by_pk($deleteContactByPkId: Int!) {
    delete_contact_by_pk(id: $deleteContactByPkId) {
      id
    }
  }
`;
