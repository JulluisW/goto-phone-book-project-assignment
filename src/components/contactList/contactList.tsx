/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//API
import { css } from "@emotion/css";
import { Global, css as cssR } from "@emotion/react";

//Constants
import { dummy_contacts_list } from "@/constants/contacts";

//Styles
import * as styles from "./styles";

//Types
type Props = {
  contacts: any;
};

export function ContactList({ contacts = [] }: Props) {
  //Constants
  const router = useRouter();

  console.log(contacts, ",<<<<<");

  // const [contactList, setContactList] = useState([dummy_contacts_list]);
  // useEffect(() => {
  //   setContactList(contacts);
  // }, [contacts]);

  // Functions
  const onHandleAddContact = () => {
    router.push("/contacts/add");
  };

  console.log(contacts, "<<<");

  return (
    <div>
      <Global
        styles={cssR`
          * {
            color: gray;
            font-family: 'Open Sans', sans-serif;
          }
        `}
      />

      <div>
        <div className={styles.header_style}>
          <h1>Favourites</h1>
          <button onClick={onHandleAddContact}>+</button>
        </div>
        <ul
          className={css`
            overflow: scroll;
            display: flex;
            gap: 10px;
            padding: 0 0 10px 0;
          `}
        >
          {contacts.map((contact: any) => (
            <li
              className={css`
                list-style: none;
              `}
              key={contact.id}
            >
              <img
                className={css`
                  border-radius: 50%;
                  height: 60px;
                  width: 60px;
                `}
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt={contact.first_name}
              />
              <span
                className={css`
                  text-align: center;
                  display: inline-block;
                  width: 60px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-size: 10px;
                `}
              >
                {contact.first_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>All Contacts</h1>

        <ul
          className={css`
            overflow: scroll;
            height: calc(100vh - 300px);
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          {dummy_contacts_list.map((contact: any) => (
            <li
              key={contact.id}
              className={css`
                border-radius: 4px;
                padding: 5px 10px;
                list-style: none;
                // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                border-bottom: 1px solid rgba(211, 211, 211, 0.425);
              `}
            >
              {contact.last_name} {contact.first_name}
              {contact.phones.map((phone: { number: string }) => (
                <span key={phone.number}>- {phone.number}</span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
