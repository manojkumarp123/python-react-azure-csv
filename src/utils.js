export const evalResponce = (res) => {
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};
