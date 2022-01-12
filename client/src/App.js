import { useState, useEffect } from "react";
import AddToastModal from "./components/AddToastModal";
import Toast from "./components/Toast";
import "./App.css";

const API_URL = "http://localhost:3001";

function App() {
  const initialNewToast = {
    ingredients: [],
    toastTime: 0,
    comment: "",
  };
  const [toasts, setToasts] = useState([]);
  const [newToast, setNewToast] = useState(initialNewToast);
  const [totalTime, setTotalTime] = useState(0);
  const [toasterCapacity, setToasterCapacity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getToasts();
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < toasts.length; i += toasterCapacity) {
      sum += Math.max(...toasts.map((toast) => toast.toastTime).slice(i, i + toasterCapacity));
    }
    setTotalTime(sum);
  }, [toasts, toasterCapacity]);

  const getToasts = () => {
    fetch(`${API_URL}/toasts`)
      .then((res) => res.json())
      .then((data) => setToasts(data))
      .catch((err) => console.log(err));
  };

  const deleteToast = async (id) => {
    const data = await fetch(`${API_URL}/toasts/delete/${id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );

    setToasts((toasts) => toasts.filter((toast) => toast._id !== data._id));
  };

  const addIngredient = (ingredient) => {
    setNewToast({ ...newToast, ingredients: [...newToast.ingredients, ingredient] });
  };

  const removeIngredient = () => {
    const newIngredients = [...newToast.ingredients].slice(0, -1);
    setNewToast({ ...newToast, ingredients: newIngredients });
  };

  const validate = (ingredients, toastTime) => {
    return ingredients.length > 0 && toastTime > 0;
  };

  const addToast = async (e) => {
    e.preventDefault();

    const { ingredients, toastTime, comment } = newToast;

    if (!validate(ingredients, toastTime)) {
      return;
    }

    setModalVisible(false);

    const data = await fetch(`${API_URL}/toasts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients,
        toastTime,
        comment,
      }),
    }).then((res) => res.json());

    setToasts([...toasts, data]);
    setNewToast(initialNewToast);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Lista tostów</h1>
        <label>
          Pojemność tostera (jednocześnie tostów)
          <input
            type="number"
            min="1"
            className="toaster-capacity"
            onChange={(e) => setToasterCapacity(parseInt(e.target.value))}
            value={toasterCapacity}
          />
        </label>

        <div>
          {totalTime !== 0
            ? `Toster będzie dostępny za ${totalTime} s`
            : "Toster jest gotowy do użycia!"}
        </div>
        <div className="toasts">
          {toasts.map((toast, i) => (
            <Toast key={toast._id} i={i} toast={toast} deleteToast={deleteToast} />
          ))}
        </div>

        <div className="open-modal" onClick={() => setModalVisible(true)}>
          +
        </div>
        {modalVisible ? (
          <AddToastModal
            addToast={addToast}
            newToast={newToast}
            setNewToast={setNewToast}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            setModalVisible={setModalVisible}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
