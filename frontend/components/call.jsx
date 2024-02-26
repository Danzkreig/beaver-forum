export const serdata = async (swan) => {
  const data = await fetch("http://localhost:8080/").then((response) =>
    response.json().then((response) => swan(response))
  );
  console.log("Working");
};
