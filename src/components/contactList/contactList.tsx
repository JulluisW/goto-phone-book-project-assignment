/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

//API
import { Global } from "@emotion/react";

//Components
import { Avatar, Pagination, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ContactCard } from "..";

//Styles
import * as styles from "./styles";
import * as global_styles from "@/components/globalStyle";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

//Types
type Props = {
  paging: any;
  contacts: any;
};

export function ContactList({ paging = 0, contacts = [] }: Props) {
  //States
  const [contactList, setContactList] = useState(contacts);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  //Constants
  const { fetchContactList } = useContactAPI();
  const router = useRouter();

  // Functions
  const onHandleAddContact = () => {
    router.push("/contacts/add");
  };
  const onHandleChangePage = async (page: number) => {
    try {
      const data = await fetchContactList(page);
      setContactList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
            <PlusOutlined />
          </button>
        </div>
        <ul className={styles.favourite_scroller_container_style}>
          {contactList.map((contact: any) => (
            <li
              className={styles.favourite_item_container_style}
              key={contact.id}
            >
              <Avatar className={global_styles.avatar_style} size={40}>
                <span className={global_styles.avatar_title_style}>
                  {contact.last_name[0]?.toUpperCase()}
                  {contact.first_name[0]?.toUpperCase()}
                </span>
              </Avatar>
              <span className={styles.favourite_contact_name_style}>
                {contact.first_name}
              </span>
            </li>
          ))}
          <li className={styles.favourite_item_container_style}>
            <Avatar className={global_styles.avatar_style} size={40}>
              <PlusOutlined
                style={{
                  color: "white",
                }}
              />
            </Avatar>
            <span className={styles.favourite_contact_name_style}>Add</span>
          </li>
        </ul>
      </div>
      <div>
        <h1 className={styles.title_style}>All Contacts</h1>
        <div className={styles.contacts_scroller_container_style}>
          <Row gutter={[20, 10]}>
            {contactList.map((contact: any) => (
              <ContactCard
                key={contact.id}
                props={{
                  id: contact.id,
                  first_name: contact.first_name,
                  last_name: contact.last_name,
                  phones: contact.phones,
                }}
              />
            ))}
          </Row>
        </div>

        <Pagination
          onChange={onHandleChangePage}
          defaultCurrent={1}
          pageSize={10}
          total={paging}
        />
      </div>
    </div>
  );
}
