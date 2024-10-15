const BookItem = () =>
    <div className="card-item position-relative">
        <div className="position-absolute number-card card-item-text">1.</div>
        <div className="row">
            <div className="col-8">
                <p className="card-item-text">Осипов М.Ю.</p>
                <p className="card-item-text">Актуальные проблемы права. Учебное пособие</p>
                <p className="card-item-text-small"><span className="card-item-text-small-grey">Тип:</span> учебное пособие</p>
                <p className="m-0"><span className="card-item-text-small-grey">Коллекция:</span> <a>Ай Пи Ар Медиа, Вузовское образование</a></p>
                <p className="card-item-text-small-grey">В учебном пособии рассматриваются основные проблемы права,
                    а именно: какую роль играет право в условиях глобализации, какое место занимает общая теория права в системе юридических наук. </p>
            </div>
            <div className="col-1">
                <p className="card-item-text-grey">Стр.</p>
                <p className="card-item-text-small">365</p>
            </div>
            <div className="col-2">
                <p className="card-item-text-grey">Издательство</p>
                <p className="card-item-text-small">Ай Пи Ар Медиа</p>
            </div>
            <div className="col-1">
                <p className="card-item-text-grey">Год</p>
                <p className="card-item-text-small">2024</p>
            </div>
        </div>

    </div>;
export default BookItem;