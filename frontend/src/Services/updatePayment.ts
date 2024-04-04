export const updatePayment = async (id: any, plan: any, number: any) => {
  try {
    const updatedPayment = await fetch("http://localhost:8080/pricing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, plan, number }),
    });
    return updatedPayment.json();
  } catch (err) {
    console.log(err);
  }
};
