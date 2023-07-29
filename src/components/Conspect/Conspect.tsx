import { useState } from 'react';
import Screen from '../Screen/Screen';
import { fakeConspects } from '../../fakeData/getFakeConspects';
import DataCard from '../DataCard/DataCard';
import CustomSideMenu from '../CustomSideMenu/CustomSideMenu';
import CreateConspectForm from '../CreateConspectForm/CreateConspectForm';

export default function Conspect() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleMenuOpen() {
    setMenuIsOpen(true);
  }
  function handleMenuClose() {
    setMenuIsOpen(false);
  }

  const { conspects } = fakeConspects;

  return (
    <>
      <Screen title="Мои конспекты" optionsHandler={handleMenuOpen}>
        <div className="row gy-4 justify-content-start align-items-stretch">
          {conspects.map(({ id, title, description, saved }) => (
            <div className="col-auto" key={id}>
              <DataCard
                id={id}
                title={title}
                description={description}
                saved={saved}
              />
            </div>
          ))}
        </div>
      </Screen>

      <CustomSideMenu show={menuIsOpen} onHide={handleMenuClose}>
        <CreateConspectForm />
      </CustomSideMenu>
    </>
  );
}
