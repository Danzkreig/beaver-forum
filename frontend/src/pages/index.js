import { useState, useEffect } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(13);
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  const [userdata, setUserdata] = useState([]);
  async function refreshData() {
    await fetch("http://localhost:8080/users").then((response) =>
      response.json().then((response) => setUserdata(response))
    );
  }

  function validateInput() {
    if (age < 13) {
      setError("You must be older then 13.");
    } else if (age > 99) {
      setError("Invalid age");
    } else if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
    } else if (password.length < 8) {
      setError("Password must be 8 characters long.");
    } else if (password != cpassword) {
      setError("Password don't match");
    } else {
      setError("");
    }
  }
  function postData() {
    if (error === "") {
      fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          age: parseInt(age),
          password: password,
        }),
      });
      console.log("all good");
    }
    refreshData();
  }
  function delData(id) {
    fetch("http://localhost:8080/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    console.log("Deleted " + id);
    let main = document.getElementById(id + "main");
    main.classList.add("hidden");
    refreshData();
  }
  function patchData(id) {
    let patch = document.getElementById(id + "patch");
    let editable = document.getElementsByClassName(id);
    let edit = document.getElementById(id + "edit");
    document.querySelectorAll("." + id).forEach((el) => {
      if (el.value === "") {
        el.setAttribute("value", el.getAttribute("placeholder"));
      } else {
        el.setAttribute("placeholder", el.value);
      }
      el.setAttribute("disabled", true);
    });
    edit.classList.remove("hidden");
    patch.classList.add("hidden");
    fetch("http://localhost:8080/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editable[0].getAttribute("placeholder"),
        age: editable[1].getAttribute("placeholder"),
        password: editable[2].getAttribute("placeholder"),
        id: id,
      }),
    });

    refreshData();
  }
  function editData(id) {
    let patch = document.getElementById(id + "patch");
    let edit = document.getElementById(id + "edit");
    edit.classList.add("hidden");
    patch.classList.remove("hidden");
    document.querySelectorAll("." + id).forEach((el) => {
      el.removeAttribute("disabled");
    });
    refreshData();
  }
  useEffect(() => {
    refreshData();
  }, []);
  return (
    <div
      className="flex justify-center items-center w-screen h-screen flex-col gap-24 from-blue-300 to-blue-700  bg-gradient-to-r"
      onLoad={() => {
        refreshData();
      }}
    >
      <div className="w-2/5 h-2/5 bg-transparent rounded-lg flex items-center flex-col justify-around">
        <h1 className="text-4xl text-blue-900">Sign Up!</h1>
        <div>
          <input
            className="shadow-sm border-[1px] border-solid border-gray-400 rounded placeholder:pl-2"
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="shadow-sm border-[1px] border-solid border-gray-400 rounded placeholder:pl-2 w-44"
            type="number"
            placeholder="Age"
            min="13"
            max="99"
            id="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="shadow-sm border-[1px] border-solid border-gray-400 rounded placeholder:pl-2"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="shadow-sm border-[1px] border-solid border-gray-400 rounded placeholder:pl-2"
            type="password"
            placeholder="Confirm Password"
            id="cpassword"
            onChange={(e) => {
              setcPassword(e.target.value);
            }}
          />
        </div>
        <p className="text-red-500 text-sm shadow rounded  bg-black" id="error">
          {error}
        </p>
        <button
          className="bg-blue-700 rounded text-white pr-1 pl-1"
          onClick={() => {
            validateInput();
            postData();
            refreshData();
          }}
        >
          Confirm!
        </button>
      </div>
      <button
        className="rounded bg-green-700 text-white p-2"
        onClick={() => {
          refreshData();
        }}
      >
        ⟳
      </button>
      <div className="flex flex-row">
        {userdata.map((profile) => {
          return (
            <div className="flex flex-col mr-3" id={profile.id + "main"}>
              <div className="flex flex-col h-[150px]  bg-green-500 p-3 text-white *:text-black *:*:placeholder:text-black rounded items-center justify-center ">
                <div className="flex flex-row">
                  <h1>username:</h1>
                  <input
                    className={profile.id}
                    type="text"
                    placeholder={profile.name}
                    disabled
                  />
                </div>
                <div className="flex flex-row">
                  <h1>age:</h1>
                  <input
                    type="number"
                    className={profile.id}
                    placeholder={profile.age}
                    disabled
                  />
                </div>
                <div className="flex flex-row">
                  <h1>password:</h1>
                  <input
                    className={profile.id}
                    type="text"
                    placeholder={profile.password}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 justify-around relative bottom-8">
                <button
                  className="rounded bg-green-700 text-white p-2"
                  onClick={() => {
                    delData(profile.id);
                  }}
                >
                  DEL
                </button>
                <button
                  className="rounded bg-green-700 text-white p-2"
                  onClick={() => {
                    editData(profile.id);
                  }}
                  id={profile.id + "edit"}
                >
                  EDIT
                </button>
                <button
                  className="rounded bg-green-700 text-white p-2 hidden"
                  id={profile.id + "patch"}
                  onClick={() => {
                    patchData(
                      profile.id,
                      profile.name,
                      profile.password,
                      profile.age
                    );
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
