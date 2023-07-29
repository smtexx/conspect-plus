import { fakeConspects } from '../../fakeData/getFakeConspects';
import Screen from '../Screen/Screen';
import ResourceLink from '../ResourceLink/ResourceLink';

export default function Section() {
  const conspect = fakeConspects.conspects[2];

  return (
    <>
      <Screen title={conspect.title} optionsHandler={() => {}}>
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
    </>
  );
}
