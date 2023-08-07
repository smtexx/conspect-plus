import Screen from '../Screen/Screen';

export default function Page404() {
  return (
    <Screen title="404">
      <div>
        <h4 className="fs-4 ">Страница не найдена</h4>
        <p style={{ maxWidth: '40rem' }}>
          Вы перешли по недействительной ссылке. Страница которую вы
          запросили отсутствует на сервере. Вы можете перейти на
          другую страницу используя навигационно е меню в верхней
          части страницы.
        </p>
      </div>
    </Screen>
  );
}
