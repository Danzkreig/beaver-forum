import { useState, useEffect } from "react";
export default function Mario() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(13);
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [error, setError] = useState("");
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    const users = async () => {
      const data = await fetch("http://localhost:8080/").then((response) =>
        response.json().then((response) => setUserdata(response))
      );
    };
    setInterval(users, 3000);
  }, [error]);
  useEffect(() => {
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
  });
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col gap-24">
      <div className="w-1/5 h-1/5 bg-slate-300 rounded-lg flex items-center flex-col justify-around">
        <h1>Sign Up!</h1>
        <div>
          <tag>Username:</tag>
          <input
            type="text"
            placeholder="ZzOzZ"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <tag>Age:</tag>
          <input
            type="number"
            placeholder=""
            min="13"
            max="99"
            className="w-32"
            id="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div>
          <tag>Password:</tag>
          <input
            type="password"
            placeholder=""
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <tag>Confirm Password:</tag>
          <input
            type="password"
            placeholder=""
            id="cpassword"
            onChange={(e) => {
              setcPassword(e.target.value);
            }}
          />
        </div>
        <p className="text-red-500 text-sm" id="error">
          {error}
        </p>
        <button
          className="bg-blue-700 rounded text-white pr-1 pl-1"
          onClick={() => {
            if (error === "") {
              fetch("http://localhost:8080/", {
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
          }}
        >
          Confirm!
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {userdata.map((profile) => {
          return (
            <div className="flex flex-col h-16 bg-black pt-3 pb-3 text-white rounded items-center justify-center">
              <h1>username: {profile.name} </h1>
              <h1>age: {profile.age} </h1>
              <h1>password: {profile.password} </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
