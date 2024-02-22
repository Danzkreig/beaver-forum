export default function Mario() {
  const fetchData = async () => {
    const data = await fetch("http://localhost:8080/").then((response) =>
      response.json()
    );
    console.log(data);
    return data;
  };
  fetchData();
  return (
    <div>
      <div>
        <div>
          <tag>Username:</tag>
          <input type="text" placeholder="ZzOzZ" />
        </div>
        <div>
          <tag>Age:</tag>
          <input type="number" placeholder="" />
        </div>
      </div>
    </div>
  );
}
