/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

//Components
import { Input } from "antd";

//Styles
import * as styles from "./styles";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

//Types
type Props = {
  type: "add" | "edit";
  datas: Contact | null;
};

type Contact = {
  __typename: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: Phone[];
};

type Phone = {
  number: string;
};

export function ContactForm({ type = "add", datas }: Props) {
  //States
  const [firstName, setFirstName] = useState(datas?.first_name || "");
  const [lastName, setLastName] = useState(datas?.last_name || "");
  const [phones, setPhones] = useState(datas?.phones || [{ number: "" }]);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  //Constants
  const router = useRouter();
  const { addContact } = useContactAPI();

  // Functions
  const onHandleSubmitContact = async () => {
    try {
      const data = await addContact({
        first_name: firstName,
        last_name: lastName,
        phones: phones,
      });

      console.log(data);
      router.push("/contacts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.contact_form_container}>
      <div className={styles.contact_form_input_container}>
        <label htmlFor="first_name">First Name:</label>
        <Input
          className={styles.contact_input}
          type="text"
          name="first_name"
          id="first_name"
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
      </div>
      <div className={styles.contact_form_input_container}>
        <label htmlFor="last_name">Last Name:</label>
        <Input
          className={styles.contact_input}
          type="text"
          name="last_name"
          id="last_name"
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        />
      </div>
      <div className={styles.contact_form_input_container}>
        <label>Phones:</label>
        <div className={styles.contact_phone_inputs_container}>
          {phones.map((phone, idx) => (
            <Input
              className={styles.contact_input}
              key={idx}
              type="text"
              name="phones"
              id="phones"
              value={phone?.number}
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
