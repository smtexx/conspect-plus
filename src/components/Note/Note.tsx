import { fakeConspects } from '../../fakeData/getFakeConspects';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Screen from '../Screen/Screen';
import Token from '../Token/Token';

export default function Note() {
  const page = fakeConspects.conspects[1].sections[1].pages[0];

  return (
    <Screen title={page.title}>
      <Breadcrumbs />
      <p className="mb-0">
        <span>Создано: </span>
        <span>{page.created.toLocaleString()}</span>
      </p>
      <p>
        <span>Изменено: </span>
        <span>{page.saved.toLocaleString()}</span>
      </p>
      <div className="text-white pt-3">
        {page.tokens.map((token, idx) => (
          <Token key={idx} token={token} />
        ))}
      </div>
    </Screen>
  );
}
