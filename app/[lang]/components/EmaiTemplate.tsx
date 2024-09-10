import * as React from "react";

export type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

export const EmailTemplate = ({ name, email, message }: EmailTemplateProps) => (
  <div>
    <h1>{name} wants to get in touch with you!</h1>
    <h2> You can reach him/her at this email {email}</h2>
    <h2>Him/her left you a message:</h2>
    <p>"${message}"</p>
  </div>
);
