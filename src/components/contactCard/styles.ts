import { css } from "@emotion/css";

export const contact_card_container = css`
  border-radius: 8px;
  padding: 5px 10px;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-bottom: 1px solid rgba(211, 211, 211, 0.425);
  background: white;
  display: flex;
  // justify-content: center;
  gap: 10px;
`;

export const contact_card_description_container = css`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

export const contact_card_span = css`
  display: inline-block;
  width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: green;
  font-size: 14px;

  @media only screen and (min-width: 540px) {
    width: 150px;
  }

  @media only screen and (min-width: 540px) {
    width: 250px;
  }

  @media only screen and (min-width: 767px) {
    width: 100px;
  }
`;
