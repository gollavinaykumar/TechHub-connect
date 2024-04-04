export const updatePricePlan = async (
  id: any,
  membership: any,
  Number: any
) => {
  try {
    const updatedPricePlan = await fetch("http://localhost:8080/pricing", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, membership }),
    });
    return updatedPricePlan.json();
  } catch (err) {
    console.log(err);
  }
};
