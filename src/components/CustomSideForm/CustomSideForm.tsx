import { Form } from 'react-bootstrap';

interface I_Props {
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export default function CustomSideForm({
  title,
  description,
  children,
  onSubmit,
}: I_Props) {
  return (
    <Form onSubmit={onSubmit}>
      <h5>{title}</h5>
      <p>{description}</p>
      {children}
    </Form>
  );
}
