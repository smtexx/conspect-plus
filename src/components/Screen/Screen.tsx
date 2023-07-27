import React from 'react';
import { Card } from 'react-bootstrap';
import { IoMdOptions } from 'react-icons/io';

interface I_Props {
  title: string;
  children: React.ReactNode;
  optionsHandler?: () => void;
}

export default function Screen({
  title,
  children,
  optionsHandler,
}: I_Props) {
  return (
    <Card className="w-100 pb-4">
      <Card.Header
        as="h3"
        className="text-white fs-4 ps-4 d-flex align-items-center"
      >
        {title}
        <button
          className={`ms-auto d-flex p-2 cm-screen-button ${
            optionsHandler ? '' : 'hidden'
          }`}
          aria-label="Открыть меню опций"
          aria-hidden={optionsHandler ? true : false}
          title="Открыть меню опций"
          onClick={optionsHandler}
        >
          <IoMdOptions />
        </button>
      </Card.Header>
      <Card.Body className="px-lg-4">{children}</Card.Body>
    </Card>
  );
}
