import { fakeConspects } from '../../fakeData/getFakeConspects';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

import Screen from '../Screen/Screen';

export default function Pages() {
  const section = fakeConspects.conspects[2].sections[1];

  return (
    <Screen title={section.title} optionsHandler={() => {}}>
      <Breadcrumbs />
    </Screen>
  );
}
