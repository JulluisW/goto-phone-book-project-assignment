/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

//API
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

//Styles
import * as styles from "./styles";

//Types
type Props = {
  type: "add" | "edit";
};

export function ContactForm({ type = "add" }: Props) {
  //States
  const [phones, setPhones] = useState([{ number: "" }]);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

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
    <div className={styles.contact_form_container}>
      <div className={styles.contact_form_input_container}>
        <label htmlFor="first_name">First Name:</label>
        <input
          className={styles.contact_input}
          type="text"
          name="first_name"
          id="first_name"
        />
      </div>
      <div className={styles.contact_form_input_container}>
        <label htmlFor="last_name">Last Name:</label>
        <input
          className={styles.contact_input}
          type="text"
          name="last_name"
          id="last_name"
        />
      </div>
      <div className={styles.contact_form_input_container}>
        <label>Phones:</label>
        <div className={styles.contact_phone_inputs_container}>
          {phones.map((phone, idx) => (
            <input
              className={styles.contact_input}
              key={idx}
              type="text"
              name="phones"
              id="phones"
              value={phone.number}
              onChange={(e) => {
                const output = phones;
                output[idx].number = e.target.value;
                setPhones(output);
                forceUpdate();
                return;
              }}
            />
          ))}
        </div>
        <button
          className={styles.add_phone_button_style}
          onClick={() => setPhones((prev) => [...prev, { number: "" }])}
        >
          +
        </button>
      </div>
      <div className={styles.contact_form_buttons_container}>
        <button onClick={() => router.push("/contacts")}>Cancel</button>
        <button onClick={onHandleSubmitContact}>Submit</button>
      </div>
    </div>
  );
}
