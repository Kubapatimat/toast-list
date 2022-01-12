import "./AddToastModal.css";

function AddToastModal({
  addToast,
  newToast,
  setNewToast,
  addIngredient,
  removeIngredient,
  setModalVisible,
}) {
  const availableIngredients = [
    "Chleb tostowy",
    "Masło",
    "Margaryna",
    "Ser",
    "Szynka",
    "Pomidor",
    "Ogórek",
    "Cebula",
    "Tuńczyk",
    "Łosoś wędzony",
    "Dżem",
    "Nutella",
    "Majonez",
    "Keczup",
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Dodaj tost</h2>
        <form onSubmit={addToast}>
          <label>
            Czas tostowania w sekundach
            <input
              type="number"
              min="0"
              className="add-toast-time"
              onChange={(e) => setNewToast({ ...newToast, toastTime: e.target.value })}
              value={newToast.toastTime}
            />
          </label>
          <label>
            Dodatkowe informacje
            <input
              type="text"
              className="add-toast-comment"
              onChange={(e) => setNewToast({ ...newToast, comment: e.target.value })}
              value={newToast.comment}
            />
          </label>
          <div className="ingredients-container">
            <div className="column">
              <div className="add-ingredient">Dodaj składnik</div>
              <div className="buttons">
                {availableIngredients.map((ingredient, i) => (
                  <button type="button" key={i} onClick={() => addIngredient(ingredient)}>
                    {ingredient}
                  </button>
                ))}
              </div>
              <button type="button" className="button-remove" onClick={() => removeIngredient()}>
                Usuń górny składnik
              </button>
            </div>
            <div className="column">
              <div className="ingredients">Składniki</div>
              <div className="ingredients-list-container">
                <div className="ingredients-list">
                  <ul>
                    {newToast.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">Dodaj</button>
        </form>
      </div>
      <div className="close-modal" onClick={() => setModalVisible(false)}>
        X
      </div>
    </div>
  );
}

export default AddToastModal;
