const BookItem = () =>
    <div className="card-item position-relative">
        <div className="position-absolute number-card text">1.</div>
        <div className="row">
            <div className="col-8">
                <p className="text">Осипов М.Ю.</p>
                <p className="text">Актуальные проблемы права. Учебное пособие</p>
                <p className="text-small"><span className="text-small-grey">Тип:</span> учебное пособие</p>
                <p className="m-0"><span className="text-small-grey">Коллекция:</span> <a href="#" /* eslint-disable-line jsx-a11y/anchor-is-valid */>Ай Пи Ар Медиа, Вузовское образование</a></p>
                <p className="text-small-grey">В учебном пособии рассматриваются основные проблемы права,
                    а именно: какую роль играет право в условиях глобализации, какое место занимает общая теория права в системе юридических наук. </p>
            </div>
            <div className="col-1">
                <p className="text-grey">Стр.</p>
                <p className="text-small">365</p>
            </div>
            <div className="col-2">
                <p className="text-grey">Издательство</p>
                <p className="text-small">Ай Пи Ар Медиа</p>
            </div>
            <div className="col-1">
                <p className="text-grey">Год</p>
                <p className="text-small">2024</p>
            </div>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-3">
            <button className="btn btn-primary btn-small">Добавить в заказ • 3000 ₽</button>
            <button className="btn btn-outline-primary btn-small">Подробнее о книге</button>
        </div>
    </div>;
export default BookItem;