interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export default function EmailTemplate({
  name,
  email,
  message,
}: Readonly<EmailTemplateProps>) {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: "#333",
        whiteSpace: "pre-wrap",
      }}
    >
      <h1 style={{ color: "#007BFF" }}>
        {name} wants to get in touch with you!
      </h1>
      <h3>
        {`You can reach ${name} by email at `}
        <a href={`mailto:${email}`} style={{ color: "#007BFF" }}>
          {email}
        </a>
      </h3>
      <h3>He/She left you the following message:</h3>
      <p
        style={{
          backgroundColor: "#f9f9f9",
          padding: "15px",
          borderLeft: "5px solid #007BFF",
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </p>
    </div>
  );
}
