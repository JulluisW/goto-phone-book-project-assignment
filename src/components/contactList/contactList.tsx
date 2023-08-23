/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useRouter } from "next/navigation";

//API
import { Global } from "@emotion/react";

//Styles
import * as styles from "./styles";
import { ContactCard } from "..";

//Types
type Props = {
  contacts: any;
};

export function ContactList({ contacts = [] }: Props) {
  //Constants
  const router = useRouter();

  // Functions
  const onHandleAddContact = () => {
    router.push("/contacts/add");
  };

  return (
    <div>
      <Global styles={styles.global_style} />
      <div>
        <div className={styles.favourite_header_style}>
          <h1 className={styles.title_style}>Favourites</h1>
          <button
            className={styles.add_button_style}
            onClick={onHandleAddContact}
          >
            +
          </button>
          <button onClick={() => localStorage.setItem("myCat", "Tom")}>
            tambah locak
          </button>
        </div>
        <ul className={styles.favourite_scroller_container_style}>
          {contacts.map((contact: any) => (
            <li
              className={styles.favourite_item_container_style}
              key={contact.id}
            >
              <img
                className={styles.favourite_contact_image_style}
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                alt={contact.first_name}
              />
              <span className={styles.favourite_contact_name_style}>
                {contact.first_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className={styles.title_style}>All Contacts</h1>
        <ul className={styles.contacts_scroller_container_style}>
          {contacts.map((contact: any) => (
            <ContactCard
              props={{
                first_name: contact.first_name,
                last_name: contact.last_name,
                phones: contact.phones,
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
