/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//API
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

//Constants

//Types
type Props = {
  type: "add" | "edit";
};

export function ContactForm({ type = "add" }: Props) {
  //States

  //Constants
  const router = useRouter();

  // Functions
  const onHandleSubmitContact = async () => {
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
          first_name: "Tommi",
          last_name: "Immot",
          phones: [
            {
              number: "+34580438095435",
            },
            {
              number: "+345435435345",
            },
          ],
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label htmlFor="first_name">First Name:</label>
      <input type="text" name="first_name" id="first_name" />
      <label htmlFor="first_name">First Name:</label>
      <input type="text" name="last_name" id="last_name" />
      <label htmlFor="first_name">First Name:</label>
      <input type="text" name="first_name" id="first_name" />
      <label htmlFor="first_name">First Name:</label>
      <input type="text" name="first_name" id="first_name" />

      <button onClick={onHandleSubmitContact}>Coba</button>

      <button onClick={() => router.push("/contacts")}>Cancel</button>
    </div>
  );
}
