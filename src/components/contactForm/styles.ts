import { css } from "@emotion/css";

export const contact_form_container = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const contact_form_input_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const contact_input = css`
  width: 100%;
`;

export const contact_form_buttons_container = css`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const contact_phone_inputs_container = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const add_phone_button_style = css`
  border: none;
  background-color: transparent;
  font-size: 40px;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  border-radius: 50%;
`;
