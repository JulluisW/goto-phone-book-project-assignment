/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

//Components
import { Input, message } from "antd";

//Styles
import * as styles from "./styles";
import * as global_style from "@/styles/globalStyle";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";
import { FETCH_CONTACT_BY_PK } from "@/query";
import { useQuery } from "@apollo/client";

//Types
type Props = {
  type: "add" | "edit";
  datas: Contact | null;
  current_id: number | null;
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

export function ContactForm({ type = "add", datas, current_id }: Props) {
  const { data, loading } = useQuery(FETCH_CONTACT_BY_PK, {
    variables: {
      contactByPkId: Number(current_id),
    },
  });

  //States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonesPayload, setPhonesPayload] = useState([{ number: "" }]);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  //Constants
  const router = useRouter();
  const { addContact, editContact, fetchContactByName } = useContactAPI();

  React.useEffect(() => {
    if (current_id == null) {
      return;
    } else if (!loading && !!data.contact_by_pk) {
      setFirstName(data.contact_by_pk.first_name);
      setLastName(data.contact_by_pk.last_name);
      setPhonesPayload(data.contact_by_pk.phones);
    }
  }, [loading]);

  //Functions
  const onHandleAddContact = async () => {
    try {
      const contact = await fetchContactByName({
        first_name: firstName,
        last_name: lastName,
      });

      if (contact.length !== 0) {
        message.error(
          "Name is already in use, please change it to other name."
        );
        return;
      }

      const res: any = await addContact({
        first_name: firstName,
        last_name: lastName,
        phones: phonesPayload.filter((phone) => phone.number !== ""),
      });

      if (res.insert_contact) {
        message.success("Add contact success!");
        router.push("/contacts", {});

        return;
      } else {
        message.error(
          "Phone(s) number already in use, please change/edit the number(s)"
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleEditContact = async () => {
    try {
      await editContact({
        id: Number(current_id),
        first_name: firstName,
        last_name: lastName,
      });
      message.success("Edit contact success!");
      router.push("/contacts");
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleSubmitData = () => {
    if (type == "add") {
      onHandleAddContact();
    } else if (type == "edit") {
      onHandleEditContact();
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            phonesPayload.map((phone: any, idx: number) => (
              <Input
                className={styles.contact_input}
                key={idx}
                type="text"
                name="phones"
                id="phones"
                value={phone?.number}
                onChange={(e) => {
                  const output = phonesPayload;
                  output[idx].number = e.target.value;
                  setPhonesPayload(output);
                  forceUpdate();
                  return;
                }}
              />
            ))
          )}
        </div>
        <h3
          className={global_style.title_header_style}
          onClick={() => setPhonesPayload((prev) => [...prev, { number: "" }])}
        >
          Add Phone
        </h3>
      </div>
      <div className={styles.contact_form_buttons_container}>
        <button onClick={() => router.back()}>Cancel</button>
        <button onClick={onHandleSubmitData}>Submit</button>
      </div>
    </div>
  );
}
