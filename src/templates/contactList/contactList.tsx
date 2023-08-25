/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//API
import { Global } from "@emotion/react";

//Components
import { Avatar, Pagination, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ContactCard } from "@/components/contactCard/contactCard";

//Styles
import * as styles from "./styles";
import * as global_styles from "@/styles/globalStyle";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";
import Search from "antd/es/input/Search";
import { useQuery } from "@apollo/client";

//Query
import { FETCH_CONTACTS, FETCH_PAGINATION_DATA } from "@/query";

//Types
type Props = {
  paging: any;
  contacts: any;
};

export function ContactList({ paging = 0, contacts = [] }: Props) {
  //States
  const [searchQuery, setSearchQuery] = useState("");
  // const [totalData, setTotalData] = useState(paging);
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  //Constants
  const { deleteContact, getContactByIds } = useContactAPI();
  const router = useRouter();

  // Functions
  const onHandleAddContact = () => {
    router.push("/contacts/add");
  };

  const onHandleChangePage = async (page: number) => {
    try {
      setPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleDeleteContact = async (id: number) => {
    try {
      const data = await deleteContact(id);
      if (favourites.some((fav: any) => fav.id == id)) {
        setFavourites((prev: any) => {
          let newDatas = [];
          newDatas = prev.filter((prevData: any) => prevData.id !== id);
          updateFavouriteCache(newDatas);
          return newDatas;
        });
      }
      await refetch();
      await pagingRefect();
    } catch (error) {
      console.log(error);
    }
  };

  const updateFavouriteCache = async (array: {
    id: number;
    first_name: string;
    last_name: string;
  }) => {
    localStorage.setItem("favourites", JSON.stringify(array));
  };

  const fetchFavListFromLocalStorage = async () => {
    try {
      if (typeof localStorage.getItem("favourites") == "string") {
        const storedArrayAsString = localStorage.getItem("favourites");
        const storedArray = JSON.parse(storedArrayAsString || "[]");
        const { contact } = await getContactByIds(
          storedArray.map(
            (el: { last_name: string; first_name: string; id: number }) => el.id
          )
        );

        if (contact) {
          setFavourites(contact);
          updateFavouriteCache(contact);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavListFromLocalStorage();
    refetch();
    pagingRefect();
  }, []);

  const { data, loading, refetch } = useQuery(FETCH_CONTACTS, {
    variables: {
      limit: 10,
      offset: page * 10 - 10,
      order_by: [
        {
          last_name: "asc",
        },
      ],
      where: searchQuery
        ? {
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
          }
        : null,
      distinctOn: [],
    },
  });

  const {
    data: pagingData,
    loading: pagingLoading,
    refetch: pagingRefect,
  } = useQuery(FETCH_PAGINATION_DATA, {
    variables: {
      where: searchQuery
        ? {
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
          }
        : null,
      distinctOn: [],
    },
  });

  return (
    <div>
      <Global styles={styles.global_style} />
      <div>
        <h1 className={global_styles.title_header_style}>Favourites</h1>
        <ul className={styles.favourite_scroller_container_style}>
          {favourites.map((contact: any) => (
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className={styles.header_style}>
          <h1 className={global_styles.title_header_style}>All Contacts</h1>
          <h1
            className={global_styles.title_header_style}
            onClick={onHandleAddContact}
          >
            {/* <PlusOutlined /> */}+ Add
          </h1>
        </div>
        <Search
          onSearch={(value) => {
            setSearchQuery(value);
          }}
        />
        <div className={styles.contacts_scroller_container_style}>
          <Row gutter={[20, 10]}>
            {loading ? (
              <div>Loading....</div>
            ) : (
              data?.contact.map((contact: any) => (
                <ContactCard
                  key={contact.id}
                  props={{
                    id: contact.id,
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                    phones: contact.phones,
                    is_fav: favourites.some(
                      (fav: any) => fav.id === contact.id
                    ),
                    onHandleDeleteContact: onHandleDeleteContact,
                    setFavourites: setFavourites,
                    forceUpdate: forceUpdate,
                    updateFavouriteCache: updateFavouriteCache,
                  }}
                />
              ))
            )}
          </Row>
        </div>

        {pagingLoading ||
        pagingData.contact_aggregate.aggregate.count == 0 ? null : (
          <Pagination
            onChange={onHandleChangePage}
            current={page}
            pageSize={10}
            total={pagingData.contact_aggregate.aggregate.count}
          />
        )}
      </div>
    </div>
  );
}
