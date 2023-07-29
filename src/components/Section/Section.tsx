import { fakeConspects } from '../../fakeData/getFakeConspects';
import { useState } from 'react';
import Screen from '../Screen/Screen';
import ResourceLink from '../ResourceLink/ResourceLink';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';

export default function Section() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  function handleOptionsOpen() {
    setOptionsIsOpen(true);
  }
  function handleOptionsClose() {
    setOptionsIsOpen(false);
  }

  const conspect = fakeConspects.conspects[2];
  return (
    <>
      <Screen
        title={conspect.title}
        optionsHandler={handleOptionsOpen}
      >
        <ul className="list-unstyled cm-links-list">
          {conspect.sections.map((section, idx) => (
            <li key={section.id}>
              <ResourceLink
                to={`/conspect/${conspect.id}/${section.id}`}
                text={section.title}
                counter={idx}
              />
            </li>
          ))}
        </ul>
      </Screen>

      <CustomSideMenu
        show={optionsIsOpen}
        onHide={handleOptionsClose}
      >
        Hello
      </CustomSideMenu>
    </>
  );
}