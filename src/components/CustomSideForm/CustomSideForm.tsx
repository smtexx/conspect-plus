import { Form } from 'react-bootstrap';

interface I_Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function CustomSideForm({
  title,
  description,
  children,
}: I_Props) {
  return (
    <Form>
      <h5>{title}</h5>
      <p>{description}</p>
      {children}
    </Form>
  );
}
