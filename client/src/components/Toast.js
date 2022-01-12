import "./Toast.css";

function Toast({ i, toast, deleteToast }) {
  return (
    <div className="toast">
      <div className="toast-number">Tost nr {i + 1}</div>
      <div>
        <ul>
          {toast.ingredients.map((ingredient, j) => (
            <li key={j}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="text">Czas tostowania: {toast.toastTime} s</div>
      <div className="text">{toast.comment}</div>
      <button className="delete-toast" onClick={() => deleteToast(toast._id)}>
        Usuń
      </button>
    </div>
  );
}

export default Toast;
